const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const siteHeader = document.querySelector('.site-header');

const updateHeader = () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 40);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.discipline').forEach((discipline) => {
  const summary = discipline.querySelector('summary');
  const panel = discipline.querySelector('.discipline-panel');

  summary.addEventListener('click', (event) => {
    event.preventDefault();

    if (discipline.open) {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
      requestAnimationFrame(() => {
        panel.style.maxHeight = '0px';
      });
      window.setTimeout(() => {
        discipline.open = false;
        panel.style.maxHeight = '';
      }, 350);
      return;
    }

    discipline.open = true;
    panel.style.maxHeight = '0px';
    requestAnimationFrame(() => {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
    window.setTimeout(() => {
      panel.style.maxHeight = '';
    }, 350);
  });
});

const photoMarquee = document.querySelector('.competition-photo-marquee');
const photoLightbox = document.querySelector('.photo-lightbox');

if (photoMarquee && photoLightbox) {
  const lightboxImage = photoLightbox.querySelector('img');
  const closeLightbox = () => photoLightbox.close();
  const openLightbox = (image) => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    photoLightbox.showModal();
  };

  photoMarquee.querySelectorAll('img').forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Expand photo: ${image.alt || 'competition photo'}`);
    image.addEventListener('click', () => openLightbox(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  photoLightbox.querySelector('.photo-lightbox-close').addEventListener('click', closeLightbox);
  photoLightbox.addEventListener('click', (event) => {
    if (event.target === photoLightbox) closeLightbox();
  });
}
