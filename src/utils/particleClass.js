export class Particle {
    constructor(x, y, ctx, flakeSize, dy, dx, height, width) {
        this.ctx = ctx;
        this.y = y;
        this.x = x;
        this.dy = dy;
        this.dx = dx;
        this.flakeSize = flakeSize;
        this.height = height;
        this.width = width;
        this.tempTracked = 0;
        this.tempDx = dx;
    }

    drawSnow() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.flakeSize, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'white';
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 15;
        this.ctx.fill();
    }

    posUpdate(count) {
        if (this.y + this.flakeSize > this.height) {
            this.y = (-this.dy);
        }
        if (this.x + this.flakeSize > this.width) {
            this.x = -this.dx;
        }
        if (count) {
            if (count === 1) {
                this.dx = this.tempDx;
            } else if (count < this.tempTracked) {
                this.tempTracked = count
                this.dx = this.dx - count;
            } else {
                this.dx = this.dx + count;
            }
            this.tempTracked = count;
        }

        this.x += (this.dx);
        this.y += this.dy;
        this.drawSnow();
    }
}