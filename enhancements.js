const ministrySection = document.querySelector('.ministries');

if (ministrySection) {
  ministrySection.addEventListener('pointermove', (event) => {
    const bounds = ministrySection.getBoundingClientRect();
    ministrySection.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
    ministrySection.style.setProperty('--my', `${event.clientY - bounds.top}px`);
    ministrySection.classList.add('cursor-lit');
  });
  ministrySection.addEventListener('pointerleave', () => ministrySection.classList.remove('cursor-lit'));
}

const communityCarousel = document.querySelector('.community-card');

if (communityCarousel) {
  const slides = [...communityCarousel.querySelectorAll('.community-slide')];
  const previousButton = communityCarousel.querySelector('.carousel-prev');
  const nextButton = communityCarousel.querySelector('.carousel-next');
  const count = communityCarousel.querySelector('.slide-count');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentSlide = 0;
  let timer;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === currentSlide;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    count.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };

  const stopRotation = () => window.clearInterval(timer);
  const startRotation = () => {
    stopRotation();
    if (!reduceMotion) timer = window.setInterval(() => showSlide(currentSlide + 1), 3800);
  };

  previousButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    startRotation();
  });
  nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    startRotation();
  });
  communityCarousel.addEventListener('mouseenter', stopRotation);
  communityCarousel.addEventListener('mouseleave', startRotation);
  communityCarousel.addEventListener('focusin', stopRotation);
  communityCarousel.addEventListener('focusout', startRotation);
  document.addEventListener('visibilitychange', () => document.hidden ? stopRotation() : startRotation());

  showSlide(0);
  startRotation();
}
