// Keep nav active state while scrolling and smooth-anchors
const nav = document.querySelector('.nav');
const links = document.querySelectorAll('.nav-center .nav-link');
const sections = [...document.querySelectorAll('section[id]')];

function setActive() {
    const y = window.scrollY + (nav?.offsetHeight || 70) + 10;
    let cur = null;
    for (const s of sections) {
        if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) { cur = s.id; break; }
    }
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${cur}`));
}
window.addEventListener('scroll', setActive);
window.addEventListener('load', setActive);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
            e.preventDefault();
            const el = document.querySelector(id);
            const top = el.getBoundingClientRect().top + scrollY - (nav?.offsetHeight || 70) - 6;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Mobile menu
const burger = document.getElementById('burger');
const navCenter = document.querySelector('.nav-center');

function closeMenu() {
    navCenter?.classList.remove('open');
    burger?.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('menu-open');
}
function toggleMenu() {
    navCenter?.classList.toggle('open');
    const open = navCenter?.classList.contains('open');
    burger?.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.classList.toggle('menu-open', open);
}

burger?.addEventListener('click', toggleMenu);
document.querySelectorAll('.nav-center .nav-link').forEach(a => {
    a.addEventListener('click', closeMenu);
});

// Optional: prevent background scroll when menu is open
/* in CSS you can add:
html.menu-open, body.menu-open { overflow: hidden; }
*/
// Footer year
document.getElementById('year').textContent = new Date().getFullYear();



