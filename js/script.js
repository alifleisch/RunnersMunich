document.addEventListener("DOMContentLoaded", function () {
  // Загрузка шаблона заголовка
  fetch('../templates/header.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      // Вставка кнопки темной темы после загрузки заголовка
      const themeDarkButton = document.createElement("button");
      themeDarkButton.id = "theme-dark";
      document.querySelector("nav").appendChild(themeDarkButton);

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeDarkButton.textContent =
          savedTheme === "dark-theme" ? "Bright Theme" : "Dark Theme";
      } else {
        themeDarkButton.textContent = "Dark Theme";
      }

      themeDarkButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
          themeDarkButton.textContent = "Bright Theme";
          localStorage.setItem("theme", "dark-theme");
        } else {
          themeDarkButton.textContent = "Dark Theme";
          localStorage.removeItem("theme");
        }
      });
    });

  // Загрузка шаблона футера
  fetch('../templates/footer.html')
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML('beforeend', data);

      // Всплывающее окно для юридических ссылок
      document.querySelectorAll(".legal-link").forEach(item => {
        item.addEventListener("click", event => {
          const policyText = event.target.getAttribute("data-policy");
          alert(`${policyText} is currently not available; it will be added as soon as the legacy is approved.`);
        });
      });

      // Валидация формы новостной рассылки
      const newsletterForm = document.querySelector("#newsletter-form");
      const emailInput = document.querySelector('#newsletter-form input[type="email"]');
      if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
          if (!emailInput.value || !emailInput.value.includes("@")) {
            e.preventDefault();
            emailInput.setCustomValidity("Please enter a valid email address.");
            emailInput.reportValidity();
          } else {
            emailInput.setCustomValidity("");
          }
        });
      }
    });

  // Переключение отзывов
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll("#testimonials blockquote");
  const showTestimonial = (index) => {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? "block" : "none";
    });
  };
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 5000); // Change every 5 seconds

  showTestimonial(currentTestimonial);

  // Выбор членства
  const membershipDetails = document.getElementById("membership-details");
  if (membershipDetails) {
    membershipDetails.textContent =
      "Select a membership Level to see the benefits.";
  }

  const membershipSelect = document.getElementById("membership-select");
  if (membershipSelect) {
    membershipSelect.addEventListener("change", function () {
      const tier = this.value;
      let details = "";

      switch (tier) {
        case "bronze":
          details =
            "Bronze Level: Access to community events and 10% discount on merchandise. Requires 15 points.";
          break;
        case "silver":
          details =
            "Silver Level: Includes Bronze benefits plus exclusive training sessions and 15% discount on merchandise. Requires 30 points.";
          break;
        case "gold":
          details =
            "Gold Level: All Silver benefits plus personal coaching sessions and 20% discount on merchandise. Requires 50 points.";
          break;
        default:
          details = "Select a membership Level to see the benefits.";
          break;
      }

      membershipDetails.textContent = details;
    });
  }

  // Управление воспроизведением видео
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.addEventListener("play", (event) => {
      videos.forEach((otherVideo) => {
        if (otherVideo !== video) {
          otherVideo.pause();
        }
      });
    });
  });

  // Перезагрузка страницы
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
});