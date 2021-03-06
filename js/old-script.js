//Fix about text animation
const about__text = document.querySelectorAll(".about__text");
setTimeout(function () {
    about__text.forEach((text) => {
        text.style.display = "block";
    });
}, 500);

//Fix about section staying open on refresh in a firefox
document.getElementById("about-toggle").checked = false;


//Debug background on Microsoft Edge, also no particles on ME
if (navigator.userAgent.indexOf("Edge") != -1) {
    document.getElementById("background").addEventListener('animationstart', () => {
        setTimeout(() => {
            document.getElementById("background").style.backgroundImage = "url('../img/me.jpg')";
        }, 950);
    })
} else {
    //--------------------------------------------------------------
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
        radius: 100
    }

    window.addEventListener('mousemove',
        (event) => {
            mouse.x = event.pageX;
            mouse.y = event.pageY;
        }
    );

    //create particle
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = 0;
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

            //If some particles were stuck outside of the canvas, teleport them to the top
            if (this.y > canvas.height + 15) { //for vertical
                this.y = 0;
                this.directionY = Math.abs(this.directionY);
            }

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
        let numberOfParticles = ((canvas.height * canvas.width) / 9000) * 0.5;
        if (numberOfParticles < 50) { numberOfParticles = 60 };

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
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                    ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                if (distance < (canvas.width / 9) * (canvas.height / 9)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(18,18,18,' + opacityValue + ')';
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

        ctx.clearRect(0, 0, body.scrollWidth, body.scrollHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }

        connect();
    }


    //mouse out event
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    })

    init();
    animate();




    //Init variables for canvas resizing
    let canvasOriginalHeight = canvas.height;


    //Detect if device is a touch screen
    let isTouchScreen = 0;
    window.addEventListener('touchstart', () => {
        isTouchScreen = 1;
    });


    //Detect if orientation has changed
    let orientationChanged = 0;
    window.addEventListener("orientationchange", () => {
        orientationChanged = 1;
    });


    //resize canvas on screen resize
    window.addEventListener('resize', () => {
        if (isTouchScreen === 0 && orientationChanged === 0) {
            resize();
        } else if ((isTouchScreen === 0 && orientationChanged === 1) || (isTouchScreen === 1 && orientationChanged === 1)) {
            //touch devices allow resize only on orientation change, as resize is sometimes triggered by the browser top bar
            orientationChanged = 0;
            resize();
        }
    });


    //Actual resize function
    function resize() {
        let footerHeight = document.getElementById("footer").offsetHeight;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - footerHeight;

        setTimeout(function () { //to make sure sizing is correct
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - footerHeight;

            //Get new canvas size as soon as projects close
            canvasOriginalHeight = canvas.height;
        }, 250);

        //Uncheck projects and shut the section instantly
        const container = document.getElementById("projects-container");
        container.classList.add('notransition'); //disable transitions
        document.getElementById("projects-toggle").checked = false;
        container.offsetHeight; // Trigger a reflow, flushing the CSS changes
        container.classList.remove('notransition'); // Re-enable transitions

        init();
    }


    //resize canvas with a delay on project opening / closing
    const resizeProjects = () => {

        //Opening
        if (canvas.height === canvasOriginalHeight) {
            setTimeout(function () {
                canvas.height = body.scrollHeight;
            }, 600);
        }

        //Closing
        if (canvas.height > canvasOriginalHeight) {
            canvas.height = canvasOriginalHeight;

            setTimeout(function () {
                canvas.height = body.scrollHeight;
            }, 600); //slightly bigger gap than the animation itself
        }
    }

    document.getElementById('projects-toggle').addEventListener('input', resizeProjects);
}