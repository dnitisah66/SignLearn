// Course 2 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Course 2 loaded');
    
    // Initialize Materialize components
    M.AutoInit();
    
    // Load course progress
    loadCourseProgress();
    
    // Set up event listeners
    setupEventListeners();
});

// Load course progress
async function loadCourseProgress() {
    try {
        const response = await fetch('/api/progress');
        const progressData = await response.json();
        
        // Calculate overall course progress
        const courseProgress = calculateCourseProgress(progressData, 'course2');
        updateCourseProgress(courseProgress);
        
        // Update module progress
        updateModuleProgress(progressData);
        
    } catch (error) {
        console.error('Error loading course progress:', error);
    }
}

// Calculate course progress
function calculateCourseProgress(progressData, courseId) {
    const courseProgress = progressData.filter(p => p.courseId === courseId);
    if (courseProgress.length === 0) return 0;
    
    const completed = courseProgress.filter(p => p.completed).length;
    return Math.round((completed / courseProgress.length) * 100);
}

// Update course progress UI
function updateCourseProgress(progress) {
    document.getElementById('courseProgress').style.width = progress + '%';
    document.getElementById('progressText').textContent = progress + '% Complete';
}

// Update module progress
function updateModuleProgress(progressData) {
    const modules = ['module1', 'module2', 'module3'];
    
    modules.forEach((moduleId, index) => {
        const moduleProgress = calculateModuleProgress(progressData, `course2-${moduleId}`);
        const progressBar = document.getElementById(`${moduleId}Progress`);
        const progressText = document.getElementById(`${moduleId}Percentage`);
        
        if (progressBar && progressText) {
            progressBar.style.width = moduleProgress + '%';
            progressText.textContent = moduleProgress + '% Complete';
        }
    });
}

// Calculate module progress
function calculateModuleProgress(progressData, moduleId) {
    const moduleProgress = progressData.filter(p => p.lessonId === moduleId);
    if (moduleProgress.length === 0) return 0;
    
    const completed = moduleProgress.filter(p => p.completed).length;
    return Math.round((completed / moduleProgress.length) * 100);
}

// Setup event listeners
function setupEventListeners() {
    // Gallery item clicks
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const sign = this.getAttribute('data-sign');
            const img = this.querySelector('.sign-image');
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;
            
            openImageModal(img.src, title, description, sign);
        });
    });
    
    // Module start buttons
    document.querySelectorAll('.start-module').forEach(button => {
        button.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            startModule(moduleId);
        });
    });
    
    // Practice buttons
    document.querySelectorAll('.practice-card button').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            if (action.includes('Quiz')) {
                startIntermediateQuiz();
            } else if (action.includes('Practice')) {
                startConversationPractice();
            }
        });
    });
}

// Open image modal
function openImageModal(src, title, description, sign) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImage.src = src;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Store current sign for practice
    window.currentSign = sign;
    
    // Show modal
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Practice sign
function practiceSign() {
    const sign = window.currentSign;
    M.toast({html: `Practicing ${sign} sign...`, classes: 'green'});
    
    // Mark as practiced
    markSignAsPracticed(sign);
    
    closeModal();
}

// Mark sign as practiced
async function markSignAsPracticed(sign) {
    try {
        await fetch('/api/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseId: 'course2',
                lessonId: sign,
                completed: true,
                score: 100
            })
        });
        
        // Reload progress
        loadCourseProgress();
        
    } catch (error) {
        console.error('Error marking sign as practiced:', error);
    }
}

// Start module
async function startModule(moduleId) {
    M.toast({html: `Starting Module ${moduleId}...`, classes: 'green'});
    
    // Mark module as started
    try {
        await fetch('/api/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseId: 'course2',
                lessonId: `course2-module${moduleId}`,
                completed: false,
                score: 0
            })
        });
        
        // Reload progress
        loadCourseProgress();
        
    } catch (error) {
        console.error('Error starting module:', error);
    }
}

// Start intermediate quiz
function startIntermediateQuiz() {
    const quizData = [
        {
            question: "What is the sign for 'Family'?",
            options: ["Circle with hands", "Point to chest", "Hug gesture", "Two hands together"],
            correct: 0
        },
        {
            question: "What is the sign for 'Food'?",
            options: ["Hand to mouth", "Point to stomach", "Eating motion", "All of the above"],
            correct: 3
        },
        {
            question: "What is the sign for 'Friend'?",
            options: ["Handshake", "Point to person", "Hug", "Wave"],
            correct: 0
        },
        {
            question: "What is the sign for 'Water'?",
            options: ["Drinking motion", "Wet fingers", "Cup shape", "All of the above"],
            correct: 3
        },
        {
            question: "What is the sign for 'Learn'?",
            options: ["Point to head", "Book gesture", "Writing motion", "All of the above"],
            correct: 3
        }
    ];
    
    // Create quiz modal
    createQuizModal(quizData);
}

// Create quiz modal
function createQuizModal(quizData) {
    const modalHtml = `
        <div id="quizModal" class="modal">
            <div class="modal-content">
                <h4>Intermediate Quiz</h4>
                <div id="quizContent">
                    <p>Test your intermediate sign language knowledge:</p>
                    <div class="quiz-question" id="quizQuestion"></div>
                    <div class="quiz-options" id="quizOptions"></div>
                    <div class="quiz-score" id="quizScore" style="display: none;">
                        <h5>Quiz Complete!</h5>
                        <p>Your Score: <span id="finalScore">0</span>/5</p>
                        <button class="btn teal" onclick="restartQuiz()">Try Again</button>
                        <button class="btn grey modal-close">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing quiz modal
    const existingModal = document.getElementById('quizModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add new modal
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Initialize modal
    const modal = document.getElementById('quizModal');
    const modalInstance = M.Modal.init(modal);
    modalInstance.open();
    
    // Initialize quiz
    window.currentQuiz = {
        data: quizData,
        currentQuestion: 0,
        score: 0
    };
    
    displayQuizQuestion();
}

// Display quiz question
function displayQuizQuestion() {
    const quiz = window.currentQuiz;
    const question = quiz.data[quiz.currentQuestion];
    
    document.getElementById('quizQuestion').textContent = question.question;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'btn teal quiz-option';
        button.textContent = option;
        button.onclick = () => selectQuizAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('quizScore').style.display = 'none';
}

// Select quiz answer
function selectQuizAnswer(selectedIndex) {
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
        setTimeout(displayQuizQuestion, 1000);
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
    displayQuizQuestion();
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
                courseId: 'course2',
                lessonId: 'quiz',
                completed: true,
                score: score
            })
        });
        
        // Reload progress
        loadCourseProgress();
        
    } catch (error) {
        console.error('Error updating quiz progress:', error);
    }
}

// Start conversation practice
function startConversationPractice() {
    M.toast({html: 'Starting conversation practice...', classes: 'green'});
    
    // In a real app, this would open a conversation practice interface
    // For now, just show a message
    setTimeout(() => {
        M.toast({html: 'Conversation practice feature coming soon!', classes: 'blue'});
    }, 1000);
}
