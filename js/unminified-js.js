const about__text = document.querySelectorAll(".about__text");
if (setTimeout(function () {
    about__text.forEach(a => {
        a.style.display = "block"
    })
}, 500), document.getElementById("about-toggle").checked = !1, -1 != navigator.userAgent.indexOf("Edge")) document.getElementById("background").addEventListener("animationstart", () => {
    setTimeout(() => {
        document.getElementById("background").style.backgroundImage = "url('../img/1.jpg')"
    }, 950)
});
else {
    function a() {
        let a = document.getElementById("footer").offsetHeight;
        c.width = e.scrollWidth, c.height = e.scrollHeight - a, setTimeout(function () {
            c.width = e.scrollWidth, c.height = e.scrollHeight - a, l = c.height
        }, 250);
        const b = document.getElementById("projects-container");
        b.classList.add("notransition"), document.getElementById("projects-toggle").checked = !1, b.offsetHeight, b.classList.remove("notransition"), i()
    }
    const c = document.getElementById("canvas"),
        d = c.getContext("2d"),
        e = document.getElementById("body");
    c.width = e.scrollWidth, c.height = e.scrollHeight;
    let f, g = {
        x: null,
        y: null,
        radius: 100
    };
    window.addEventListener("mousemove", a => {
        g.x = a.pageX, g.y = a.pageY
    });
    class h {
        constructor(a, b, c, d, e, f) {
            this.x = a, this.y = b, this.directionX = 0, this.directionY = d, this.size = e, this.color = f
        }
        draw() {
            d.beginPath(), d.arc(this.x, this.y, this.size, 0, 2 * Math.PI, !1), d.fillStyle = "#121212", d.fill()
        }
        update() {
            (this.x > c.width || 0 > this.x) && (this.directionX = -this.directionX), (this.y > c.height || 0 > this.y) && (this.directionY = -this.directionY), this.y > c.height + 15 && (this.y = 0, this.directionY = Math.abs(this.directionY));
            let a = g.x - this.x,
                b = g.y - this.y,
                d = Math.sqrt(a * a + b * b);
            d < g.radius + this.size && (g.x < this.x && this.x < c.width - 10 * this.size && (this.x += 10, this.directionX = -this.directionX), g.x > this.x && this.x > 10 * this.size && (this.x -= 10, this.directionX = -this.directionX), g.y < this.y && this.y < c.height - 10 * this.size && (this.y += 10, this.directionY = -this.directionY), g.y > this.y && this.y > 10 * this.size && (this.y -= 10, this.directionY = -this.directionY)), this.x += this.directionX, this.y += this.directionY, this.draw()
        }
    }
    const i = () => {
        f = [];
        let a = 0.5 * (c.height * c.width / 9e3);
        50 > a && (a = 60);
        for (let b = 0; b < a; b++) {
            let a = 1 * Math.random() + 1,
                b = Math.random() * (innerWidth - 2 * a - 2 * a) + 2 * a,
                c = Math.random() * (innerHeight - 2 * a - 2 * a) + 2 * a,
                d = 5 * Math.random() - 2.5,
                e = 5 * Math.random() - 2.5;
            f.push(new h(b, c, d, e, a, "#121212"))
        }
    },
        j = () => {
            let e = 1;
            for (let g = 0; g < f.length; g++)
                for (let a, h = g; h < f.length; h++) a = (f[g].x - f[h].x) * (f[g].x - f[h].x) + (f[g].y - f[h].y) * (f[g].y - f[h].y), a < c.width / 9 * (c.height / 9) && (e = 1 - a / 2e4, d.strokeStyle = "rgba(18,18,18," + e + ")", d.lineWidth = 1, d.beginPath(), d.moveTo(f[g].x, f[g].y), d.lineTo(f[h].x, f[h].y), d.stroke())
        },
        k = () => {
            requestAnimationFrame(k), d.clearRect(0, 0, e.scrollWidth, e.scrollHeight);
            for (let a = 0; a < f.length; a++) f[a].update();
            j()
        };
    window.addEventListener("mouseout", () => {
        g.x = void 0, g.y = void 0
    }), i(), k();
    let l = c.height,
        m = 0;
    window.addEventListener("touchstart", () => {
        m = 1
    });
    let n = 0;
    window.addEventListener("orientationchange", () => {
        n = 1
    }), window.addEventListener("resize", () => {
        0 === m && 0 === n ? a() : (0 === m && 1 == n || 1 === m && 1 == n) && (n = 0, a())
    });
    const o = () => {
        c.height === l && setTimeout(function () {
            c.height = e.scrollHeight
        }, 600), c.height > l && (c.height = l, setTimeout(function () {
            c.height = e.scrollHeight
        }, 600))
    };
    document.getElementById("projects-toggle").addEventListener("input", o)
}