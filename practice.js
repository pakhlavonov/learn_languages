// Mashq turlari
const practiceTypes = {
    translation: {
        title: "Tarjima",
        description: "So'zlarni tarjima qiling",
        icon: "fas fa-language"
    },
    listening: {
        title: "Tinglab yozish",
        description: "Tinglaganingizni yozing",
        icon: "fas fa-headphones"
    },
    matching: {
        title: "Moslashtirish",
        description: "So'zlarni moslashtiring",
        icon: "fas fa-link"
    },
    fillInTheBlank: {
        title: "Bo'sh joyni to'ldirish",
        description: "Gapdagi bo'sh joyni to'ldiring",
        icon: "fas fa-pencil-alt"
    }
};

// Mashq savollari
const practiceQuestions = [
    {
        type: "translation",
        word: "Hello",
        correctAnswer: "Salom",
        hint: "It's a common greeting",
        difficulty: "easy"
    },
    {
        type: "listening",
        word: "Thank you",
        correctAnswer: "Rahmat",
        hint: "It's used to express gratitude",
        difficulty: "easy"
    },
    {
        type: "matching",
        pairs: [
            { word: "Hello", translation: "Salom" },
            { word: "Goodbye", translation: "Xayr" },
            { word: "Thank you", translation: "Rahmat" }
        ],
        difficulty: "medium"
    },
    {
        type: "fillInTheBlank",
        sentence: "___ for your help",
        correctAnswer: "Thank you",
        hint: "It's used to express gratitude",
        difficulty: "medium"
    },
    {
        type: "translation",
        word: "Beautiful",
        correctAnswer: "Chiroyli",
        hint: "It describes something pleasing to the eye",
        difficulty: "medium"
    },
    {
        type: "listening",
        word: "Congratulations",
        correctAnswer: "Tabriklaymiz",
        hint: "It's used to express joy for someone's success",
        difficulty: "hard"
    }
];

