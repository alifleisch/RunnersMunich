document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "assets/images/c1.jpg",
    "assets/images/c2.jpg",
    "assets/images/c3.jpg",
    "assets/images/c4.jpg",
    "assets/images/c5.jpg",
    "assets/images/c6.jpg",
    "assets/images/c7.jpg",
  ];

  let currentIndex = 0;

  const updateImage = (index) => {
    document.getElementById("carousel-img").src = images[index];
  };

  document.getElementById("left-arrow").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(currentIndex);
  });

  document.getElementById("right-arrow").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex);
  });

  updateImage(currentIndex);
});
