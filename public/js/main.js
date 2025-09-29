// SignLearn Main JavaScript

// Initialize Materialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize all Materialize components
    try {
        M.AutoInit();
        console.log('Materialize initialized successfully');
    } catch (error) {
        console.error('Materialize initialization error:', error);
    }
    
    // Add fade-in animation to cards after a small delay
    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.add('fade-in');
        });
    }, 100);
});

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Login form submitted');
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            M.toast({html: 'Please fill in all fields', classes: 'red'});
            return;
        }
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            const result = await response.text();
            console.log('Login response:', result);
            
            if (result.includes('✅')) {
                M.toast({html: 'Login successful! Redirecting...', classes: 'green'});
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            } else {
                M.toast({html: result, classes: 'red'});
            }
        } catch (error) {
            console.error('Login error:', error);
            M.toast({html: 'Login failed. Please try again.', classes: 'red'});
        }
    });
}

// Register Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Register form submitted');
        
        const email = document.getElementById('reg_email').value;
        const password = document.getElementById('reg_password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        
        if (!email || !password || !confirmPassword) {
            M.toast({html: 'Please fill in all fields', classes: 'red'});
            return;
        }
        
        if (password !== confirmPassword) {
            M.toast({html: 'Passwords do not match!', classes: 'red'});
            return;
        }
        
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            const result = await response.text();
            console.log('Register response:', result);
            
            if (result.includes('✅')) {
                M.toast({html: 'Registration successful! Please login.', classes: 'green'});
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                M.toast({html: result, classes: 'red'});
            }
        } catch (error) {
            console.error('Register error:', error);
            M.toast({html: 'Registration failed. Please try again.', classes: 'red'});
        }
    });
}

// Booking Form Handler
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Booking form submitted');
        
        const tutorSelect = document.getElementById('tutor-select').value;
        const sessionType = document.getElementById('session-type').value;
        const sessionDate = document.getElementById('session-date').value;
        const sessionTime = document.getElementById('session-time').value;
        const specialRequests = document.getElementById('special-requests').value;
        
        if (!tutorSelect || !sessionType || !sessionDate || !sessionTime) {
            M.toast({html: 'Please fill in all required fields', classes: 'red'});
            return;
        }
        
        try {
            const response = await fetch('/api/booking/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    tutor: tutorSelect,
                    sessionType: sessionType,
                    date: sessionDate,
                    time: sessionTime,
                    specialRequests: specialRequests
                })
            });
            
            const result = await response.json();
            console.log('Booking response:', result);
            
            if (result.success) {
                M.toast({html: 'Booking successful! We will contact you soon.', classes: 'green'});
                bookingForm.reset();
            } else {
                M.toast({html: result.message || 'Booking failed', classes: 'red'});
            }
        } catch (error) {
            console.error('Booking error:', error);
            M.toast({html: 'Booking failed. Please try again.', classes: 'red'});
        }
    });
}

// Tutor selection buttons
document.querySelectorAll('.select-tutor').forEach(button => {
    button.addEventListener('click', function() {
        const tutorValue = this.getAttribute('data-tutor');
        const tutorSelect = document.getElementById('tutor-select');
        if (tutorSelect) {
            tutorSelect.value = tutorValue;
            M.FormSelect.init(tutorSelect);
            
            // Scroll to booking form
            document.querySelector('.booking-form-section').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Utility Functions
function showLoading() {
    const loading = document.querySelector('.loading');
    if (loading) loading.style.display = 'block';
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) loading.style.display = 'none';
}

function showToast(message, type = 'info') {
    M.toast({html: message, classes: type});
}

// Image Gallery Modal
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.close');

// Gallery item click handlers
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('.sign-image');
        const title = this.querySelector('h4').textContent;
        const description = this.querySelector('p').textContent;
        
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        modal.style.display = 'block';
    });
});

// Close modal
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Module start handlers
document.querySelectorAll('.start-module').forEach(button => {
    button.addEventListener('click', function() {
        const moduleId = this.getAttribute('data-module');
        M.toast({html: `Starting Module ${moduleId}...`, classes: 'green'});
        // Add module logic here
    });
});

// Image Gallery Modal Enhancement
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.close');

// Gallery item click handlers
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('.sign-image');
        const title = this.querySelector('h4').textContent;
        const description = this.querySelector('p').textContent;
        
        if (modalImage && modalTitle && modalDescription) {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            modal.style.display = 'block';
        }
    });
});

// Close modal
if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Practice sign function
function practiceSign() {
    const sign = window.currentSign || 'unknown';
    M.toast({html: `Practicing ${sign} sign...`, classes: 'green'});
    
    // Mark as practiced
    markSignAsPracticed(sign);
    
    if (modal) {
        modal.style.display = 'none';
    }
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
                courseId: 'course1',
                lessonId: sign,
                completed: true,
                score: 100
            })
        });
        
        M.toast({html: 'Progress saved!', classes: 'green'});
        
    } catch (error) {
        console.error('Error marking sign as practiced:', error);
        M.toast({html: 'Error saving progress', classes: 'red'});
    }
}

// Close modal function
function closeModal() {
    if (modal) {
        modal.style.display = 'none';
    }
}
