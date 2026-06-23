function initAOS() {
  if (typeof AOS === "undefined") return;

  AOS.init({
    duration: 850,
    easing: "ease-out-cubic",
    once: true,
    offset: 70,
  });
}

function initHeroSwiper() {
  if (typeof Swiper === "undefined") return;

  new Swiper(".heroSwiper", {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".heroSwiper .swiper-pagination",
      clickable: true,
    },
  });
}

function initTestimonialSwiper() {
  if (typeof Swiper === "undefined") return;

  const slider = document.querySelector(".testimonial-slider");
  if (!slider) return;

  new Swiper(".testimonial-slider", {
    loop: true,
    speed: 5000,
    spaceBetween: 30,

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },

    pagination: {
      el: ".testimonial-slider .swiper-pagination",
      clickable: true,
    },
  });
}

function setActiveNav(root) {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  root.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
}

function loadComponent(id, file) {
  const element = document.getElementById(id);

  if (!element) return Promise.resolve();

  return fetch(file)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load ${file}`);
      }
      return response.text();
    })
    .then((html) => {
      element.innerHTML = html;

      if (id === "header-placeholder") {
        setActiveNav(element);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

window.addEventListener("load", async () => {
  try {
    document.body.classList.add("loading");

    await Promise.all([
      loadComponent("header-placeholder", "header.html"),
      loadComponent("footer-placeholder", "footer.html"),
    ]);

    initAOS();
    initHeroSwiper();
    initTestimonialSwiper();

    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }

    const preloader = document.querySelector(".preloader");

    setTimeout(() => {

      preloader.classList.add("fade-out");

      document.body.classList.add("content-loaded");
      document.body.classList.remove("loading");

      setTimeout(() => {
        preloader.remove();
      }, 600);

    }, 2500);

  } catch (error) {
    console.error(error);
  }
});
