import React from 'react';
import ReactDOM from 'react-dom';

export default class Box extends React.Component {                
        x: number = 0;
        y: number = 0;
        lastX: number = 0;
        lastY: number = 0;
        velocityX: number = 0;
        velocityY: number = 0;

        update(delta)
        {
            this.lastX = this.x;
            this.lastY = this.y;

            this.velocityX = 0.08;

            // var t = Math.abs(cursorX - this.x) / (Math.abs(cursorX - this.x) + Math.abs(cursorY - this.y));

            // this.velocityX = cursorX > this.x && this.x < limit ? 0.08  * t:
            //             cursorX < this.x && this.x > 0 ? -0.08 * t:
            //             0;

            // this.velocityY = cursorY > this.y && this.y < limit ? 0.08 *(1-t):
            //             cursorY < this.y && this.y > 0 ? -0.08 *(1-t):
            //             0;

            this.x += this.velocityX * delta;
            this.y += this.velocityY * delta;
        }

        draw(interp){            
            this.setState({ 
                x: (this.lastX + (this.x - this.lastX) * interp),
                y: (this.lastY + (this.y - this.lastY) * interp),
             });
        }
        
        render() {
            return (
                <div style={{ width: 50, height: 50, backgroundColor: 'green'}} />
            );
        }
}