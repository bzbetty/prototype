export default class MainLoop  {
    limit : number = 300;
    lastFrameTimeMs : number  = 0;
    delta : number  = 0;
    timestep : number  = 1000 / 60;
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
       
    }

    start() {
        if (!this.started) {
            this.started = true;
            this.frameID = requestAnimationFrame((timestamp) => {
                this.draw(1);
                this.running = true;
                this.lastFrameTimeMs = timestamp;
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

        this.subscribers.forEach(i => i.begin(timestamp, this.delta));   

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