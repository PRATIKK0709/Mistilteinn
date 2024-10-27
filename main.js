// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
const loader = document.querySelector('.loader');

// Mobile Menu Functionality
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
mobileMenuClose?.addEventListener('click', toggleMobileMenu);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMobileMenu();
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((element) => {
    observer.observe(element);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Page Load Animation
window.addEventListener('load', () => {
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Prevent Mobile Menu From Showing on Resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});
