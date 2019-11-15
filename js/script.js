//Fix about text animation
const about__text = document.querySelectorAll(".about__text");
setTimeout(function () {
    about__text.forEach((text) => {
        text.style.display = "block";
    });
}, 500);