const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const siteHeader = document.querySelector('.site-header');

const updateHeader = () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 40);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

document.querySelectorAll('[data-type-text]').forEach((typedText) => {
  const text = typedText.dataset.typeText;
  const typewriter = typedText.parentElement;
  const delay = Number(typewriter.dataset.typeDelay || 0);
  const reducedMotion = window.matchMedia('(max-width: 700px), (prefers-reduced-motion: reduce)').matches;

  const complete = () => {
    typedText.textContent = text;
    typewriter.classList.remove('is-typing');
  };

  if (reducedMotion) {
    complete();
    return;
  }

  let characterIndex = 0;
  const typeNextCharacter = () => {
    typedText.textContent = text.slice(0, characterIndex + 1);
    characterIndex += 1;

    if (characterIndex === text.length) {
      typewriter.classList.remove('is-typing');
      return;
    }

    window.setTimeout(typeNextCharacter, 75);
  };

  const startTyping = () => window.setTimeout(() => {
    typewriter.classList.add('is-typing');
    typeNextCharacter();
  }, delay);

  if (document.fonts) {
    document.fonts.ready.then(startTyping);
  } else {
    startTyping();
  }
});

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

document.querySelectorAll('.competition-video-player').forEach((player) => {
  const video = player.querySelector('video');
  const playButton = player.querySelector('.competition-video-play');

  if (!video || !playButton) return;

  playButton.addEventListener('click', () => {
    video.play();
  });

  video.addEventListener('play', () => {
    playButton.classList.add('is-hidden');
  });

  video.addEventListener('pause', () => {
    playButton.classList.remove('is-hidden');
  });

  video.addEventListener('ended', () => {
    playButton.classList.remove('is-hidden');
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
