// Skills data - you can easily add more skills here
const skills = [
    { name: 'XAML', src: 'img/xaml2-icon.png' },
    { name: 'Python', src: 'img/python2-icon.png' },
    { name: 'SQL', src: 'img/sql2-icon.png' },
    { name: 'C#', src: 'img/c2-icon.png' },
    { name: 'Java', src: 'img/java2-icon.png' }
];

// Create stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 200;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random size classes
        const sizes = ['small', 'medium', 'large'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        star.classList.add(randomSize);

        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        // Random animation delay
        star.style.animationDelay = Math.random() * 3 + 's';

        starsContainer.appendChild(star);
    }
}

// Create skills carousel
function createSkillsCarousel() {
    const skillsTrack = document.getElementById('skillsTrack');

    // Create enough copies for seamless infinite loop (6 copies)
    for (let copy = 0; copy < 6; copy++) {
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';

            const img = document.createElement('img');
            img.src = skill.src;
            img.alt = skill.name;
            img.title = skill.name;

            skillItem.appendChild(img);
            skillsTrack.appendChild(skillItem);
        });
    }
}

// Mouse interaction with stars
function handleMouseMove(e) {
    const stars = document.querySelectorAll('.star');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    stars.forEach(star => {
        const rect = star.getBoundingClientRect();
        const starX = rect.left + rect.width / 2;
        const starY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
            Math.pow(mouseX - starX, 2) + Math.pow(mouseY - starY, 2)
        );

        if (distance < 150) {
            const angle = Math.atan2(starY - mouseY, starX - mouseX);
            const force = (150 - distance) / 150;
            const moveX = Math.cos(angle) * force * 20;
            const moveY = Math.sin(angle) * force * 20;

            star.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.5})`;
        } else {
            star.style.transform = 'translate(0px, 0px) scale(1)';
        }
    });
}

// Custom cursor
function updateCursor(e) {
    const cursor = document.getElementById('cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
}

// Hover effects for interactive elements
function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('a, button');
    const cursor = document.getElementById('cursor');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'rgba(102, 126, 234, 0.8)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'rgba(255, 255, 255, 0.8)';
        });
    });
}

// Scroll-based Fade Logic
function handleScrollFade() {
    const sections = document.querySelectorAll('.page-section');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;

        if (sectionMiddle > 0 && sectionMiddle < windowHeight) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}

// Smooth floating animation for content
function startFloatingAnimation() {
    const content = document.querySelector('.content');
    let tilt = 0;

    setInterval(() => {
        tilt += 0.01;
        if (content) {
            content.style.transform = `translateY(${Math.sin(tilt) * 5}px)`;
        }
    }, 16);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createSkillsCarousel();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('scroll', handleScrollFade);
    addHoverEffects();
    startFloatingAnimation();
    handleScrollFade(); // run on load
});