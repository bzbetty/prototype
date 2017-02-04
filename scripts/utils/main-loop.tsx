export default class GameLoop  {
    limit : number = 300;
    lastFrameTimeMs : number  = 0;
    maxFPS : number  = 60;
    delta : number  = 0;
    timestep : number  = 1000 / 60;
    fps : number  = 60;
    framesThisSecond : number  = 0;
    lastFpsUpdate : number  = 0;
    running : boolean  = false;
    started : boolean  = false;
    frameID : number  = 0;
    runTime : number  = 0;
    subscribers: Array<Object> = [];

    update(delta) {
        this.subscribers.forEach(i => i.update(delta));    
    }

    draw(interp) {    
        this.subscribers.forEach(i => i.draw(interp));        
    }

    begin(timestamp, delta) {
        //calculate the FPS
        // if (timestamp > this.lastFpsUpdate + 1000) {
        //     this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;

        //     this.lastFpsUpdate = timestamp;
        //     this.framesThisSecond = 0;

        //     //runTime++
        //     // if(runTime % 10 == 0)
        //     // {
        //     //     objects.push(new createBox('box2', 200));
        //     // }
        // }
        // this.framesThisSecond++;
    }

    end(fps) {

    }

    start() {
        if (!this.started) {
            this.started = true;
            this.frameID = requestAnimationFrame((timestamp) => {
                this.draw(1);
                this.running = true;
                this.lastFrameTimeMs = timestamp;
                // this.lastFpsUpdate = timestamp;
                // this.framesThisSecond = 0;                
                this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
            });
        }
    }

    stop() {
        this.running = false;
        this.started = false;
        cancelAnimationFrame(this.frameID);
    }

    mainLoop(timestamp) {
        // Throttle the frame rate.    
        if (timestamp < this.lastFrameTimeMs + this.timestep) {
            this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
            return;
        }
        this.delta += timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;

        this.begin(timestamp, this.delta);   

        //perform updates
        var numUpdateSteps = 0;
        while (this.delta >= this.timestep) {
            this.update(this.timestep);
            this.delta -= this.timestep;
            if (++numUpdateSteps >= 240) {
                this.panic();
                break;
            }
        }

        //draw the update
        this.draw(this.delta / this.timestep);

        this.end(this.fps);

        //schedule next update
        this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
    }

    subscribe(callback) {
        return this.subscribers.push(callback);
    }

    unsubscribe(id) {
        delete this.subscribers[id - 1];
    }

    panic() {

    }

}