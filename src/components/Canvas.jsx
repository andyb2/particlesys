import { useEffect, useRef } from "react";
import { snowSize} from '../utils/helpFunctions.js';
import { Particle } from "../utils/particleClass.js";



const Canvas = () => {
    const canvasRef = useRef(null);
    const height = window.innerHeight;
    const width = window.innerWidth;
    // const flakeSize = snowSize();
    let yPos = -50;
    // let dy = 0.1;
    const snowArray = [];
    
    const xPosition = () => {
        return Math.floor(Math.random() * ((width - 10) - 10 + 1)) + 10; 
    }

    const yPositionRange = () => {
        return Math.floor(Math.random() * (-2000 - 10)) + 10;
    }

    const speed = () => {
        return Math.floor(Math.random() * (4 - 1 + 1) + 1);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        let animationFrame;

        for (let i=0; i<100; i++) {
            const xPos = xPosition();
            const yPos = yPositionRange();
            const dy = speed();
            let flakeSize;

            if ( dy <= 2) {
                flakeSize = snowSize(2, 0.5);
            } else if (dy < 3) {    
                flakeSize = snowSize(4, 3);
            } else if ( dy < 4) {  
                flakeSize = snowSize(6, 5);
            } else {
                flakeSize = snowSize(9, 7);
            }
            snowArray.push(new Particle(xPos, yPos, ctx, flakeSize, height, dy));
        }
        
        const animate = () => {
            animationFrame = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, width, height);

            for (let i=0; i<snowArray.length; i++) {
                snowArray[i].posUpdate();
            }
        }

        animate();

        return () => {
            cancelAnimationFrame(animationFrame);
        }
    },[])
    

    return (
        <canvas ref={canvasRef} />
    )
}

export default Canvas;