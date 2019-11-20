//Fix about text animation
const about__text = document.querySelectorAll(".about__text");
setTimeout(function () {
    about__text.forEach((text) => {
        text.style.display = "block";
    });
}, 500);

//Fix about section staying open on refresh in a firefox
document.getElementById("about-toggle").checked = false;