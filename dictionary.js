// Dastlabki so'zlar
const initialWords = [
    {
        word: "Hello",
        translation: "Salom",
        category: "phrases",
        example: "Hello, how are you? - Salom, qalaysiz?"
    },
    {
        word: "Run",
        translation: "Yugurmoq",
        category: "verbs",
        example: "I run every morning - Men har kuni ertalab yuguraman"
    },
    {
        word: "Book",
        translation: "Kitob",
        category: "nouns",
        example: "I love reading books - Men kitob o'qishni yaxshi ko'raman"
    },
    {
        word: "Beautiful",
        translation: "Chiroyli",
        category: "adjectives",
        example: "She is beautiful - U chiroyli"
    },
    {
        word: "Good morning",
        translation: "Xayrli tong",
        category: "phrases",
        example: "Good morning, everyone! - Xayrli tong, hammaga!"
    },
    {
        word: "Write",
        translation: "Yozmoq",
        category: "verbs",
        example: "I write in my diary - Men kundaligimga yozaman"
    },
    {
        word: "Computer",
        translation: "Kompyuter",
        category: "nouns",
        example: "I work on my computer - Men kompyuterimda ishlayman"
    },
    {
        word: "Happy",
        translation: "Baxtli",
        category: "adjectives",
        example: "I am happy today - Men bugun baxtliman"
    },
    {
        word: "Thank you",
        translation: "Rahmat",
        category: "phrases",
        example: "Thank you for your help - Yordamingiz uchun rahmat"
    },
    {
        word: "Read",
        translation: "O'qimoq",
        category: "verbs",
        example: "I read books every day - Men har kuni kitob o'qiyman"
    },
    {
        word: "Phone",
        translation: "Telefon",
        category: "nouns",
        example: "My phone is new - Mening telefonim yangi"
    },
    {
        word: "Big",
        translation: "Katta",
        category: "adjectives",
        example: "This is a big house - Bu katta uy"
    },
    {
        word: "Goodbye",
        translation: "Xayr",
        category: "phrases",
        example: "Goodbye, see you tomorrow - Xayr, ertaga ko'rishamiz"
    },
    {
        word: "Eat",
        translation: "Yemoq",
        category: "verbs",
        example: "I eat breakfast at 8 AM - Men nonushtani soat 8 da yeyman"
    },
    {
        word: "Car",
        translation: "Mashina",
        category: "nouns",
        example: "I have a red car - Mening qizil mashinam bor"
    },
    {
        word: "Small",
        translation: "Kichik",
        category: "adjectives",
        example: "This is a small cat - Bu kichik mushuk"
    },
    {
        word: "Please",
        translation: "Iltimos",
        category: "phrases",
        example: "Please help me - Iltimos, menga yordam bering"
    },
    {
        word: "Sleep",
        translation: "Uxlamoq",
        category: "verbs",
        example: "I sleep at 10 PM - Men soat 10 da uxlayman"
    },
    {
        word: "House",
        translation: "Uy",
        category: "nouns",
        example: "I live in a big house - Men katta uyda yashayman"
    },
    {
        word: "Fast",
        translation: "Tez",
        category: "adjectives",
        example: "He runs very fast - U juda tez yuguradi"
    }
];

// So'zlar ma'lumotlarini localStorage dan olish yoki dastlabki so'zlarni qo'shish
let words = JSON.parse(localStorage.getItem('words')) || initialWords;
if (!localStorage.getItem('words')) {
    localStorage.setItem('words', JSON.stringify(initialWords));
}

// DOM elementlari
const searchInput = document.getElementById('search-input');
const wordsGrid = document.querySelector('.words-grid');
const categoryCards = document.querySelectorAll('.category-card');
const addWordBtn = document.querySelector('.add-word-btn');
const addWordModal = document.getElementById('add-word-modal');
const addWordForm = document.getElementById('add-word-form');
const cancelBtn = document.querySelector('.cancel-btn');

// So'zlarni ko'rsatish
function displayWords(filteredWords = words) {
    wordsGrid.innerHTML = '';
    
    filteredWords.forEach(word => {
        const wordCard = document.createElement('div');
        wordCard.className = 'word-card';
        wordCard.innerHTML = `
            <div class="word-header">
                <h3 class="word-title">${word.word}</h3>
                <span class="word-category">${getCategoryName(word.category)}</span>
            </div>
            <div class="word-translation">${word.translation}</div>
            ${word.example ? `<div class="word-example">${word.example}</div>` : ''}
        `;
        wordsGrid.appendChild(wordCard);
    });
}

// Kategoriya nomini olish
function getCategoryName(category) {
    const categories = {
        'verbs': 'Fe\'l',
        'nouns': 'Ot',
        'adjectives': 'Sifat',
        'phrases': 'Gap bo\'lagi'
    };
    return categories[category] || category;
}

// So'z qidirish
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredWords = words.filter(word => 
        word.word.toLowerCase().includes(searchTerm) || 
        word.translation.toLowerCase().includes(searchTerm)
    );
    displayWords(filteredWords);
});

// Kategoriya bo'yicha filtrlash
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        // Faol kategoriyani o'zgartirish
        categoryCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        const category = card.dataset.category;
        const filteredWords = category === 'all' 
            ? words 
            : words.filter(word => word.category === category);
        displayWords(filteredWords);
    });
});

// Yangi so'z qo'shish modali
addWordBtn.addEventListener('click', () => {
    addWordModal.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    addWordModal.style.display = 'none';
});

// Yangi so'z qo'shish
addWordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newWord = {
        word: document.getElementById('word-input').value,
        translation: document.getElementById('translation-input').value,
        category: document.getElementById('category-input').value,
        example: document.getElementById('example-input').value
    };
    
    words.push(newWord);
    localStorage.setItem('words', JSON.stringify(words));
    
    // Formani tozalash va modalni yopish
    addWordForm.reset();
    addWordModal.style.display = 'none';
    
    // So'zlarni qayta ko'rsatish
    displayWords();
});

// Dastlabki so'zlarni ko'rsatish
displayWords(); 