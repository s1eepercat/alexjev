//Fix about text animation
const about__text = document.querySelectorAll(".about__text");
setTimeout(function () {
    about__text.forEach((text) => {
        text.style.display = "block";
    });
}, 500);

//Fix about section staying open on refresh in a firefox
document.getElementById("about-toggle").checked = false;


//--------------------------------------------------------------
//Particle background
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const body = document.getElementById("body");

const rect = body.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

let particlesArray;

//get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 130) * (canvas.width / 130)
}

window.addEventListener('mousemove',
    (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

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
                this.directionX = -this.directionX;
            }

            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
                this.directionX = -this.directionX;
            }

            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
                this.directionY = -this.directionY;
            }

            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
                this.directionY = -this.directionY;
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
    let numberOfParticles = (canvas.height * canvas.width) / 9000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 1) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = "#121212";

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

const connect = () => {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 9) * (canvas.height / 9)) {
                ctx.strokeStyle = "#121212";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

//animation loop
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight * 2);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    connect();
}

//resize canvas
const resizeInstant = () => {
    const rect = body.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    // init();
}

//resize canvas 25 times in .35s gap
const resizeDelay = () => {
    var callCount = 0;
    var repeater = setInterval(function () {

        if (callCount < 25) {

            const rect = body.getBoundingClientRect();

            if (document.getElementById('projects-toggle').checked == true) {
                //is opening
                canvas.height = rect.height;
            } else {
                //is closing
                canvas.height = rect.height - 58;
            }

            callCount += 1;

        } else {
            clearInterval(repeater);

            const rect = body.getBoundingClientRect();
            canvas.height = rect.height;
        }

    }, 14);
}

window.addEventListener('resize', resizeInstant);
document.getElementById('projects-toggle').addEventListener('input', resizeDelay);




init();
animate();