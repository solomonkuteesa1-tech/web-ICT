// Initialize EmailJS with your Public Key
emailjs.init('YOUR_PUBLIC_KEY_HERE');

// Collapsible sections functionality
document.querySelectorAll('.collapsible-section').forEach(section => {
    const header = section.querySelector('.collapsible-header');
    if (header) {
        header.addEventListener('click', function(e) {
            e.stopPropagation();
            section.classList.toggle('active');
        });
    }
    // Also allow clicking on the entire section
    section.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// Page loading transition for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Show loading screen
            showLoadingScreen();
            
            // Simulate page load with timeout
            setTimeout(function() {
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'instant'
                });
                // Hide loading screen
                hideLoadingScreen();
            }, 600);
        }
    });
});

// Loading screen functions
function showLoadingScreen() {
    let loader = document.getElementById('page-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(253, 245, 230, 0.98), rgba(248, 244, 233, 0.98));
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease-in;
        `;
        
        // Add spinner
        loader.innerHTML = `
            <div style="text-align: center;">
                <div style="
                    width: 60px;
                    height: 60px;
                    border: 4px solid rgba(139, 69, 19, 0.2);
                    border-top: 4px solid #6a0dad;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1.5rem;
                "></div>
                <p style="
                    color: #8B4513;
                    font-size: 1.1rem;
                    font-weight: 600;
                    letter-spacing: 1px;
                    margin: 0;
                ">LOADING...</p>
            </div>
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            </style>
        `;
        document.body.appendChild(loader);
    }
    loader.style.display = 'flex';
}

function hideLoadingScreen() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.style.animation = 'fadeOut 0.4s ease-out forwards';
        setTimeout(function() {
            loader.style.display = 'none';
            loader.style.animation = '';
        }, 400);
    }
}

// Add fadeOut keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Enhanced Feedback Form Handler - Direct Email Integration
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('feedback-name').value;
    const email = document.getElementById('feedback-email').value;
    const subject = document.getElementById('feedback-subject').value;
    const message = document.getElementById('feedback-message').value;
    
    // Send email using EmailJS
    const templateParams = {
        to_email: 'solomonkuteesa1@gmail.com',
        from_email: email,
        from_name: name,
        subject: subject,
        message: message,
        reply_to: email
    };

    // Show loading message
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    emailjs.send('YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID_HERE', templateParams)
        .then(function(response) {
            alert('✓ Thank you! Your feedback has been sent successfully. We will review it and get back to you soon.');
            document.getElementById('feedbackForm').reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            // Fallback to mailto if EmailJS fails
            console.log('EmailJS Error:', error);
            const subjectLine = `Premier ICT Feedback: ${subject}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0ASubject: ${subject}%0D%0AMessage:%0D%0A${message}`;
            const mailtoLink = `mailto:solomonkuteesa1@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
            alert('Opening email client as fallback...');
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
});

// Modal functionality
document.querySelectorAll('a[href="#terms"], a[href="#privacy"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('href').substring(1);
        document.getElementById(modalId).style.display = 'block';
    });
});

// Close modals when clicking outside
document.querySelectorAll('div[id="terms"], div[id="privacy"]').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
});

// Download Materials Modal Functions
function openMaterial(e, modalId) {
    e.preventDefault();
    document.getElementById(modalId).style.display = 'block';
}

function closeMaterial(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close material modals when clicking outside
document.querySelectorAll('div[id="syllabus-modal"], div[id="study-guide-modal"], div[id="lecture-notes-modal"], div[id="exam-papers-modal"]').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
});

// Interactive Skill Assessment Quiz
function initializeQuiz() {
    const quizQuestions = [
        { q: 'What does ICT stand for?', a: 'Information and Communication Technology' },
        { q: 'Which language is most used for data science?', a: 'Python' },
        { q: 'What is the primary purpose of a firewall?', a: 'Protect networks from unauthorized access' }
    ];
    
    // Quiz functionality can be expanded here
}

initializeQuiz();
