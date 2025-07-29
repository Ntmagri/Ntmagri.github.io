// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeForms();
    initializeNavigation();
    handleAnchorLinks();
});

// Handle anchor links on page load
function handleAnchorLinks() {
    // Check if there's a hash in the URL
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Wait a bit for the page to load completely
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 500);
        }
    }
}

// Navigation functionality
function initializeNavigation() {
    // Update active navigation states
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle dropdown links with anchors
    const dropdownLinks = document.querySelectorAll('.dropdown a[href*="#"]');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const [page, anchor] = href.split('#');
            
            // If we're already on the target page, just scroll to the anchor
            if (page === '' || page === window.location.pathname.split('/').pop()) {
                e.preventDefault();
                const targetElement = document.getElementById(anchor);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // Otherwise, let the browser navigate normally (the anchor will be handled on the new page)
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
                // Change button icon
                this.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && !e.target.closest('.main-nav')) {
            mobileMenu.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.textContent = '☰';
            }
        }
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.textContent = '☰';
                }
            }
        });
    });
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Show initial animations
    setTimeout(() => {
        const initialElements = document.querySelectorAll('.fade-in');
        initialElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }, 100);
}

// Form functionality
function initializeForms() {
    // Contact form submission
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }

    // Add input focus effects
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#f39c12';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#f0f0f0';
        });
    });
}

// Handle form submission
function handleFormSubmission(form) {
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e74c3c';
        } else {
            field.style.borderColor = '#f39c12';
        }
    });
    
    if (!isValid) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        console.log('Form submitted:', data);
        
        // Show success message
        showMessage('Obrigado! Sua solicitação foi enviada com sucesso. Entraremos em contato em breve.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Reset input styles
        requiredFields.forEach(field => {
            field.style.borderColor = '#f0f0f0';
        });
    }, 2000);
}

// Show message function
function showMessage(message, type = 'info') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 6px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    messageEl.textContent = message;
    
    // Add to document
    document.body.appendChild(messageEl);
    
    // Show message
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageEl.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 5000);
}

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scroll to element function
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }, 20);
    });
}

// Initialize stats animation when stats section comes into view
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Window scroll events
window.addEventListener('scroll', function() {
    // Add shadow to header on scroll
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)';
    }
});

// Resize events
window.addEventListener('resize', function() {
    // Handle responsive adjustments if needed
    if (window.innerWidth > 768) {
        // Reset mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.display = 'flex';
        }
    }
});

// Export functions for use in HTML
window.VTXService = {
    scrollToTop,
    scrollToElement,
    showMessage
};