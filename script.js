// ============================================
// OAHU HAWAII TRAVEL GUIDE - SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SMOOTH SCROLL FOR NAVIGATION
    // ============================================
    const navLinks = document.querySelectorAll('.nav-pills a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.category-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // UPDATE ACTIVE NAV ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('.places-section');
    const navHeight = document.querySelector('.category-nav')?.offsetHeight || 80;
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + navHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.place-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // ============================================
    // PARALLAX EFFECT ON HERO
    // ============================================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (hero && window.scrollY < hero.offsetHeight) {
            const scrolled = window.scrollY;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
    
    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%c🌺 Aloha! Welcome to Oahu! 🌺', 
        'color: #FF6B6B; font-size: 24px; font-weight: bold;');
    console.log('%cMade with love for a special friend.', 
        'color: #20B2AA; font-size: 14px;');
});