// DOM elementlari
const practiceContainer = document.querySelector('.practice-container');
const typeCards = document.querySelectorAll('.type-card');
const questionCard = document.querySelector('.question-card');
const hintBtn = document.getElementById('hint-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const scoreElement = document.getElementById('score');
const streakElement = document.getElementById('streak');
const resultsModal = document.querySelector('.results-modal');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const totalScore = document.getElementById('total-score');
const restartBtn = document.getElementById('restart-btn');

// O'zgaruvchilar
let currentType = 'translation';
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let filteredQuestions = [];

// Vaqt cheklovi
let timeLeft = 30; // sekund
let timerInterval;

// Kategoriyalar
const categories = {
    greetings: {
        id: "greetings",
        title: "Salomlashish",
        icon: "fas fa-handshake",
        words: [
            {
                word: "Salom",
                translation: "Hello",
                examples: ["Salom, qandaysiz?", "Salom, yaxshimisiz?"],
                type: "greeting"
            },
            {
                word: "Xayr",
                translation: "Goodbye",
                examples: ["Xayr, ko'rishguncha", "Xayr, sog' bo'ling"],
                type: "farewell"
            },
            {
                word: "Assalomu alaykum",
                translation: "Peace be upon you",
                examples: ["Assalomu alaykum, qandaysiz?", "Assalomu alaykum, yaxshimisiz?"],
                type: "greeting"
            },
            {
                word: "Rahmat",
                translation: "Thank you",
                examples: ["Rahmat, yaxshi", "Rahmat, zo'r"],
                type: "gratitude"
            },
            {
                word: "Kechirasiz",
                translation: "Excuse me",
                examples: ["Kechirasiz, so'raymin?", "Kechirasiz, yo'l bermang"],
                type: "apology"
            }
        ]
    },
    numbers: {
        id: "numbers",
        title: "Sonlar",
        icon: "fas fa-calculator",
        words: [
            {
                word: "Bir",
                translation: "One",
                examples: ["Bir kishi", "Bir daqiqa"],
                type: "number"
            },
            {
                word: "Ikki",
                translation: "Two",
                examples: ["Ikki kishi", "Ikki daqiqa"],
                type: "number"
            },
            {
                word: "Uch",
                translation: "Three",
                examples: ["Uch kishi", "Uch daqiqa"],
                type: "number"
            },
            {
                word: "To'rt",
                translation: "Four",
                examples: ["To'rt kishi", "To'rt daqiqa"],
                type: "number"
            },
            {
                word: "Besh",
                translation: "Five",
                examples: ["Besh kishi", "Besh daqiqa"],
                type: "number"
            },
            {
                word: "Olti",
                translation: "Six",
                examples: ["Olti kishi", "Olti daqiqa"],
                type: "number"
            },
            {
                word: "Yetti",
                translation: "Seven",
                examples: ["Yetti kishi", "Yetti daqiqa"],
                type: "number"
            },
            {
                word: "Sakkiz",
                translation: "Eight",
                examples: ["Sakkiz kishi", "Sakkiz daqiqa"],
                type: "number"
            },
            {
                word: "To'qqiz",
                translation: "Nine",
                examples: ["To'qqiz kishi", "To'qqiz daqiqa"],
                type: "number"
            },
            {
                word: "O'n",
                translation: "Ten",
                examples: ["O'n kishi", "O'n daqiqa"],
                type: "number"
            }
        ]
    },
    colors: {
        id: "colors",
        title: "Ranglar",
        icon: "fas fa-palette",
        words: [
            {
                word: "Qizil",
                translation: "Red",
                examples: ["Qizil gul", "Qizil rang"],
                type: "color"
            },
            {
                word: "Ko'k",
                translation: "Blue",
                examples: ["Ko'k osmon", "Ko'k rang"],
                type: "color"
            },
            {
                word: "Yashil",
                translation: "Green",
                examples: ["Yashil daraxt", "Yashil rang"],
                type: "color"
            },
            {
                word: "Sariq",
                translation: "Yellow",
                examples: ["Sariq quyosh", "Sariq rang"],
                type: "color"
            },
            {
                word: "Oq",
                translation: "White",
                examples: ["Oq qor", "Oq rang"],
                type: "color"
            },
            {
                word: "Qora",
                translation: "Black",
                examples: ["Qora tun", "Qora rang"],
                type: "color"
            },
            {
                word: "Kulrang",
                translation: "Gray",
                examples: ["Kulrang bulut", "Kulrang rang"],
                type: "color"
            },
            {
                word: "Jigarrang",
                translation: "Brown",
                examples: ["Jigarrang daraxt", "Jigarrang rang"],
                type: "color"
            },
            {
                word: "Binafsha",
                translation: "Purple",
                examples: ["Binafsha gul", "Binafsha rang"],
                type: "color"
            },
            {
                word: "Pushti",
                translation: "Pink",
                examples: ["Pushti gul", "Pushti rang"],
                type: "color"
            }
        ]
    },
    family: {
        id: "family",
        title: "Oila",
        icon: "fas fa-users",
        words: [
            {
                word: "Ota",
                translation: "Father",
                examples: ["Mening otam", "Ota-onam"],
                type: "family"
            },
            {
                word: "Ona",
                translation: "Mother",
                examples: ["Mening onam", "Ota-onam"],
                type: "family"
            },
            {
                word: "Aka",
                translation: "Older Brother",
                examples: ["Mening akam", "Katta aka"],
                type: "family"
            },
            {
                word: "Uka",
                translation: "Younger Brother",
                examples: ["Mening ukam", "Kichik uka"],
                type: "family"
            },
            {
                word: "Opa",
                translation: "Older Sister",
                examples: ["Mening opam", "Katta opa"],
                type: "family"
            },
            {
                word: "Sinqil",
                translation: "Younger Sister",
                examples: ["Mening sinqilim", "Kichik sinqil"],
                type: "family"
            },
            {
                word: "Bobo",
                translation: "Grandfather",
                examples: ["Mening bobom", "Katta bobo"],
                type: "family"
            },
            {
                word: "Buvi",
                translation: "Grandmother",
                examples: ["Mening buvim", "Katta buvi"],
                type: "family"
            },
            {
                word: "Amaki",
                translation: "Uncle (Father's Brother)",
                examples: ["Mening amakim", "Katta amaki"],
                type: "family"
            },
            {
                word: "Xola",
                translation: "Aunt (Mother's Sister)",
                examples: ["Mening xolam", "Katta xola"],
                type: "family"
            }
        ]
    }
};

// Yordam funksiyalari
let helpUsed = false;
let jokerUsed = false;

// Statistika
const statistics = {
    totalQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    timeSpent: 0,
    categories: {},
    mistakes: []
};

// Mashq turini o'zgartirish
typeCards.forEach(card => {
    card.addEventListener('click', () => {
        // Faol turini o'zgartirish
        typeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        // Turini o'zgartirish
        currentType = card.dataset.type;
        
        // Savollarni filtrlash
        filterQuestions();
        
        // Savolni yangilash
        showQuestion();
    });
});

// Savollarni filtrlash
function filterQuestions() {
    filteredQuestions = practiceQuestions.filter(q => q.type === currentType);
    currentQuestionIndex = 0;
}

// Savolni ko'rsatish
function showQuestion() {
    if (filteredQuestions.length === 0) {
        showNoQuestions();
        return;
    }

    const question = filteredQuestions[currentQuestionIndex];
    questionCard.innerHTML = '';
    
    // Savol turini yangilash
    document.querySelector('.question-type').textContent = practiceTypes[currentType].title;
    
    // Savol turiga qarab HTML yaratish
    switch(currentType) {
        case 'translation':
            showTranslationQuestion(question);
            break;
        case 'listening':
            showListeningQuestion(question);
            break;
        case 'matching':
            showMatchingQuestion(question);
            break;
        case 'fillInTheBlank':
            showFillInTheBlankQuestion(question);
            break;
    }
    
    // Progress yangilash
    updateProgress();
    
    // Vaqtni boshlash
    startTimer();
    
    // Yordam tugmalarini qayta faollashtirish
    helpUsed = false;
    jokerUsed = false;
    document.getElementById('fifty-fifty-btn').disabled = false;
    document.getElementById('joker-btn').disabled = false;
}

// Savollar yo'qligini ko'rsatish
function showNoQuestions() {
    questionCard.innerHTML = `
        <div class="no-questions">
            <i class="fas fa-exclamation-circle"></i>
            <h3>Bu turdagi savollar hozircha mavjud emas</h3>
            <p>Iltimos, boshqa turdagi mashqlarni tanlang</p>
        </div>
    `;
}

// Tarjima savolini ko'rsatish
function showTranslationQuestion(question) {
    questionCard.innerHTML = `
        <div class="question-content">
            <h2>${question.word}</h2>
            <div class="input-group">
                <input type="text" id="answer-input" placeholder="Tarjimani yozing...">
                <button class="check-btn" onclick="checkTranslation('${question.correctAnswer}')">
                    <i class="fas fa-check"></i>
                    Tekshirish
                </button>
            </div>
            <div class="difficulty-badge ${question.difficulty}">
                ${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </div>
        </div>
    `;
}

// Tinglab yozish savolini ko'rsatish
function showListeningQuestion(question) {
    questionCard.innerHTML = `
        <div class="question-content">
            <button class="speak-btn" onclick="speakWord('${question.word}')">
                <i class="fas fa-volume-up"></i>
                Tinglash
            </button>
            <div class="input-group">
                <input type="text" id="answer-input" placeholder="So'zni yozing...">
                <button class="check-btn" onclick="checkListening('${question.correctAnswer}')">
                    <i class="fas fa-check"></i>
                    Tekshirish
                </button>
            </div>
            <div class="difficulty-badge ${question.difficulty}">
                ${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </div>
        </div>
    `;
}

// Moslashtirish savolini ko'rsatish
function showMatchingQuestion(question) {
    const words = question.pairs.map(pair => pair.word);
    const translations = question.pairs.map(pair => pair.translation);
    
    // Tarjimalarni aralashtirish
    translations.sort(() => Math.random() - 0.5);
    
    questionCard.innerHTML = `
        <div class="question-content">
            <div class="matching-container">
                <div class="words">
                    ${words.map(word => `<div class="word" draggable="true">${word}</div>`).join('')}
                </div>
                <div class="translations">
                    ${translations.map(translation => `<div class="translation" draggable="true">${translation}</div>`).join('')}
                </div>
            </div>
            <button class="check-btn" onclick="checkMatching()">
                <i class="fas fa-check"></i>
                Tekshirish
            </button>
            <div class="difficulty-badge ${question.difficulty}">
                ${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </div>
        </div>
    `;
    
    // Drag and drop funksionalligi
    setupDragAndDrop();
}

// Bo'sh joyni to'ldirish savolini ko'rsatish
function showFillInTheBlankQuestion(question) {
    questionCard.innerHTML = `
        <div class="question-content">
            <h2>${question.sentence.replace('___', '<input type="text" id="answer-input" placeholder="...">')}</h2>
            <button class="check-btn" onclick="checkFillInTheBlank('${question.correctAnswer}')">
                <i class="fas fa-check"></i>
                Tekshirish
            </button>
            <div class="difficulty-badge ${question.difficulty}">
                ${question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </div>
        </div>
    `;
}

// Javoblarni tekshirish
function checkTranslation(correctAnswer) {
    const input = document.getElementById('answer-input');
    const answer = input.value.trim();
    
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        showCorrect();
    } else {
        showIncorrect(correctAnswer);
    }
}

