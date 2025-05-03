// Test savollari
const questions = [
    {
        type: 'multiple-choice',
        question: "What is the translation of 'Hello'?",
        options: ["Salom", "Xayr", "Rahmat", "Iltimos"],
        correctAnswer: "Salom",
        hint: "It's a common greeting"
    },
    {
        type: 'translation',
        question: "Translate 'Thank you' to Uzbek",
        correctAnswer: "Rahmat",
        hint: "It's used to express gratitude"
    },
    {
        type: 'listening',
        word: "Please",
        correctAnswer: "Iltimos",
        hint: "It's used to make polite requests"
    }
];

// DOM elementlari
const typeCards = document.querySelectorAll('.type-card');
const questionCard = document.querySelector('.question-card');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const hintBtn = document.getElementById('hint-btn');
const nextBtn = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('quiz-progress');
const progressText = document.getElementById('progress-text');
const resultModal = document.getElementById('result-modal');

// O'zgaruvchilar
let currentQuestionIndex = 0;
let currentType = 'multiple-choice';
let score = 0;
let timeLeft = 30;
let timerInterval;
let correctAnswers = 0;

// Test turini o'zgartirish
typeCards.forEach(card => {
    card.addEventListener('click', () => {
        // Faol turini o'zgartirish
        typeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        // Turini o'zgartirish
        currentType = card.dataset.type;
        
        // Savolni yangilash
        showQuestion();
    });
});

// Savolni ko'rsatish
function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Savol turini yangilash
    document.querySelector('.question-type').textContent = 
        currentType === 'multiple-choice' ? 'Ko\'p tanlovli' :
        currentType === 'translation' ? 'Tarjima' : 'Tinglab yozish';
    
    // Variantlarni ko'rsatish
    if (currentType === 'multiple-choice') {
        showMultipleChoice(question);
    } else if (currentType === 'translation') {
        showTranslation(question);
    } else {
        showListening(question);
    }
    
    // Progress yangilash
    updateProgress();
    
    // Taymerni qayta ishga tushirish
    resetTimer();
}

// Ko'p tanlovli savolni ko'rsatish
function showMultipleChoice(question) {
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option, question.correctAnswer));
        optionsContainer.appendChild(optionElement);
    });
}

// Tarjima savolini ko'rsatish
function showTranslation(question) {
    optionsContainer.innerHTML = `
        <div class="input-group">
            <input type="text" id="translation-input" placeholder="Tarjimani yozing...">
            <button class="check-btn" onclick="checkTranslation()">Tekshirish</button>
        </div>
    `;
}

// Tinglab yozish savolini ko'rsatish
function showListening(question) {
    optionsContainer.innerHTML = `
        <button class="speak-btn" onclick="speakWord('${question.word}')">
            <i class="fas fa-volume-up"></i>
        </button>
        <div class="input-group">
            <input type="text" id="listening-input" placeholder="So'zni yozing...">
            <button class="check-btn" onclick="checkListening('${question.correctAnswer}')">Tekshirish</button>
        </div>
    `;
}

// Javobni tekshirish
function checkAnswer(selectedAnswer, correctAnswer) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct', 'wrong');
        if (option.textContent === selectedAnswer) {
            option.classList.add(selectedAnswer === correctAnswer ? 'correct' : 'wrong');
        }
    });
    
    if (selectedAnswer === correctAnswer) {
        score += 10;
        correctAnswers++;
        scoreElement.textContent = score;
    }
    
    // Keyingi savolga o'tish
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

// Tarjimani tekshirish
function checkTranslation() {
    const input = document.getElementById('translation-input');
    const answer = input.value.trim();
    const question = questions[currentQuestionIndex];
    
    if (answer.toLowerCase() === question.correctAnswer.toLowerCase()) {
        score += 10;
        correctAnswers++;
        scoreElement.textContent = score;
        input.classList.add('correct');
    } else {
        input.classList.add('wrong');
    }
    
    // Keyingi savolga o'tish
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

// Tinglab yozishni tekshirish
function checkListening(correctAnswer) {
    const input = document.getElementById('listening-input');
    const answer = input.value.trim();
    
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        score += 10;
        correctAnswers++;
        scoreElement.textContent = score;
        input.classList.add('correct');
    } else {
        input.classList.add('wrong');
    }
    
    // Keyingi savolga o'tish
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

// So'zni tinglatish
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// Maslahat ko'rsatish
hintBtn.addEventListener('click', () => {
    const question = questions[currentQuestionIndex];
    alert(question.hint);
});

// Taymer
function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    timerElement.textContent = timeLeft;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestion();
            } else {
                showResults();
            }
        }
    }, 1000);
}

// Progress yangilash
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
}

// Natijalarni ko'rsatish
function showResults() {
    clearInterval(timerInterval);
    
    document.getElementById('correct-answers').textContent = correctAnswers;
    document.getElementById('time-taken').textContent = `${30 - timeLeft} sekund`;
    document.getElementById('final-score').textContent = score;
    
    resultModal.style.display = 'flex';
}

// Qayta ko'rish
document.getElementById('review-btn').addEventListener('click', () => {
    resultModal.style.display = 'none';
    currentQuestionIndex = 0;
    showQuestion();
});

// Qaytadan boshlash
document.getElementById('restart-btn').addEventListener('click', () => {
    resultModal.style.display = 'none';
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    scoreElement.textContent = score;
    showQuestion();
});

// Dastlabki savolni ko'rsatish
showQuestion(); 