import { useEffect, useRef, useState } from "react";
import "./canvas.css"
import { snowSize, startingXPosition, yPositionRange, speed } from '../utils/helpFunctions.js';
import { Particle } from "../utils/particleClass.js";
import { snowArray } from "../utils/snowArray"

const Canvas = () => {
    const canvasRef = useRef(null);
    const [ count, setCount ] = useState(0);
    const [ fired, setFired ] = useState(null);
    const height = window.innerHeight;
    const width = window.innerWidth;

    const createWind = () => {
        clearInterval(fired);
        if (count === 5) {
            // windSpeedTracker(0);
            return;
        }
        // setCount(0);
        let speedTrack = 0;
        setFired(setInterval(() => {
            speedTrack++
            windSpeedTracker(speedTrack);
        }, 100));
    }

    const stopWind = (count) => {
        let speedTrack = count;
        clearInterval(fired);

        setFired(setInterval(() => {
            speedTrack--;
            windSpeedTracker(speedTrack);
        }, 300));

        if (speedTrack === 0) {
            clearInterval(fired);
        }
    }

    const windSpeedTracker = (num) => {
        setCount(num);
        for (let i=0; i<snowArray.length; i++) {
            snowArray[i].posUpdate(num)
        }
    }

    useEffect(() => {
        if (count >= 5) {
            clearInterval(fired);
        }
        if (count <= 0) {
            setCount(0);
            clearInterval(fired);
        }
    }, [count]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        let animationFrame;

        for (let i=0; i<75; i++) {
            const xPos = startingXPosition(width);
            const yPos = yPositionRange();
            const dy = speed();
            const dx = 1;
            let flakeSize;

            if ( dy <= 3) {
                flakeSize = snowSize(2, 1);
            } else if (dy <= 4) { 
                flakeSize = snowSize(4, 3);
            } else if ( dy === 5) {  
                flakeSize = snowSize(7, 5);
            } else {
                flakeSize = snowSize(9, 7);
            }
            snowArray.push(new Particle(xPos, yPos, ctx, flakeSize, dy, dx, height, width));
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
        <>   
            <div className="accelerator">
                <p className="wind">Wind</p>
                {
                    [...Array(5)].map((placeholder, idx) => {
                        return (
                            <div className={`box ${count >= (idx+1) && "filled-box"}`} key={`box-${idx}`}/>
                        )
                    })
                }
            </div>     
            <canvas onMouseDown={() => createWind()} onMouseUp={() => stopWind(count)} ref={canvasRef} />
        </>
    )
}

export default Canvas;