var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      1024: { slidesPerView: 5 }
    }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("darkModeToggle"); // Make sure this ID matches your button
    const htmlElement = document.documentElement;

    if (!toggleBtn) {
        console.error("Dark mode toggle button not found! Check your HTML.");
        return;
    }

    // Load user preference
    if (localStorage.getItem("theme") === "dark") {
        htmlElement.classList.add("dark");
    }

    // Toggle dark mode
    toggleBtn.addEventListener("click", () => {
        htmlElement.classList.toggle("dark");
        localStorage.setItem("theme", htmlElement.classList.contains("dark") ? "dark" : "light");
    });
});

    