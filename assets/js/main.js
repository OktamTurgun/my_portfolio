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
    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const subject = document.getElementById('fsubject').value.trim();
    const message = document.getElementById('fmessage').value.trim();
    const status  = document.getElementById('formStatus');

    if (!name || !email || !message) {
        status.textContent = '⚠ Please fill in all required fields.';
        status.style.display = 'block';
        status.style.background = 'rgba(239,68,68,0.1)';
        status.style.border = '1px solid #ef4444';
        status.style.color = '#ef4444';
        return;
    }

    emailjs.send("service_18ih6u8", "template_upkjxdk", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
    })
    .then(() => {
        status.textContent = '✓ Message sent! I will reply soon.';
        status.style.display = 'block';
        status.style.background = 'rgba(16,185,129,0.1)';
        status.style.border = '1px solid #10b981';
        status.style.color = '#10b981';
        // Formani tozalash
        document.getElementById('fname').value = '';
        document.getElementById('femail').value = '';
        document.getElementById('fsubject').value = '';
        document.getElementById('fmessage').value = '';
    })
    .catch(() => {
        status.textContent = '✗ Something went wrong. Try emailing directly.';
        status.style.display = 'block';
        status.style.background = 'rgba(239,68,68,0.1)';
        status.style.border = '1px solid #ef4444';
        status.style.color = '#ef4444';
    });
}

// ── CV DOWNLOAD ──
function downloadCV(e) {
    e.preventDefault();
    const a = document.createElement('a');
    a.href = 'assets/docs/resume.pdf';
    a.download = 'Uktam_Turgunov_CV.pdf';
    a.click();
}

// ── BACK TO TOP BUTTON ──
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

backToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const currentTheme = localStorage.getItem('theme');

// Sahifa yuklanganda mavzuni tekshirish
if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    }
});