function initAOS() {
    if (typeof AOS === "undefined") return;

    AOS.init({
        duration: 850,
        easing: "ease-out-cubic",
        once: true,
        offset: 70
    });
}

function initHeroSwiper() {
    if (typeof Swiper === "undefined") return;
    
    new Swiper('.heroSwiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
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
        grabCursor: true,

        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
        },

        breakpoints: {
            0: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            }
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        }
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
            if (response.ok) return response.text();
            throw new Error(`Could not load ${file}`);
        })
        .then((html) => {
            element.innerHTML = html;
            if (id === "header-placeholder") setActiveNav(element);
            if (typeof AOS !== "undefined") AOS.refresh();
        })
        .catch((error) => console.error("Component load error:", error));
}

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        loadComponent("header-placeholder", "header.html"),
        loadComponent("footer-placeholder", "footer.html")
    ]).then(() => {
        initAOS();
        initHeroSwiper();
        initTestimonialSwiper();
    });
});
