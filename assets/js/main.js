// ── SCROLL REVEAL (Intersection Observer) ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in, .experience-item, .project-card').forEach(el => {
    revealObserver.observe(el);
});

// Project card animatsiyasini kechiktirish (stagger)
document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
});


// ── ACTIVE NAV LINK (scroll orqali) ──
const sections = ['start', 'experience', 'projects', 'contact'];
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    let current = 'start';

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
            current = id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


// ── MOBILE MENU ──
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('open');
}

function closeMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.remove('open');
}


// ── CONTACT FORM ──
function sendMessage() {
    const name    = document.getElementById('fname')?.value.trim();
    const email   = document.getElementById('femail')?.value.trim();
    const subject = document.getElementById('fsubject')?.value.trim();
    const message = document.getElementById('fmessage')?.value.trim();
    const status  = document.getElementById('formStatus');

    if (!status) return;

    if (!name || !email || !message) {
        status.textContent = '⚠ Please fill in all required fields.';
        status.style.display = 'block';
        status.style.background = 'rgba(239,68,68,0.1)';
        status.style.border = '1px solid #ef4444';
        status.style.color = '#ef4444';
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = '⚠ Please enter a valid email address.';
        status.style.display = 'block';
        status.style.background = 'rgba(239,68,68,0.1)';
        status.style.border = '1px solid #ef4444';
        status.style.color = '#ef4444';
        return;
    }

    const mailto = `mailto:uktamturgunov30@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailto);

    status.textContent = '✓ Message prepared! Your email client should open now.';
    status.style.display = 'block';
    status.style.background = 'rgba(16,185,129,0.1)';
    status.style.border = '1px solid #10b981';
    status.style.color = '#10b981';
}

// ── CV DOWNLOAD ──
function downloadCV(e) {
    e.preventDefault();
    const a = document.createElement('a');
    a.href = 'assets/docs/resume.pdf';
    a.download = 'Uktam_Turgunov_CV.pdf';
    a.click();
}