function checkListening(correctAnswer) {
    const input = document.getElementById('answer-input');
    const answer = input.value.trim();
    
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        showCorrect();
    } else {
        showIncorrect(correctAnswer);
    }
}

function checkMatching() {
    const words = document.querySelectorAll('.word');
    const translations = document.querySelectorAll('.translation');
    let isCorrect = true;
    
    words.forEach((word, index) => {
        const translation = translations[index];
        const pair = filteredQuestions[currentQuestionIndex].pairs.find(p => p.word === word.textContent);
        
        if (pair.translation !== translation.textContent) {
            isCorrect = false;
        }
    });
    
    if (isCorrect) {
        showCorrect();
    } else {
        showIncorrect();
    }
}

function checkFillInTheBlank(correctAnswer) {
    const input = document.getElementById('answer-input');
    const answer = input.value.trim();
    
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
        showCorrect();
    } else {
        showIncorrect(correctAnswer);
    }
}

// To'g'ri javob
function showCorrect() {
    score += 10;
    streak++;
    correctAnswers++;
    
    // UI yangilash
    scoreElement.textContent = score;
    streakElement.textContent = streak;
    
    // Animatsiya
    questionCard.classList.add('correct');
    setTimeout(() => {
        questionCard.classList.remove('correct');
    }, 1000);
    
    // Keyingi savolga o'tish
    setTimeout(() => {
        if (currentQuestionIndex < filteredQuestions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
    
    // Statistika yangilash
    updateStatistics(true);
}

// Noto'g'ri javob
function showIncorrect(correctAnswer) {
    streak = 0;
    incorrectAnswers++;
    
    // UI yangilash
    streakElement.textContent = streak;
    
    // Animatsiya
    questionCard.classList.add('incorrect');
    setTimeout(() => {
        questionCard.classList.remove('incorrect');
    }, 1000);
    
    // Xatolik xabari
    const message = correctAnswer ? 
        `Noto'g'ri! To'g'ri javob: ${correctAnswer}` : 
        "Noto'g'ri! Qaytadan urinib ko'ring";
    
    alert(message);
    
    // Statistika yangilash
    updateStatistics(false);
}

// Progress yangilash
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestionIndex + 1}/${filteredQuestions.length}`;
}

// Drag and drop funksionalligi
function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.word, .translation');
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });
        
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });
    
    const containers = document.querySelectorAll('.words, .translations');
    
    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            container.appendChild(draggable);
        });
    });
}

// So'zni tinglatish
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// Maslahat ko'rsatish
hintBtn.addEventListener('click', () => {
    const question = filteredQuestions[currentQuestionIndex];
    alert(question.hint);
});

// Keyingi savolga o'tish
nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
});

// Natijalarni ko'rsatish
function showResults() {
    correctCount.textContent = correctAnswers;
    incorrectCount.textContent = incorrectAnswers;
    totalScore.textContent = score;
    
    resultsModal.style.display = 'flex';
}

// Qaytadan boshlash
restartBtn.addEventListener('click', () => {
    // O'zgaruvchilarni qayta o'rnatish
    currentQuestionIndex = 0;
    score = 0;
    streak = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    
    // UI yangilash
    scoreElement.textContent = score;
    streakElement.textContent = streak;
    resultsModal.style.display = 'none';
    
    // Savollarni qayta filtrlash va ko'rsatish
    filterQuestions();
    showQuestion();
});

// Vaqtni boshlash
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    updateTimer();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showTimeUp();
        }
    }, 1000);
}

// Vaqtni yangilash
function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = timeLeft;
        
        // Vaqt qoldig'iga qarab rang o'zgarishi
        if (timeLeft <= 10) {
            timerElement.classList.add('warning');
        } else {
            timerElement.classList.remove('warning');
        }
    }
}

// Vaqt tugaganda
function showTimeUp() {
    alert("Vaqt tugadi!");
    showIncorrect();
    nextQuestion();
}

// Salomlashish kategoriyasi uchun funksiyalar
function handleGreetings() {
    const greetings = {
        basic: [
            { word: "Hello", translation: "Salom" },
            { word: "Hi", translation: "Salom" },
            { word: "Good morning", translation: "Xayrli tong" },
            { word: "Good afternoon", translation: "Xayrli kun" },
            { word: "Good evening", translation: "Xayrli kech" }
        ],
        questions: [
            { word: "How are you?", translation: "Qalaysiz?" },
            { word: "What's your name?", translation: "Ismingiz nima?" },
            { word: "Where are you from?", translation: "Qayerdansiz?" }
        ],
        responses: [
            { word: "I'm fine, thank you", translation: "Yaxshiman, rahmat" },
            { word: "Nice to meet you", translation: "Tanishganimdan xursandman" },
            { word: "See you later", translation: "Keyin ko'rishamiz" }
        ]
    };

    // Salomlashish savollarini yaratish
    function createGreetingQuestions() {
        let questions = [];
        
        // Asosiy salomlashishlar
        greetings.basic.forEach(greeting => {
            questions.push({
                type: "translation",
                word: greeting.word,
                correctAnswer: greeting.translation,
                hint: "Basic greeting",
                difficulty: "easy",
                category: "greetings"
            });
        });

        // Savollar
        greetings.questions.forEach(question => {
            questions.push({
                type: "listening",
                word: question.word,
                correctAnswer: question.translation,
                hint: "Common question",
                difficulty: "medium",
                category: "greetings"
            });
        });

        // Javoblar
        greetings.responses.forEach(response => {
            questions.push({
                type: "fillInTheBlank",
                sentence: `Person: "How are you?"\nYou: "${response.word}"`,
                correctAnswer: response.translation,
                hint: "Common response",
                difficulty: "medium",
                category: "greetings"
            });
        });

        return questions;
    }

    // Salomlashish savollarini qo'shish
    categoryQuestions.greetings = createGreetingQuestions();
}

// Sonlar kategoriyasi uchun funksiyalar
function handleNumbers() {
    const numbers = {
        basic: [
            { word: "One", translation: "Bir", example: "One apple" },
            { word: "Two", translation: "Ikki", example: "Two books" },
            { word: "Three", translation: "Uch", example: "Three cats" },
            { word: "Four", translation: "To'rt", example: "Four dogs" },
            { word: "Five", translation: "Besh", example: "Five birds" },
            { word: "Six", translation: "Olti", example: "Six flowers" },
            { word: "Seven", translation: "Yetti", example: "Seven stars" },
            { word: "Eight", translation: "Sakkiz", example: "Eight trees" },
            { word: "Nine", translation: "To'qqiz", example: "Nine cars" },
            { word: "Zero", translation: "Nol", example: "Zero mistakes" }
        ],
        tens: [
            { word: "Ten", translation: "O'n", example: "Ten fingers" },
            { word: "Twenty", translation: "Yigirma", example: "Twenty students" },
            { word: "Thirty", translation: "O'ttiz", example: "Thirty days" },
            { word: "Forty", translation: "Qirq", example: "Forty minutes" },
            { word: "Fifty", translation: "Ellik", example: "Fifty dollars" },
            { word: "Sixty", translation: "Oltmish", example: "Sixty seconds" },
            { word: "Seventy", translation: "Yetmish", example: "Seventy years" },
            { word: "Eighty", translation: "Sakson", example: "Eighty percent" },
            { word: "Ninety", translation: "To'qson", example: "Ninety degrees" }
        ],
        hundreds: [
            { word: "One hundred", translation: "Yuz", example: "One hundred people" },
            { word: "Two hundred", translation: "Ikki yuz", example: "Two hundred pages" },
            { word: "Three hundred", translation: "Uch yuz", example: "Three hundred meters" },
            { word: "Four hundred", translation: "To'rt yuz", example: "Four hundred dollars" },
            { word: "Five hundred", translation: "Besh yuz", example: "Five hundred books" },
            { word: "One thousand", translation: "Ming", example: "One thousand years" }
        ],
        ordinal: [
            { word: "First", translation: "Birinchi", example: "First place" },
            { word: "Second", translation: "Ikkinchi", example: "Second floor" },
            { word: "Third", translation: "Uchinchi", example: "Third time" },
            { word: "Fourth", translation: "To'rtinchi", example: "Fourth day" },
            { word: "Fifth", translation: "Beshinchi", example: "Fifth month" }
        ],
        fractions: [
            { word: "Half", translation: "Yarim", example: "Half an hour" },
            { word: "Quarter", translation: "Chorak", example: "Quarter past" },
            { word: "Third", translation: "Uchdan bir", example: "One third" }
        ],
        // Qo'shimcha sonlar
        decimals: [
            { word: "0.5", translation: "Nol butun besh", example: "Half a meter" },
            { word: "1.5", translation: "Bir butun besh", example: "One and a half hours" },
            { word: "2.5", translation: "Ikki butun besh", example: "Two and a half kilometers" },
            { word: "3.75", translation: "Uch butun yetmish besh", example: "Three point seven five" }
        ],
        percentages: [
            { word: "25%", translation: "Yigirma besh foiz", example: "Twenty five percent" },
            { word: "50%", translation: "Ellik foiz", example: "Fifty percent" },
            { word: "75%", translation: "Yetmish besh foiz", example: "Seventy five percent" },
            { word: "100%", translation: "Yuz foiz", example: "One hundred percent" }
        ],
        time: [
            { word: "1:00", translation: "Soat bir", example: "One o'clock" },
            { word: "2:30", translation: "Soat ikki yarim", example: "Half past two" },
            { word: "3:15", translation: "Soat uch chorak", example: "Quarter past three" },
            { word: "4:45", translation: "Soat beshga chorak qoldi", example: "Quarter to five" }
        ],
        money: [
            { word: "$1", translation: "Bir dollar", example: "One dollar" },
            { word: "$10.50", translation: "O'n dollar ellik sent", example: "Ten dollars and fifty cents" },
            { word: "$100", translation: "Yuz dollar", example: "One hundred dollars" },
            { word: "$1,000", translation: "Ming dollar", example: "One thousand dollars" }
        ],
        measurements: [
            { word: "1m", translation: "Bir metr", example: "One meter" },
            { word: "2.5km", translation: "Ikki yarim kilometr", example: "Two and a half kilometers" },
            { word: "500g", translation: "Besh yuz gramm", example: "Five hundred grams" },
            { word: "1L", translation: "Bir litr", example: "One liter" }
        ]
    };

    // Sonlar savollarini yaratish
    function createNumberQuestions() {
        let questions = [];
        
        // Asosiy sonlar
        numbers.basic.forEach(number => {
            questions.push({
                type: "translation",
                word: number.word,
                correctAnswer: number.translation,
                hint: "Basic number",
                difficulty: "easy",
                category: "numbers",
                example: number.example
            });

            // Tinglab tushunish savollari
            questions.push({
                type: "listening",
                word: number.word,
                correctAnswer: number.translation,
                hint: "Listen and write the number",
                difficulty: "easy",
                category: "numbers",
                example: number.example
            });
        });

        // O'nlik sonlar
        numbers.decimals.forEach(number => {
            questions.push({
                type: "translation",
                word: number.word,
                correctAnswer: number.translation,
                hint: "Decimal number",
                difficulty: "hard",
                category: "numbers",
                example: number.example
            });

            questions.push({
                type: "fillInTheBlank",
                sentence: `The length is ${number.word} meters`,
                correctAnswer: number.translation,
                hint: "Use decimal number in measurement",
                difficulty: "hard",
                category: "numbers"
            });
        });

        // Foizlar
        numbers.percentages.forEach(number => {
            questions.push({
                type: "translation",
                word: number.word,
                correctAnswer: number.translation,
                hint: "Percentage",
                difficulty: "medium",
                category: "numbers",
                example: number.example
            });

            questions.push({
                type: "fillInTheBlank",
                sentence: `The discount is ${number.word}`,
                correctAnswer: number.translation,
                hint: "Use percentage in the sentence",
                difficulty: "medium",
                category: "numbers"
            });
        });

        // Vaqt
        numbers.time.forEach(number => {
            questions.push({
                type: "translation",
                word: number.word,
                correctAnswer: number.translation,
                hint: "Time",
                difficulty: "medium",
                category: "numbers",
                example: number.example
            });

            questions.push({
                type: "fillInTheBlank",
                sentence: `The meeting starts at ${number.word}`,
                correctAnswer: number.translation,
                hint: "Use time in the sentence",
                difficulty: "medium",
                category: "numbers"
            });
        });

        // Pul
        numbers.money.forEach(number => {
            questions.push({
                type: "translation",
                word: number.word,
                correctAnswer: number.translation,
                hint: "Money amount",
                difficulty: "medium",
                category: "numbers",
                example: number.example
            });

            questions.push({
                type: "fillInTheBlank",
                sentence: `The price is ${number.word}`,
                correctAnswer: number.translation,
                hint: "Use money amount in the sentence",
                difficulty: "medium",
                category: "numbers"
            });
        });

        // O'lchovlar
        numbers.measurements.forEach(number => {
            questions.push({
                type: "translation",
                word: number.word,
                correctAnswer: number.translation,
                hint: "Measurement",
                difficulty: "medium",
                category: "numbers",
                example: number.example
            });

            questions.push({
                type: "fillInTheBlank",
                sentence: `The distance is ${number.word}`,
                correctAnswer: number.translation,
                hint: "Use measurement in the sentence",
                difficulty: "medium",
                category: "numbers"
            });
        });

        return questions;
    }

    // Sonlar savollarini qo'shish
    categoryQuestions.numbers = createNumberQuestions();

    // Sonlar bilan ishlash uchun qo'shimcha funksiyalar
    function formatTime(hours, minutes) {
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    function formatMoney(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    function formatMeasurement(value, unit) {
        return `${value}${unit}`;
    }

    function calculatePercentage(value, total) {
        return (value / total * 100).toFixed(1) + '%';
    }

    function speakNumber(number) {
        const utterance = new SpeechSynthesisUtterance(number);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function convertToWords(number) {
        const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

        if (number === 0) return 'zero';
        if (number < 10) return units[number];
        if (number < 20) return teens[number - 10];
        if (number < 100) return tens[Math.floor(number / 10)] + (number % 10 ? ' ' + units[number % 10] : '');
        if (number < 1000) return units[Math.floor(number / 100)] + ' hundred' + (number % 100 ? ' and ' + convertToWords(number % 100) : '');
        return 'one thousand';
    }
}

// Ranglar kategoriyasi uchun funksiyalar
function handleColors() {
    const colors = {
        basic: [
            { word: "Red", translation: "Qizil" },
            { word: "Blue", translation: "Ko'k" },
            { word: "Green", translation: "Yashil" },
            { word: "Yellow", translation: "Sariq" },
            { word: "Black", translation: "Qora" }
        ],
        secondary: [
            { word: "Orange", translation: "To'q sariq" },
            { word: "Purple", translation: "Binafsha" },
            { word: "Pink", translation: "Pushti" },
            { word: "Brown", translation: "Jigarrang" },
            { word: "Gray", translation: "Kulrang" }
        ]
    };

    // Ranglar savollarini yaratish
    function createColorQuestions() {
        let questions = [];
        
        // Asosiy ranglar
        colors.basic.forEach(color => {
            questions.push({
                type: "translation",
                word: color.word,
                correctAnswer: color.translation,
                hint: "Basic color",
                difficulty: "easy",
                category: "colors"
            });
        });

        // Ikkilamchi ranglar
        colors.secondary.forEach(color => {
            questions.push({
                type: "listening",
                word: color.word,
                correctAnswer: color.translation,
                hint: "Secondary color",
                difficulty: "medium",
                category: "colors"
            });
        });

        // Ranglar bilan gaplar
        colors.basic.concat(colors.secondary).forEach(color => {
            questions.push({
                type: "fillInTheBlank",
                sentence: `The ${color.word} car is beautiful`,
                correctAnswer: color.translation,
                hint: "Color in a sentence",
                difficulty: "medium",
                category: "colors"
            });
        });

        return questions;
    }

    // Ranglar savollarini qo'shish
    categoryQuestions.colors = createColorQuestions();
}

// Oila kategoriyasi uchun funksiyalar
function handleFamily() {
    const family = {
        immediate: [
            { word: "Mother", translation: "Ona" },
            { word: "Father", translation: "Ota" },
            { word: "Sister", translation: "Opa" },
            { word: "Brother", translation: "Aka" },
            { word: "Son", translation: "O'g'il" }
        ],
        extended: [
            { word: "Grandmother", translation: "Buvi" },
            { word: "Grandfather", translation: "Bobo" },
            { word: "Uncle", translation: "Amaki" },
            { word: "Aunt", translation: "Xola" },
            { word: "Cousin", translation: "Amakivachcha" }
        ],
        relationships: [
            { word: "Husband", translation: "Er" },
            { word: "Wife", translation: "Xotin" },
            { word: "Daughter", translation: "Qiz" },
            { word: "Parents", translation: "Ota-ona" },
            { word: "Children", translation: "Bolalar" }
        ]
    };

    // Oila savollarini yaratish
    function createFamilyQuestions() {
        let questions = [];
        
        // Yaqin oila a'zolari
        family.immediate.forEach(member => {
            questions.push({
                type: "translation",
                word: member.word,
                correctAnswer: member.translation,
                hint: "Immediate family member",
                difficulty: "easy",
                category: "family"
            });
        });

        // Keng oila a'zolari
        family.extended.forEach(member => {
            questions.push({
                type: "listening",
                word: member.word,
                correctAnswer: member.translation,
                hint: "Extended family member",
                difficulty: "medium",
                category: "family"
            });
        });

        // Oila munosabatlari
        family.relationships.forEach(relation => {
            questions.push({
                type: "fillInTheBlank",
                sentence: `My ${relation.word} is very kind`,
                correctAnswer: relation.translation,
                hint: "Family relationship",
                difficulty: "medium",
                category: "family"
            });
        });

        return questions;
    }

    // Oila savollarini qo'shish
    categoryQuestions.family = createFamilyQuestions();
}

// Kategoriyalarni yuklash
function loadCategories() {
    handleGreetings();
    handleNumbers();
    handleColors();
    handleFamily();
}

// Dastlabki yuklash
loadCategories();

// Kategoriyalar uchun savollar
const categoryQuestions = {
    greetings: [
        {
            type: "translation",
            word: "Hello",
            correctAnswer: "Salom",
            hint: "It's a common greeting",
            difficulty: "easy"
        },
        {
            type: "translation",
            word: "Good morning",
            correctAnswer: "Xayrli tong",
            hint: "Used in the morning",
            difficulty: "easy"
        },
        {
            type: "translation",
            word: "Good evening",
            correctAnswer: "Xayrli kech",
            hint: "Used in the evening",
            difficulty: "easy"
        },
        {
            type: "listening",
            word: "How are you?",
            correctAnswer: "Qalaysiz?",
            hint: "Asking about someone's well-being",
            difficulty: "medium"
        },
        {
            type: "fillInTheBlank",
            sentence: "___! How are you?",
            correctAnswer: "Hello",
            hint: "Start with a greeting",
            difficulty: "medium"
        }
    ],
    numbers: [
        {
            type: "translation",
            word: "One",
            correctAnswer: "Bir",
            hint: "First number",
            difficulty: "easy"
        },
        {
            type: "translation",
            word: "Ten",
            correctAnswer: "O'n",
            hint: "Number after nine",
            difficulty: "easy"
        },
        {
            type: "translation",
            word: "Twenty",
            correctAnswer: "Yigirma",
            hint: "Two tens",
            difficulty: "medium"
        },
        {
            type: "listening",
            word: "Fifty",
            correctAnswer: "Ellik",
            hint: "Half of hundred",
            difficulty: "medium"
        },
        {
            type: "fillInTheBlank",
            sentence: "I have ___ apples",
            correctAnswer: "five",
            hint: "Number between four and six",
            difficulty: "easy"
        }
    ],
    colors: [
        {
            type: "translation",
            word: "Red",
            correctAnswer: "Qizil",
            hint: "Color of blood",
            difficulty: "easy"
        },
        {
            type: "translation",
            word: "Blue",
            correctAnswer: "Ko'k",
            hint: "Color of sky",
            difficulty: "easy"
        },
        {
            type: "translation",
            word: "Green",
            correctAnswer: "Yashil",
            hint: "Color of grass",
            difficulty: "easy"
        },
        {
            type: "listening",
            word: "Yellow",
            correctAnswer: "Sariq",
            hint: "Color of sun",
            difficulty: "medium"
        },
        {
            type: "fillInTheBlank",
            sentence: "The sky is ___",
            correctAnswer: "blue",
            hint: "Color of ocean",
            difficulty: "easy"
        }
    ],
    family: [
        {
            type: "translation",
            word: "Mother",
            correctAnswer: "Ona",
            hint: "Female parent",
            difficulty: "easy"
        },
        {
            type: "translation",
            word: "Father",
            correctAnswer: "Ota",
            hint: "Male parent",
            difficulty: "easy"
        },
        {
            type: "translation",
            word: "Sister",
            correctAnswer: "Opa",
            hint: "Female sibling",
            difficulty: "medium"
        },
        {
            type: "listening",
            word: "Brother",
            correctAnswer: "Aka",
            hint: "Male sibling",
            difficulty: "medium"
        },
        {
            type: "fillInTheBlank",
            sentence: "My ___ is older than me",
            correctAnswer: "brother",
            hint: "Male sibling",
            difficulty: "medium"
        }
    ]
};

// Lug'at oynasini ko'rsatish
function showDictionary(category) {
    const dictionaryModal = document.createElement('div');
    dictionaryModal.className = 'dictionary-modal';
    
    const categoryData = categories[category];
    const isMobile = window.innerWidth <= 768;
    
    let dictionaryHTML = `
        <div class="modal-content" style="width: ${isMobile ? '100%' : '80%'}; height: ${isMobile ? '100vh' : '80vh'}; margin: ${isMobile ? '0' : '10vh auto'}; border-radius: ${isMobile ? '0' : '15px'};">
            <div class="dictionary-header" style="padding: ${isMobile ? '10px' : '15px'};">
                <h2 style="font-size: ${isMobile ? '1.2rem' : '1.5rem'};">${categoryData.title}</h2>
                <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="dictionary-content" style="height: ${isMobile ? 'calc(100vh - 50px)' : 'calc(80vh - 50px)'};">
                <div class="words-list" style="grid-template-columns: ${isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))'}; gap: ${isMobile ? '8px' : '15px'}; padding: ${isMobile ? '8px' : '15px'};">
                    ${categoryData.words.map(word => `
                        <div class="word-card" data-word="${word.word}" style="padding: ${isMobile ? '8px' : '12px'};">
                            <div class="word-header" style="gap: ${isMobile ? '8px' : '12px'};">
                                <div class="word-main">
                                    <h3 style="font-size: ${isMobile ? '1rem' : '1.2rem'};">${word.word}</h3>
                                    <span class="translation" style="font-size: ${isMobile ? '0.9rem' : '1rem'};">${word.translation}</span>
                                </div>
                                <div class="word-actions" style="gap: ${isMobile ? '4px' : '8px'};">
                                    <button onclick="speakWord('${word.word}')" class="action-btn" style="padding: ${isMobile ? '6px' : '8px'};">
                                        <i class="fas fa-volume-up"></i>
                                    </button>
                                    <button onclick="addToFavorites('${word.word}')" class="action-btn" style="padding: ${isMobile ? '6px' : '8px'};">
                                        <i class="fas fa-star"></i>
                                    </button>
                                </div>
                            </div>
                            ${word.examples.length > 0 ? `
                                <div class="word-examples" style="display: none; font-size: ${isMobile ? '0.9rem' : '1rem'}; margin-top: ${isMobile ? '4px' : '8px'};">
                                    ${word.examples.slice(0, 1).map(example => `
                                        <p class="example">${example}</p>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    dictionaryModal.innerHTML = dictionaryHTML;
    document.body.appendChild(dictionaryModal);

    // Mobil qurilmalar uchun qo'shimcha sozlamalar
    if (isMobile) {
        const modalContent = dictionaryModal.querySelector('.modal-content');
        const wordsList = dictionaryModal.querySelector('.words-list');
        
        // Scroll effektini yaxshilash
        modalContent.style.overscrollBehavior = 'contain';
        
        // Har bir so'z kartasiga click event qo'shish
        const wordCards = dictionaryModal.querySelectorAll('.word-card');
        wordCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Agar tugma bosilmasa
                if (!e.target.closest('.action-btn')) {
                    const examples = card.querySelector('.word-examples');
                    if (examples) {
                        const isHidden = examples.style.display === 'none';
                        // Barcha misollarni yashirish
                        document.querySelectorAll('.word-examples').forEach(ex => {
                            ex.style.display = 'none';
                        });
                        // Faqat tanlangan misolni ko'rsatish
                        if (isHidden) {
                            examples.style.display = 'block';
                            // Kartani viewport markaziga o'tkazish
                            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                }
            });
        });

        // Tugmalar uchun touch effekti
        const actionButtons = dictionaryModal.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('touchstart', () => {
                btn.style.transform = 'scale(0.95)';
            });
            btn.addEventListener('touchend', () => {
                btn.style.transform = 'scale(1)';
            });
        });

        // Modal yopish uchun swipe effekti
        let touchStartY = 0;
        let touchEndY = 0;
        
        modalContent.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });
        
        modalContent.addEventListener('touchmove', (e) => {
            touchEndY = e.touches[0].clientY;
            const diff = touchEndY - touchStartY;
            
            // Agar yuqoriga surilsa
            if (diff < -50) {
                modalContent.style.transform = `translateY(${diff}px)`;
            }
        });
        
        modalContent.addEventListener('touchend', () => {
            const diff = touchEndY - touchStartY;
            
            // Agar yuqoriga surilgan bo'lsa
            if (diff < -100) {
                dictionaryModal.remove();
            } else {
                modalContent.style.transform = 'translateY(0)';
            }
        });
    }
}

// Kategoriya kartasini bosish
function selectCategory(category) {
    // Faol kategoriyani o'zgartirish
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`.category-card[onclick="selectCategory('${category}')"]`).classList.add('active');
    
    // Lug'at oynasini ochish
    showDictionary(category);
    
    // Savollarni filtrlash
    filteredQuestions = categoryQuestions[category];
    currentQuestionIndex = 0;
    
    // Statistika yangilash
    if (!statistics.categories[category]) {
        statistics.categories[category] = {
            total: 0,
            correct: 0,
            mistakes: []
        };
    }
    
    // Savolni ko'rsatish
    showQuestion();
    
    // Kategoriya nomini yangilash
    document.querySelector('.question-type').textContent = categories[category].title;
}

// So'zni tinglatish
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// Sevimlilarga qo'shish
function addToFavorites(word) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(word)) {
        favorites.push(word);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('So\'z sevimlilarga qo\'shildi!');
    } else {
        alert('Bu so\'z allaqachon sevimlilarda!');
    }
}

// Kategoriya statistikasini yangilash
function updateCategoryStats(category, isCorrect) {
    const categoryStats = statistics.categories[category];
    categoryStats.total++;
    
    if (isCorrect) {
        categoryStats.correct++;
    } else {
        categoryStats.mistakes.push({
            question: filteredQuestions[currentQuestionIndex],
            time: new Date().toISOString()
        });
    }
}

// Kategoriya statistikasini ko'rsatish
function showCategoryStats(category) {
    const stats = statistics.categories[category];
    if (!stats) return;
    
    const accuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
    
    return `
        <div class="category-stat">
            <h4>${categories[category].title}</h4>
            <div class="progress-bar">
                <div class="progress" style="width: ${accuracy}%"></div>
            </div>
            <span>${stats.correct}/${stats.total} (${Math.round(accuracy)}%)</span>
        </div>
    `;
}

// Kategoriya xatolarini ko'rsatish
function showCategoryMistakes(category) {
    const stats = statistics.categories[category];
    if (!stats || !stats.mistakes.length) return '';
    
    return `
        <div class="category-mistakes">
            <h4>${categories[category].title} xatolari</h4>
            ${stats.mistakes.slice(-3).map(mistake => `
                <div class="mistake-item">
                    <span>${mistake.question.word}</span>
                    <span>${new Date(mistake.time).toLocaleDateString()}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Statistika ko'rsatish funksiyasini yangilash
function showStatistics() {
    const statsModal = document.createElement('div');
    statsModal.className = 'stats-modal';
    
    let statsHTML = `
        <div class="modal-content">
            <h2>Statistika</h2>
            <div class="stats-container">
                <div class="general-stats">
                    <h3>Umumiy statistika</h3>
                    <div class="stat-item">
                        <i class="fas fa-question-circle"></i>
                        <span>Jami savollar: ${statistics.totalQuestions}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-check-circle"></i>
                        <span>To'g'ri javoblar: ${statistics.correctAnswers}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-times-circle"></i>
                        <span>Noto'g'ri javoblar: ${statistics.incorrectAnswers}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-clock"></i>
                        <span>O'tkazilgan vaqt: ${Math.floor(statistics.timeSpent / 60)} daqiqa</span>
                    </div>
                </div>
                
                <div class="category-stats">
                    <h3>Kategoriyalar bo'yicha</h3>
                    ${Object.keys(categories).map(category => showCategoryStats(category)).join('')}
                </div>
                
                <div class="mistakes-list">
                    <h3>Xatolar tarixi</h3>
                    ${Object.keys(categories).map(category => showCategoryMistakes(category)).join('')}
                </div>
            </div>
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">Yopish</button>
        </div>
    `;
    
    statsModal.innerHTML = statsHTML;
    document.body.appendChild(statsModal);
}

// Statistika yangilash
function updateStatistics(isCorrect) {
    statistics.totalQuestions++;
    if (isCorrect) {
        statistics.correctAnswers++;
    } else {
        statistics.incorrectAnswers++;
        // Xatolikni saqlash
        statistics.mistakes.push({
            question: filteredQuestions[currentQuestionIndex],
            time: new Date().toISOString()
        });
    }
    
    // Kategoriya statistikasi
    const category = filteredQuestions[currentQuestionIndex].category;
    if (!statistics.categories[category]) {
        statistics.categories[category] = {
            total: 0,
            correct: 0
        };
    }
    statistics.categories[category].total++;
    if (isCorrect) {
        statistics.categories[category].correct++;
    }
    
    // Vaqt statistikasi
    statistics.timeSpent += (30 - timeLeft);
}

// Dastlabki savolni ko'rsatish
filterQuestions();
showQuestion(); 