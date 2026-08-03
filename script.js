const EMAILJS_PUBLIC_KEY = 'u1zncMXG9GReAnrxP';
const EMAILJS_SERVICE_ID = 'service_52hr6gb';
const EMAILJS_TEMPLATE_ID = 'template_893svt6';

// Theme toggle functionality
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');

    if (theme === 'light') {
        body.classList.add('light-theme');
        icon.className = 'bx bx-sun';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        icon.className = 'bx bx-moon';
        localStorage.setItem('theme', 'dark');
    }
}

function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

function animateCounter(element, target, duration = 1400) {
    const startTime = performance.now();

    function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        element.textContent = `${Math.floor(target * progress)}%`;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

function animateSkills(section) {
    section.querySelectorAll('.progress').forEach(progress => {
        progress.style.width = `${progress.dataset.width}%`;
    });

    section.querySelectorAll('.skill-percent').forEach(percent => {
        animateCounter(percent, Number(percent.dataset.value));
    });

    section.querySelectorAll('.circle').forEach((circle, index) => {
        const value = Number(circle.dataset.value);
        setTimeout(() => {
            circle.style.setProperty('--progress', `${value * 3.6}deg`);
            animateCounter(circle.querySelector('.circle-percent'), value);
        }, index * 160);
    });
}

function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navbarLinks = [...document.querySelectorAll('.navbar a')];
    const sections = [...document.querySelectorAll('section[id]')];

    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    const updateActiveLink = () => {
        const currentSection = sections.reduce((activeSection, section) => {
            return window.scrollY + 140 >= section.offsetTop ? section : activeSection;
        }, sections[0]);

        if (!currentSection) return;
        navbarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection.id}`);
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
}

function setupTypedText() {
    if (typeof Typed !== 'undefined' && document.querySelector('.multiple-text')) {
        new Typed('.multiple-text', {
            strings: ['Java Developer', 'Python Developer', 'Front end Developer'],
            typeSpeed: 90,
            backSpeed: 70,
            backDelay: 1200,
            loop: true
        });
    }
}

function setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(element => element.classList.add('is-visible'));
        return;
    }

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14 });

    revealElements.forEach(element => revealObserver.observe(element));
}

function setupSkills() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection || !('IntersectionObserver' in window)) return;

    const skillsObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
            animateSkills(skillsSection);
            skillsObserver.disconnect();
        }
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
}

function setupImageRipples() {
    document.querySelectorAll('.home-img, .about-img').forEach(image => {
        image.addEventListener('click', event => {
            const ripple = document.createElement('span');
            const bounds = image.getBoundingClientRect();
            const size = Math.max(bounds.width, bounds.height);
            ripple.className = 'ripple';
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${event.clientX - bounds.left - size / 2}px;top:${event.clientY - bounds.top - size / 2}px`;
            image.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

function setupCertificates() {
    document.querySelectorAll('.certificate-link').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}

function setupContactForm() {
    const contactForm = document.querySelector('#contactForm');
    if (!contactForm || typeof emailjs === 'undefined') return;

    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
            .then(() => {
                alert('Message sent to Akshatha H M successfully!');
                contactForm.reset();
            })
            .catch(error => {
                console.error('EmailJS send failed:', error);
                alert('Unable to send the message. Please check the EmailJS service and template configuration.');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="bx bx-send"></i> Send Message';
            });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupThemeToggle();
    setupNavigation();
    setupTypedText();
    setupRevealAnimations();
    setupSkills();
    setupImageRipples();
    setupCertificates();
    setupContactForm();
});
