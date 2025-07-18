// Mobile menu toggle with improved touch support
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
let touchStartY = 0;
let touchEndY = 0;

const toggleMobileMenu = (show) => {
    mobileNav.classList.toggle('active', show);
    mobileMenuBtn.textContent = show ? '✕' : '☰';
    document.body.style.overflow = show ? 'hidden' : '';
};

mobileMenuBtn.addEventListener('click', () => {
    const willShow = !mobileNav.classList.contains('active');
    toggleMobileMenu(willShow);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('active') &&
        !mobileNav.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu(false);
    }
});

// Add touch swipe support for mobile menu
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    if (!mobileNav.classList.contains('active')) return;
    touchEndY = e.touches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > 50) {
        toggleMobileMenu(diff < 0);
    }
});

// Smooth scrolling with improved mobile support
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            toggleMobileMenu(false);
        }
    });
});

// Improve form validation and submission
document.querySelectorAll('.contact-form').forEach(form => {
    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('.form-btn');

    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            input.classList.add('error');
        });

        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });

    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const telegram = form.querySelector('input').value.trim();
            const message = form.querySelector('textarea').value.trim();

            if (!telegram || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Here you would typically send the form data to your server
            alert('Form submitted successfully! We will contact you soon.');
            form.reset();
        });
    }
});

// Animate elements on scroll
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

// Observe all cards and sections
document.querySelectorAll('.feature-card, .dashboard-card, .package-card, .service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const spiral = document.querySelector('.fibonacci-spiral');
    
    if (hero && spiral) {
        spiral.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after page load
    setTimeout(typeWriter, 1000);
}

// Add hover effects to partner items
document.querySelectorAll('.partner-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Add dynamic chart animation to dashboard previews
document.querySelectorAll('.dashboard-preview').forEach(preview => {
    const createChart = () => {
        const bars = [];
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.style.cssText = `
                position: absolute;
                bottom: 20px;
                left: ${20 + i * 10}px;
                width: 8px;
                height: ${Math.random() * 100 + 20}px;
                background: var(--gold);
                opacity: 0.7;
                transition: height 0.3s ease;
            `;
            bars.push(bar);
            preview.appendChild(bar);
        }
        
        // Animate bars
        setInterval(() => {
            bars.forEach(bar => {
                bar.style.height = `${Math.random() * 100 + 20}px`;
            });
        }, 2000);
    };
    
    createChart();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .partner-item {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);