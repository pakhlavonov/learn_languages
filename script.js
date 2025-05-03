// So'zlar bazasi
const words = [
    { word: 'Hello', translation: 'Salom', learned: false, category: 'Greetings' },
    { word: 'Goodbye', translation: 'Xayr', learned: false, category: 'Greetings' },
    { word: 'Thank you', translation: 'Rahmat', learned: false, category: 'Greetings' },
    { word: 'Please', translation: 'Iltimos', learned: false, category: 'Greetings' },
    { word: 'Yes', translation: 'Ha', learned: false, category: 'Common' },
    { word: 'No', translation: 'Yo\'q', learned: false, category: 'Common' },
    { word: 'Water', translation: 'Suv', learned: false, category: 'Food & Drink' },
    { word: 'Food', translation: 'Ovqat', learned: false, category: 'Food & Drink' },
    { word: 'Book', translation: 'Kitob', learned: false, category: 'Education' },
    { word: 'Friend', translation: 'Do\'st', learned: false, category: 'People' }
];

// DOM elementlari
const wordsContainer = document.querySelector('.words-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const hintButton = document.getElementById('hint-btn');
const progressBar = document.getElementById('progress');
const progressText = document.getElementById('progress-text');
const searchInput = document.getElementById('search-input');
const scoreElement = document.getElementById('score');
const streakElement = document.getElementById('streak');
const timeElement = document.getElementById('time');
const resultModal = document.getElementById('result-modal');
const correctAnswersElement = document.getElementById('correct-answers');
const timeTakenElement = document.getElementById('time-taken');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let timeLeft = 30;
let timer;
let startTime;
let hintsUsed = 0;

// So'zlar ro'yxatini ko'rsatish
function displayWords(searchTerm = '') {
    wordsContainer.innerHTML = '';
    const filteredWords = words.filter(word => 
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredWords.forEach((word, index) => {
        const wordCard = document.createElement('div');
        wordCard.className = 'word-card';
        wordCard.innerHTML = `
            <div class="word-info">
                <span class="word">${word.word}</span>
                <span class="category">${word.category}</span>
            </div>
            <div class="word-translation">
                <span>${word.translation}</span>
                <span class="status">${word.learned ? '✅' : '❌'}</span>
            </div>
        `;
        wordsContainer.appendChild(wordCard);
    });
}

// Test savolini ko'rsatish
function displayQuestion() {
    const currentWord = words[currentQuestionIndex];
    questionElement.textContent = `"${currentWord.word}" so'zining tarjimasini toping:`;

    // Variantlarni yaratish
    const options = [currentWord.translation];
    while (options.length < 4) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        if (!options.includes(randomWord.translation)) {
            options.push(randomWord.translation);
        }
    }

    // Variantlarni aralashtirish
    options.sort(() => Math.random() - 0.5);

    // Variantlarni ko'rsatish
    optionsElement.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);
    });

    // Timer ni qayta ishga tushirish
    startTimer();
    hintButton.disabled = false;
    hintsUsed = 0;
}

// Timer ni ishga tushirish
function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timeElement.textContent = timeLeft;
    startTime = Date.now();

    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(null);
        }
    }, 1000);
}

// Javobni tekshirish
function checkAnswer(selectedAnswer) {
    clearInterval(timer);
    const currentWord = words[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    options.forEach(option => {
        option.disabled = true;
        if (option.textContent === currentWord.translation) {
            option.classList.add('correct');
        } else if (option.textContent === selectedAnswer && selectedAnswer !== currentWord.translation) {
            option.classList.add('wrong');
        }
    });

    if (selectedAnswer === currentWord.translation) {
        score++;
        streak++;
        words[currentQuestionIndex].learned = true;
        scoreElement.textContent = score;
        streakElement.textContent = streak;
    } else {
        streak = 0;
        streakElement.textContent = streak;
    }

    nextButton.style.display = 'block';
    hintButton.disabled = true;
}

// Maslahat berish
function giveHint() {
    if (hintsUsed >= 2) return;
    
    const options = document.querySelectorAll('.option');
    const currentWord = words[currentQuestionIndex];
    
    // Noto'g'ri variantlardan birini yashirish
    const wrongOptions = Array.from(options).filter(option => 
        option.textContent !== currentWord.translation && 
        !option.classList.contains('hidden')
    );
    
    if (wrongOptions.length > 0) {
        const randomWrongOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        randomWrongOption.classList.add('hidden');
        hintsUsed++;
        
        if (hintsUsed >= 2) {
            hintButton.disabled = true;
        }
    }
}

// Progressni yangilash
function updateProgress() {
    const learnedWords = words.filter(word => word.learned).length;
    const progress = (learnedWords / words.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
}

// Test natijalarini ko'rsatish
function showResults() {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    correctAnswersElement.textContent = score;
    timeTakenElement.textContent = `${timeTaken} sekund`;
    resultModal.style.display = 'flex';
}

// Testni qaytadan boshlash
function restartTest() {
    currentQuestionIndex = 0;
    score = 0;
    streak = 0;
    scoreElement.textContent = score;
    streakElement.textContent = streak;
    resultModal.style.display = 'none';
    words.forEach(word => word.learned = false);
    displayQuestion();
    updateProgress();
    displayWords();
}

// Event listeners
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < words.length) {
        displayQuestion();
        nextButton.style.display = 'none';
    } else {
        showResults();
    }
    updateProgress();
    displayWords();
});

hintButton.addEventListener('click', giveHint);

searchInput.addEventListener('input', (e) => {
    displayWords(e.target.value);
});

restartButton.addEventListener('click', restartTest);

// Dasturni ishga tushirish
displayWords();
displayQuestion();
nextButton.style.display = 'none';
updateProgress(); 