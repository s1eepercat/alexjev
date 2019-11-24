//Fix about text animation
const about__text = document.querySelectorAll(".about__text");
setTimeout(function () {
    about__text.forEach((text) => {
        text.style.display = "block";
    });
}, 500);

//Fix about section staying open on refresh in a firefox
document.getElementById("about-toggle").checked = false;


//Particle background
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove',
    (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

//create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    //method to draw a particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "#121212";
        ctx.fill();
    }

    //check particle position, mouse position, move the particle, draw the particle
    update() {
        //check if particle is within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }

        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        //check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }

            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }

            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }

            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }

        //move particles
        this.x += this.directionX;
        this.y += this.directionY;
        //draw particles
        this.draw();
    }
}

//create particle array
const init = () => {
    particlesArray = [];
    let numberOfParticles = 50; //(canvas.height * canvas.width) / 9000

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = "#121212";

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();