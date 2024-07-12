// DOM utility functions:

const el = (sel, par) => (par || document).querySelector(sel);
const els = (sel, par) => (par || document).querySelectorAll(sel);
const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);

// Helper functions:

const mod = (n, m) => (n % m + m) % m;

// Task: Carousel:

const carousel = (elCarousel) => {

  const animation = 500;
  const pause = 5000;
  // Or use something like: const animation = Math.abs(elCarousel.dataset.carouselAnimation ?? 500);

  const elCarouselSlider = el(".carousel-slider", elCarousel);
  const elsSlides = els(".carousel-slide", elCarouselSlider);
  const elsBtns = [];

  let itv; // Autoslide interval
  let tot = elsSlides.length; // Total slides
  let c = 0;

  if (tot < 2) return; // Not enough slides. Do nothing.

  // Methods:
  const anim = (ms = animation) => {
    const cMod = mod(c, tot);
    // Move slider
    elCarouselSlider.style.transitionDuration = `${ms}ms`;
    elCarouselSlider.style.transform = `translateX(${(-c - 1) * 100}%)`;
    // Handle active classes (slide and bullet)
    elsSlides.forEach((elSlide, i) => elSlide.classList.toggle("is-active", cMod === i));
    elsBtns.forEach((elBtn, i) => {
      elBtn.classList.toggle("is-active", cMod === i);
      elBtn.setAttribute('aria-disabled', cMod === i);
    });
  };

  const prev = () => {
    if (c <= -1) return; // prevent blanks on fast prev-click
    c -= 1;
    anim();
  };

  const next = () => {
    if (c >= tot) return; // prevent blanks on fast next-click
    c += 1;
    anim();
  };

  const goto = (index) => {
    c = index;
    anim();
  };

  const play = () => {
    elCarouselSlider.setAttribute("aria-live", "off");
    itv = setInterval(next, pause + animation);
  };

  const stop = () => {
    clearInterval(itv);
 elCarouselSlider.setAttribute("aria-live", "polite");
  };

  // Buttons:

  const elPrev = elNew("button", {
  
   
   
    onclick: () => prev(),
  });
  elPrev.setAttribute("aria-controls", "slides");
  elPrev.setAttribute("aria-label", "Previous slide");

  const elNext = elNew("button", {
  
    onclick: () => next(),
  });
  elNext.setAttribute("aria-controls", "slides");
  elNext.setAttribute("aria-label", "Next slide");

  // Navigation:

  const elNavigation = elNew("div", {
    className: "carousel-navigation",
    role: "group"
  });
  elNavigation.setAttribute("aria-label", "Choose slide to display");

  // Navigation bullets:

  for (let i = 0; i < tot; i++) {
    const elBtn = elNew("button", {
      type: "button",
      className: "carousel-bullet",
      onclick: () => goto(i)
    });
    elBtn.setAttribute("aria-labelledby", `slide${i+1}`)
    elsBtns.push(elBtn);
  }


  // Events:

  // Infinite slide effect:
  elCarouselSlider.addEventListener("transitionend", () => {
    if (c <= -1) c = tot - 1;
    if (c >= tot) c = 0;
    anim(0); // quickly switch to "c" slide (with animation duration 0)
  });

  // Pause on pointer enter:
  elCarousel.addEventListener("pointerenter", () => stop());
  elCarousel.addEventListener("pointerleave", () => play());

  // Pause on focus:
  elCarousel.addEventListener("focus", () => stop(), true);
  elCarousel.addEventListener("blur", () => play(), true);

  // Init:

  // Insert UI elements:
  elNavigation.append(...elsBtns);
  elCarousel.append(elPrev, elNext, elNavigation);

  // Clone first and last slides (for "infinite" slider effect)
  elCarouselSlider.prepend(elsSlides[tot - 1].cloneNode(true));
  elCarouselSlider.append(elsSlides[0].cloneNode(true));

  // Initial slide
  anim(0);

  // Start autoplay
  play();
};

// Allows to use multiple carousels on the same page:
els(".carousel").forEach(carousel);