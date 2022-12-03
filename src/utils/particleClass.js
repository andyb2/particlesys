export class Particle {
    constructor(x, y, ctx, flakeSize, height, dy) {
        this.ctx = ctx;
        this.y = y;
        this.x = x;
        this.dy = dy
        this.flakeSize = flakeSize;
        this.height = height;
    }
    drawSnow() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.flakeSize, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'white';
        this.ctx.shadowColor = "grey";
        this.ctx.shadowBlur = 15;
        this.ctx.fill();
    }

    posUpdate() {
        if (this.y + this.flakeSize > this.height) {
            this.y = (-this.dy);
        }
        this.y += this.dy;
        this.drawSnow();
    }
}