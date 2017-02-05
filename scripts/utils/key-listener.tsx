export default class KeyListener {
    keys: { [id: number]: boolean } = {};

    down = (event) => {
        if (event.keyCode >= 32 && event.keyCode <= 111) {
            event.preventDefault();
            this.keys[event.keyCode] = true;
        }
    };

    up = (event) => {
        if (event.keyCode in this.keys) {
            event.preventDefault();
            delete this.keys[event.keyCode];
        }
    };

    isDown = (keyCode) => {
        return this.keys[keyCode] || false;
    }

    subscribe = () => {
        window.addEventListener('keydown', this.down);
        window.addEventListener('keyup', this.up);
        this.keys = {};
    }

    unsubscribe = () => {
        window.removeEventListener('keydown', this.down);
        window.removeEventListener('keyup', this.up);
        this.keys = {};
    }
}