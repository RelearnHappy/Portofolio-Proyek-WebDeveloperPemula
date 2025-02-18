// Simple animation on scroll using Intersection Observer API
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });
  
    const animatedElements = document.querySelectorAll(".animate");
    animatedElements.forEach((element) => observer.observe(element));
  });