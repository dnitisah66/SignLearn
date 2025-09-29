// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard loaded');
    
    // Initialize Materialize components
    M.AutoInit();
    
    // Load user progress and data
    loadDashboardData();
    
    // Set up event listeners
    setupEventListeners();
});

// Load dashboard data
async function loadDashboardData() {
    try {
        // Load progress data
        const progressResponse = await fetch('/api/progress');
        const progressData = await progressResponse.json();
        
        // Calculate course completion percentages
        const course1Progress = calculateCourseProgress(progressData, 'course1');
        const course2Progress = calculateCourseProgress(progressData, 'course2');
        
        // Update UI
        updateProgressUI(course1Progress, course2Progress);
        updateStats(progressData);
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        M.toast({html: 'Error loading dashboard data', classes: 'red'});
    }
}

// Calculate course progress percentage
function calculateCourseProgress(progressData, courseId) {
    const courseProgress = progressData.filter(p => p.courseId === courseId);
    if (courseProgress.length === 0) return 0;
    
    const completed = courseProgress.filter(p => p.completed).length;
    return Math.round((completed / courseProgress.length) * 100);
}

// Update progress UI
function updateProgressUI(course1Progress, course2Progress) {
    // Course 1 progress
    document.getElementById('course1Progress').style.width = course1Progress + '%';
    document.getElementById('course1Percentage').textContent = course1Progress + '% Complete';
    
    // Course 2 progress
    document.getElementById('course2Progress').style.width = course2Progress + '%';
    document.getElementById('course2Percentage').textContent = course2Progress + '% Complete';
}

// Update statistics
function updateStats(progressData) {
    const coursesCompleted = new Set(progressData.filter(p => p.completed).map(p => p.courseId)).size;
    const quizzesTaken = progressData.filter(p => p.score > 0).length;
    const hoursLearned = Math.floor(progressData.length * 0.5); // Estimate
    const currentStreak = calculateStreak(progressData);
    
    document.getElementById('coursesCompleted').textContent = coursesCompleted;
    document.getElementById('quizzesTaken').textContent = quizzesTaken;
    document.getElementById('hoursLearned').textContent = hoursLearned;
    document.getElementById('currentStreak').textContent = currentStreak;
}

// Calculate learning streak
function calculateStreak(progressData) {
    // Simple streak calculation based on recent activity
    const today = new Date();
    const oneDayAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    
    const recentActivity = progressData.filter(p => new Date(p.updatedAt) > oneDayAgo);
    return recentActivity.length > 0 ? 1 : 0;
}

// Setup event listeners
function setupEventListeners() {
    // Profile modal
    const profileModal = document.getElementById('profileModal');
    const profileInstance = M.Modal.init(profileModal);
    
    // Quiz modal
    const quizModal = document.getElementById('quizModal');
    const quizInstance = M.Modal.init(quizModal);
    
    // Store instances for later use
    window.profileModal = profileInstance;
    window.quizModal = quizInstance;
}

// Open profile modal
function openProfile() {
    // Load current user data
    loadUserProfile();
    window.profileModal.open();
}

// Load user profile data
async function loadUserProfile() {
    try {
        // In a real app, you'd fetch this from an API
        document.getElementById('profileEmail').value = 'user@example.com';
        document.getElementById('profileName').value = 'Sign Learner';
        document.getElementById('profileLevel').value = 'beginner';
        
        M.FormSelect.init(document.getElementById('profileLevel'));
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

// Save profile changes
async function saveProfile() {
    try {
        const profileData = {
            name: document.getElementById('profileName').value,
            level: document.getElementById('profileLevel').value
        };
        
        // In a real app, you'd save this to the backend
        M.toast({html: 'Profile updated successfully!', classes: 'green'});
        window.profileModal.close();
        
    } catch (error) {
        console.error('Error saving profile:', error);
        M.toast({html: 'Error saving profile', classes: 'red'});
    }
}

// Start quiz
function startQuiz() {
    window.quizModal.open();
    initializeQuiz();
}

// Initialize quiz
function initializeQuiz() {
    const quizData = [
        {
            question: "What is the sign for 'Hello'?",
            options: ["Wave hand", "Thumbs up", "Point to self", "Clap hands"],
            correct: 0
        },
        {
            question: "What is the sign for 'Thank you'?",
            options: ["Bow head", "Touch chin", "Hand to chest", "Wave goodbye"],
            correct: 2
        },
        {
            question: "What is the sign for 'Yes'?",
            options: ["Shake head", "Nod head", "Thumbs up", "Point up"],
            correct: 1
        },
        {
            question: "What is the sign for 'Help'?",
            options: ["Raise hand", "Clap hands", "Point to others", "Wave arms"],
            correct: 0
        },
        {
            question: "What is the sign for 'Please'?",
            options: ["Bow", "Hand to chest", "Clap", "Point to mouth"],
            correct: 1
        }
    ];
    
    window.currentQuiz = {
        data: quizData,
        currentQuestion: 0,
        score: 0
    };
    
    displayQuestion();
}

// Display quiz question
function displayQuestion() {
    const quiz = window.currentQuiz;
    const question = quiz.data[quiz.currentQuestion];
    
    document.getElementById('quizQuestion').textContent = question.question;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'btn teal quiz-option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('quizScore').style.display = 'none';
}

// Select quiz answer
function selectAnswer(selectedIndex) {
    const quiz = window.currentQuiz;
    const question = quiz.data[quiz.currentQuestion];
    
    if (selectedIndex === question.correct) {
        quiz.score++;
        M.toast({html: 'Correct!', classes: 'green'});
    } else {
        M.toast({html: 'Incorrect!', classes: 'red'});
    }
    
    quiz.currentQuestion++;
    
    if (quiz.currentQuestion < quiz.data.length) {
        setTimeout(displayQuestion, 1000);
    } else {
        showQuizResults();
    }
}

// Show quiz results
function showQuizResults() {
    const quiz = window.currentQuiz;
    document.getElementById('finalScore').textContent = quiz.score;
    document.getElementById('quizScore').style.display = 'block';
    document.getElementById('quizOptions').innerHTML = '';
    
    // Update progress
    updateQuizProgress(quiz.score);
}

// Restart quiz
function restartQuiz() {
    initializeQuiz();
}

// Update quiz progress
async function updateQuizProgress(score) {
    try {
        await fetch('/api/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseId: 'quiz',
                lessonId: 'general',
                completed: true,
                score: score
            })
        });
    } catch (error) {
        console.error('Error updating quiz progress:', error);
    }
}

// Reset course progress
async function resetCourse(courseId) {
    if (confirm('Are you sure you want to reset this course progress?')) {
        try {
            await fetch(`/api/progress/reset/${courseId}`, {
                method: 'DELETE'
            });
            
            M.toast({html: 'Course progress reset!', classes: 'green'});
            loadDashboardData(); // Reload data
        } catch (error) {
            console.error('Error resetting course:', error);
            M.toast({html: 'Error resetting course', classes: 'red'});
        }
    }
}
