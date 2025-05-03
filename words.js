// So'zlar ma'lumotlari
const words = [
    {
        word: "Hello",
        translation: "Salom",
        category: "Greetings",
        example: "Hello, how are you? - Salom, qalaysiz?"
    },
    {
        word: "Goodbye",
        translation: "Xayr",
        category: "Greetings",
        example: "Goodbye, see you tomorrow! - Xayr, ertaga ko'rishamiz!"
    },
    {
        word: "Thank you",
        translation: "Rahmat",
        category: "Politeness",
        example: "Thank you for your help - Yordamingiz uchun rahmat"
    },
    {
        word: "Please",
        translation: "Iltimos",
        category: "Politeness",
        example: "Please help me - Iltimos, menga yordam bering"
    },
    {
        word: "Sorry",
        translation: "Kechirasiz",
        category: "Politeness",
        example: "I'm sorry for being late - Kechikkanim uchun kechirasiz"
    }
];

// DOM elementlari
const modeCards = document.querySelectorAll('.mode-card');
const flashcardsSection = document.querySelector('.flashcards-section');
const practiceSection = document.querySelector('.practice-section');
const listeningSection = document.querySelector('.listening-section');

const wordText = document.getElementById('word-text');
const wordCategory = document.getElementById('word-category');
const translationText = document.getElementById('translation-text');
const exampleText = document.getElementById('example-text');
const flashcard = document.querySelector('.flashcard');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const flipBtn = document.getElementById('flip-btn');
const progressBar = document.getElementById('words-progress');
const progressText = document.getElementById('progress-text');

const practiceWord = document.getElementById('practice-word');
const practiceOptions = document.getElementById('practice-options');
const checkAnswerBtn = document.getElementById('check-answer');

// O'zgaruvchilar
let currentWordIndex = 0;
let currentMode = 'flashcards';

// O'rganilgan so'zlar soni
let learnedWords = 0;

// O'rganilgan so'zlar ro'yxati
const learnedWordsList = new Set();

// O'rganish rejimini o'zgartirish
modeCards.forEach(card => {
    card.addEventListener('click', () => {
        // Faol rejimni o'zgartirish
        modeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        // Rejimni o'zgartirish
        currentMode = card.dataset.mode;
        
        // Bo'limlarni ko'rsatish/yashirish
        flashcardsSection.style.display = currentMode === 'flashcards' ? 'block' : 'none';
        practiceSection.style.display = currentMode === 'practice' ? 'block' : 'none';
        listeningSection.style.display = currentMode === 'listening' ? 'block' : 'none';
        
        // Rejimga qarab ma'lumotlarni yangilash
        if (currentMode === 'flashcards') {
            showFlashcard();
        } else if (currentMode === 'practice') {
            showPracticeQuestion();
        }
    });
});

// Flashcard ko'rsatish
function showFlashcard() {
    const currentWord = words[currentWordIndex];
    wordText.textContent = currentWord.word;
    wordCategory.textContent = currentWord.category;
    translationText.textContent = currentWord.translation;
    exampleText.textContent = currentWord.example;
    
    // Progress yangilash
    updateProgress();
}

// Progress yangilash
function updateProgress() {
    const progress = ((currentWordIndex + 1) / words.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${currentWordIndex + 1}/${words.length}`;
}

// Flashcard aylantirish
flipBtn.addEventListener('click', () => {
    flashcard.classList.toggle('flipped');
});

// Oldingi so'z
prevBtn.addEventListener('click', () => {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        flashcard.classList.remove('flipped');
        showFlashcard();
    }
});

// Keyingi so'z
nextBtn.addEventListener('click', () => {
    if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        flashcard.classList.remove('flipped');
        showFlashcard();
        
        // So'zni o'rganilganlar ro'yxatiga qo'shish
        if (!learnedWordsList.has(words[currentWordIndex - 1].word)) {
            learnedWordsList.add(words[currentWordIndex - 1].word);
            learnedWords++;
            document.getElementById('learned-words').textContent = learnedWords;
        }
    }
});

// Mashq savolini ko'rsatish
function showPracticeQuestion() {
    const currentWord = words[currentWordIndex];
    practiceWord.textContent = currentWord.word;
    
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
    
    // Variantlarni HTML ga qo'shish
    practiceOptions.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => {
            // Barcha variantlardan active klassini olib tashlash
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('active');
            });
            // Tanlangan variantga active klassini qo'shish
            optionElement.classList.add('active');
        });
        practiceOptions.appendChild(optionElement);
    });
}

// Javobni tekshirish
checkAnswerBtn.addEventListener('click', () => {
    const selectedOption = document.querySelector('.option.active');
    if (selectedOption) {
        const isCorrect = selectedOption.textContent === words[currentWordIndex].translation;
        selectedOption.classList.add(isCorrect ? 'correct' : 'wrong');
        
        // To'g'ri javob bo'lsa, keyingi savolga o'tish
        if (isCorrect) {
            setTimeout(() => {
                if (currentWordIndex < words.length - 1) {
                    currentWordIndex++;
                    showPracticeQuestion();
                }
            }, 1000);
        }
    }
});

// Dastlabki ma'lumotlarni ko'rsatish
showFlashcard(); 