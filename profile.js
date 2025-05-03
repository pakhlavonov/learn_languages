// DOM elementlari
const profileImg = document.getElementById('profile-img');
const userName = document.getElementById('user-name');
const userLevel = document.getElementById('user-level');
const levelProgress = document.getElementById('level-progress');
const levelPercentage = document.getElementById('level-percentage');
const totalScore = document.getElementById('total-score');
const streak = document.getElementById('streak');
const wordsLearned = document.getElementById('words-learned');
const studyTime = document.getElementById('study-time');
const correctAnswers = document.getElementById('correct-answers');
const streakDays = document.getElementById('streak-days');
const achievementsContainer = document.getElementById('achievements-container');

// Sozlamalar elementlari
const notificationsToggle = document.getElementById('notifications-toggle');
const soundToggle = document.getElementById('sound-toggle');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const languageSelect = document.getElementById('language-select');

// Modal elementlari
const editProfileModal = document.getElementById('edit-profile-modal');
const changePasswordModal = document.getElementById('change-password-modal');
const editProfileBtn = document.getElementById('edit-profile-btn');
const changePasswordBtn = document.getElementById('change-password-btn');
const logoutBtn = document.getElementById('logout-btn');

// Foydalanuvchi ma'lumotlari
let userData = {
    name: "Foydalanuvchi",
    email: "user@example.com",
    level: "Boshlang'ich",
    levelProgress: 0,
    totalScore: 0,
    streak: 0,
    wordsLearned: 0,
    studyTime: 0,
    correctAnswers: 0,
    streakDays: 0,
    settings: {
        notifications: true,
        sound: true,
        darkMode: false,
        language: "uz"
    },
    achievements: []
};

// Yutuqlar
const achievements = [
    {
        id: "first_word",
        title: "Birinchi so'z",
        description: "Birinchi so'zni o'rganish",
        icon: "fas fa-book",
        unlocked: true
    },
    {
        id: "streak_3",
        title: "3 kunlik seriya",
        description: "3 kun ketma-ket o'rganish",
        icon: "fas fa-fire",
        unlocked: false
    },
    {
        id: "score_100",
        title: "100 ball",
        description: "100 ball to'plash",
        icon: "fas fa-star",
        unlocked: false
    },
    {
        id: "perfect_lesson",
        title: "Mukammal dars",
        description: "Barcha savollarga to'g'ri javob berish",
        icon: "fas fa-check-circle",
        unlocked: false
    }
];

// Dastlabki yuklash
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    updateUI();
    loadAchievements();
    setupEventListeners();
});

// Foydalanuvchi ma'lumotlarini yuklash
function loadUserData() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        userData = JSON.parse(savedData);
    }
}

// UI yangilash
function updateUI() {
    userName.textContent = userData.name;
    userLevel.textContent = userData.level;
    levelProgress.style.width = `${userData.levelProgress}%`;
    levelPercentage.textContent = `${userData.levelProgress}%`;
    totalScore.textContent = userData.totalScore;
    streak.textContent = userData.streak;
    wordsLearned.textContent = userData.wordsLearned;
    studyTime.textContent = formatTime(userData.studyTime);
    correctAnswers.textContent = userData.correctAnswers;
    streakDays.textContent = userData.streakDays;

    // Sozlamalarni yangilash
    notificationsToggle.checked = userData.settings.notifications;
    soundToggle.checked = userData.settings.sound;
    darkModeToggle.checked = userData.settings.darkMode;
    languageSelect.value = userData.settings.language;

    // Qorong'i rejim
    if (userData.settings.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Yutuqlarni yuklash
function loadAchievements() {
    achievementsContainer.innerHTML = achievements.map(achievement => `
        <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
            <i class="${achievement.icon}"></i>
            <div class="achievement-info">
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
            </div>
            <div class="achievement-status">
                ${achievement.unlocked ? 
                    '<i class="fas fa-check-circle"></i>' : 
                    '<i class="fas fa-lock"></i>'}
            </div>
        </div>
    `).join('');
}

// Event listenerlarni sozlash
function setupEventListeners() {
    // Profil rasmini o'zgartirish
    document.querySelector('.change-photo-btn').addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImg.src = e.target.result;
                    userData.profileImage = e.target.result;
                    saveUserData();
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    });

    // Sozlamalar
    notificationsToggle.addEventListener('change', () => {
        userData.settings.notifications = notificationsToggle.checked;
        saveUserData();
    });

    soundToggle.addEventListener('change', () => {
        userData.settings.sound = soundToggle.checked;
        saveUserData();
    });

    darkModeToggle.addEventListener('change', () => {
        userData.settings.darkMode = darkModeToggle.checked;
        saveUserData();
        updateUI();
    });

    languageSelect.addEventListener('change', () => {
        userData.settings.language = languageSelect.value;
        saveUserData();
        // Tilni o'zgartirish logikasi
    });

    // Modallar
    editProfileBtn.addEventListener('click', () => {
        document.getElementById('edit-name').value = userData.name;
        document.getElementById('edit-email').value = userData.email;
        editProfileModal.style.display = 'flex';
    });

    changePasswordBtn.addEventListener('click', () => {
        changePasswordModal.style.display = 'flex';
    });

    // Modal yopish
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            editProfileModal.style.display = 'none';
            changePasswordModal.style.display = 'none';
        });
    });

    // Formlarni yuborish
    document.getElementById('edit-profile-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('edit-name').value;
        const newEmail = document.getElementById('edit-email').value;
        
        userData.name = newName;
        userData.email = newEmail;
        
        saveUserData();
        updateUI();
        editProfileModal.style.display = 'none';
    });

    document.getElementById('change-password-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('Yangi parollar mos kelmadi!');
            return;
        }

        // Parolni o'zgartirish logikasi
        changePasswordModal.style.display = 'none';
        alert('Parol muvaffaqiyatli o\'zgartirildi!');
    });

    // Chiqish
    logoutBtn.addEventListener('click', () => {
        if (confirm('Chiqishni xohlaysizmi?')) {
            // Chiqish logikasi
            window.location.href = 'login.html';
        }
    });
}

// Vaqtni formatlash
function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}s ${mins}d` : `${mins}d`;
}

// Ma'lumotlarni saqlash
function saveUserData() {
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Yutuq qo'shish
function unlockAchievement(achievementId) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        userData.achievements.push(achievementId);
        saveUserData();
        loadAchievements();
        showAchievementNotification(achievement);
    }
}

// Yutuq bildirishnomasi
function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <i class="${achievement.icon}"></i>
        <div class="notification-content">
            <h4>Yangi yutuq!</h4>
            <p>${achievement.title}</p>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Darajani yangilash
function updateLevel() {
    const levels = [
        { name: "Boshlang'ich", required: 0 },
        { name: "O'rta", required: 100 },
        { name: "Yuqori", required: 500 },
        { name: "Professional", required: 1000 }
    ];

    const currentLevel = levels.find(level => userData.totalScore >= level.required);
    const nextLevel = levels[levels.indexOf(currentLevel) + 1];

    if (nextLevel) {
        const progress = ((userData.totalScore - currentLevel.required) / 
            (nextLevel.required - currentLevel.required)) * 100;
        userData.level = currentLevel.name;
        userData.levelProgress = Math.round(progress);
    } else {
        userData.level = currentLevel.name;
        userData.levelProgress = 100;
    }

    saveUserData();
    updateUI();
} 