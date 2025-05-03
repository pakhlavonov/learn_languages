// So'zlar ma'lumotlari
const flashcards = [
    {
        word: "Hello",
        translation: "Salom",
        category: "Greetings",
        example: "Hello, how are you? - Salom, qalaysiz?",
        difficulty: "easy"
    },
    {
        word: "Goodbye",
        translation: "Xayr",
        category: "Greetings",
        example: "Goodbye, see you tomorrow! - Xayr, ertaga ko'rishamiz!",
        difficulty: "easy"
    },
    {
        word: "Thank you",
        translation: "Rahmat",
        category: "Politeness",
        example: "Thank you for your help - Yordamingiz uchun rahmat",
        difficulty: "easy"
    },
    {
        word: "Please",
        translation: "Iltimos",
        category: "Politeness",
        example: "Please help me - Iltimos, menga yordam bering",
        difficulty: "easy"
    },
    {
        word: "Sorry",
        translation: "Kechirasiz",
        category: "Politeness",
        example: "I'm sorry for being late - Kechikkanim uchun kechirasiz",
        difficulty: "easy"
    }
];

// DOM elementlari
const flashcardContainer = document.querySelector('.flashcard');
const wordText = document.getElementById('word-text');
const translationText = document.getElementById('translation-text');
const categoryText = document.getElementById('category-text');
const exampleText = document.getElementById('example-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const difficultyFilter = document.getElementById('difficulty-filter');
const categoryFilter = document.getElementById('category-filter');

// O'zgaruvchilar
let currentIndex = 0;
let filteredCards = [...flashcards];
let isFlipped = false;

// Flashcard ko'rsatish
function showFlashcard() {
    const card = filteredCards[currentIndex];
    wordText.textContent = card.word;
    translationText.textContent = card.translation;
    categoryText.textContent = card.category;
    exampleText.textContent = card.example;
    
    // Progress yangilash
    updateProgress();
    
    // Flashcardni old tomonga aylantirish
    if (isFlipped) {
        flashcardContainer.classList.remove('flipped');
        isFlipped = false;
    }
}

// Progress yangilash
function updateProgress() {
    const progress = ((currentIndex + 1) / filteredCards.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${currentIndex + 1}/${filteredCards.length}`;
}

// Flashcard aylantirish
flashcardContainer.addEventListener('click', () => {
    flashcardContainer.classList.toggle('flipped');
    isFlipped = !isFlipped;
});

// Oldingi flashcard
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showFlashcard();
    }
});

// Keyingi flashcard
nextBtn.addEventListener('click', () => {
    if (currentIndex < filteredCards.length - 1) {
        currentIndex++;
        showFlashcard();
    }
});

// Flashcardlarni aralashtirish
shuffleBtn.addEventListener('click', () => {
    // Fisher-Yates algoritmi orqali aralashtirish
    for (let i = filteredCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredCards[i], filteredCards[j]] = [filteredCards[j], filteredCards[i]];
    }
    
    currentIndex = 0;
    showFlashcard();
});

// Qiyinlik darajasini filtrlash
difficultyFilter.addEventListener('change', () => {
    const difficulty = difficultyFilter.value;
    filteredCards = flashcards.filter(card => 
        difficulty === 'all' || card.difficulty === difficulty
    );
    currentIndex = 0;
    showFlashcard();
});

// Kategoriyani filtrlash
categoryFilter.addEventListener('change', () => {
    const category = categoryFilter.value;
    filteredCards = flashcards.filter(card => 
        category === 'all' || card.category === category
    );
    currentIndex = 0;
    showFlashcard();
});

// Klaviatura orqali boshqarish
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentIndex > 0) {
                currentIndex--;
                showFlashcard();
            }
            break;
        case 'ArrowRight':
            if (currentIndex < filteredCards.length - 1) {
                currentIndex++;
                showFlashcard();
            }
            break;
        case ' ':
            flashcardContainer.classList.toggle('flipped');
            isFlipped = !isFlipped;
            break;
    }
});

// So'zni tinglatish
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// Dastlabki flashcardni ko'rsatish
showFlashcard(); 