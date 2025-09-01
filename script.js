// Variable for Typing Animation
const texts = [
    'Engenharia de ponta',
    'Preciso em cada deslocamento',
    'Segurança e inteligência para seu sistema',
    'Soluções técnicas avançadas, com foco em desempenho, segurança e resultados mensuráveis, para cada desafio do seu sistema vertical.'
];

const elements = ['line1', 'line2', 'line3', 'line4'];

function typeText(text, elementId, delay = 0) {
    setTimeout(() => {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 60);
            } else {
                element.innerHTML += '<span class="typing-cursor">&nbsp;</span>';
                setTimeout(() => {
                    const cursor = element.querySelector('.typing-cursor');
                    if (cursor) cursor.remove();
                }, 1500);
            }
        }
        type();
    }, delay);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu && mobileToggle) {
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            mobileToggle.innerHTML = '✕';
        } else {
            mobileToggle.innerHTML = '☰';
        }
    }
}

function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu && mobileToggle) {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '☰';
    }
}

// Video Control Functions
// let videoPaused = false;

// function toggleVideo() {
//     const video = document.querySelector('.hero-video');
//     const btn = document.querySelector('.video-control-btn');
    
//     if (!video || !btn) return;
    
//     if (videoPaused) {
//         video.play();
//         btn.innerHTML = '⏸️ Pausar';
//         videoPaused = false;
//     } else {
//         video.pause();
//         btn.innerHTML = '▶️ Play';
//         videoPaused = true;
//     }
// }

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add mobile menu toggle button to navigation
    const navContainer = document.querySelector('.nav-container');
    if (navContainer && !document.querySelector('.mobile-menu-toggle')) {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '☰';
        mobileToggle.setAttribute('onclick', 'toggleMobileMenu()');
        navContainer.appendChild(mobileToggle);
    }
    
    // Add click event to all nav links to close mobile menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navMenu = document.querySelector('.nav-menu');
        const navContainer = document.querySelector('.nav-container');
        
        if (navMenu && navContainer && 
            navMenu.classList.contains('active') && 
            !navContainer.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation observer for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-card, .differential-item, .value-item, .segmento-item, .compromisso-item-large, .resultado-item-large, .contato-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Start typing animation when page loads (for home page only)
window.addEventListener('load', () => {
    if (document.getElementById('line1')) {
        typeText(texts[0], elements[0], 800);
        typeText(texts[1], elements[1], 3500);
        typeText(texts[2], elements[2], 7000);
        typeText(texts[3], elements[3], 11000);
    }
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 25px rgba(255, 215, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.1)';
        }
    }
});

// Close mobile menu when window is resized to desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});