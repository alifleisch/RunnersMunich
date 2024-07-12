document.addEventListener("DOMContentLoaded", function () {
  const themeDarkButton = document.createElement("button");
  themeDarkButton.id = "theme-dark";
  document.querySelector("nav").appendChild(themeDarkButton);

  // Check for saved theme preference in localStorage
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

    // Update button text and save theme preference
    if (document.body.classList.contains("dark-theme")) {
      themeDarkButton.textContent = "Bright Theme";
      localStorage.setItem("theme", "dark-theme");
    } else {
      themeDarkButton.textContent = "Dark Theme";
      localStorage.removeItem("theme");
    }
  });

  // Testimonials switching
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

  // Membership Selection
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

  // Ensure only one video plays at a time by pausing others when a new video starts
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

  // Footer element
  const footer = document.createElement("footer");

  // Footer content container
  const footerContent = document.createElement("div");
  footerContent.className = "footer-content container";

  // Legal section
  const legalSection = document.createElement("div");
  legalSection.className = "footer-section";
  legalSection.innerHTML = `
    <h4>Legal</h4>
    <ul>
    <li><a href="javascript:void(0);" class="legal-link" data-policy="Privacy Policy">Privacy Policy</a></li>
    <li><a href="javascript:void(0);" class="legal-link" data-policy="Terms of Service">Terms of Service</a></li>
    <li><a href="javascript:void(0);" class="legal-link" data-policy="Cookie Policy">Cookie Policy</a></li>
  </ul>
  `;
  document.body.appendChild(legalSection);

  // Newsletter section
  const newsletterSection = document.createElement("div");
  newsletterSection.className = "footer-section";
  newsletterSection.innerHTML = `
    <h4>Newsletter</h4>
    <p>Subscribe to our newsletter for the latest updates:</p>
    <form action="subscribe.php" method="post">
      <input type="email" name="email" placeholder="Enter your email" required />
      <button type="submit" class="btn">Subscribe</button>
    </form>
  `;

  // Popup alert with information when any legal link is clicked
  function showPopup(text) {
    alert(text);
  }
  document.querySelectorAll(".legal-link").forEach((item) => {
    item.addEventListener("click", (event) => {
      const policyText = event.target.getAttribute("data-policy");
      showPopup(
        `${policyText} is currently not available; it will be added as soon as the legacy is approved.`
      );
    });
  });

  // Footer bottom
  const footerBottom = document.createElement("div");
  footerBottom.className = "footer-bottom";
  footerBottom.innerHTML = `<p>&copy; 2024 Sports Voluntary Organization. All rights reserved.</p>`;

  // Append sections to footer content
  footerContent.appendChild(legalSection);
  footerContent.appendChild(newsletterSection);

  // Append footer content and footer bottom
  footer.appendChild(footerContent);
  footer.appendChild(footerBottom);

  // Append footer to the body
  document.body.appendChild(footer);
});

// Newsletter Form Validation
const newsletterForm = document.querySelector("#newsletter-form");
const emailInput = document.querySelector(
  '#newsletter-form input[type="email"]'
);
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    if (!emailInput.value || !emailInput.value.includes("@")) {
      e.preventDefault(); // Prevent form submission
      alert("Please enter a valid email address.");
    }
  });
}

// Webpage is scrolled to the top every time it is reloaded or refreshed.
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
