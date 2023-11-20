document.querySelectorAll('a[href^="#section-"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector("." + this.getAttribute('href').replace('#', '')).scrollIntoView({
        behavior: "smooth"
      });
    });
  });