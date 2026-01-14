// Navbar scroll active
const sections = document.querySelectorAll('section[id]');
function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.navbar a[href*=' + sectionId + ']');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active');
        } else {
            sectionsClass.classList.remove('active');
        }
    });
}
window.onscroll = scrollActive;

// Typed.js for multiple text (delayed start)
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        var typed = new Typed(".multiple-text", {
            strings: ['Java Full Stack Developer', 'Python Full Stack Developer','Front-end Developer'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }, 3000); // Start typing 3s after load, after social media appears
});

// Function to animate percentage numbers from 0 to target
function animateNumbers(duration = 4000) {
    const percentages = document.querySelectorAll('.percentage');
    percentages.forEach(span => {
        const targetStr = span.textContent; // e.g., "90%"
        const target = parseInt(targetStr); // Extract number
        if (isNaN(target)) return;

        span.textContent = '0%'; // Start from 0
        let startTime = null;

        function updateCount(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(target * progress);

            span.textContent = current + '%';

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        }
        requestAnimationFrame(updateCount);
    });
}

// Progress bars, circles, and numbers animation on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                if (target.id === 'skills') {
                    // Animate progress bars
                    const progressBars = target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });

                    // Animate circles
                    const circles = target.querySelectorAll('.circle');
                    circles.forEach((circle, index) => {
                        setTimeout(() => {
                            circle.classList.add('animate');
                        }, index * 200); // Stagger circles slightly
                    });

                    // Animate numbers (both technical and professional)
                    animateNumbers(4000); // 4s duration to match other animations

                    // Disconnect observer after triggering
                    observer.unobserve(target);
                }
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}
animateOnScroll();

// Ripple effect on images
function createRipple(event) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    event.currentTarget.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}
document.addEventListener('DOMContentLoaded', function() {
    const homeImg = document.querySelector('.home-img');
    const aboutImg = document.querySelector('.about-img');
 
    if (homeImg) {
        homeImg.addEventListener('click', createRipple);
    }
 
    if (aboutImg) {
        aboutImg.addEventListener('click', createRipple);
    }

    // Navbar active class toggle
    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
           
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
           
            navbarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Set initial active based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navbarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // EmailJS Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        emailjs.init("u1zncMXG9GReAnrxP"); // Replace with your EmailJS user ID
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            emailjs.sendForm('service_52hr6gb', 'template_893svt6', this) // Replace with your EmailJS Service ID and Template ID
                .then(function() {
                    alert('Message sent to Akshatha H M successfully!');
                    contactForm.reset();
                }, function(error) {
                    alert('Failed to send message to Akshatha H M. Please try again.');
                    console.log('FAILED...', error);
                });
        });
    }
});

// Separate observer for circles (fallback, but main one is in animateOnScroll)
document.addEventListener("DOMContentLoaded", () => {
    const circles = document.querySelectorAll(".circle");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                }
            });
        },
        { threshold: 0.5 }
    );

    circles.forEach(circle => observer.observe(circle));
});