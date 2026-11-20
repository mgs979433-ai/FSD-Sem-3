const EventEmitter = require('events');

// 1. Custom EventEmitter
class CustomEventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }
}

const myEmitter = new CustomEventEmitter();

myEmitter.on("greet", () => {
    console.log("Hello! Welcome to Node.js");
});

myEmitter.on("exit", () => {
    console.log("Goodbye! Exiting the program");
});

myEmitter.emit("greet");
myEmitter.emit("exit");

// 2. DOM-like event handling using Node.js events
const button = new EventEmitter();

button.on("click", () => {
    console.log("Button clicked");
});

button.on("mouseover", () => {
    console.log("Mouse moved over the button");
});

button.on("mouseout", () => {
    console.log("Mouse moved out of the button");
});

button.emit("click");
button.emit("mouseover");
button.emit("mouseout");

// 3. Visualize the Event Loop
console.log("Program Started");

setTimeout(() => {
    console.log("setTimeout executed");
}, 0);

setImmediate(() => {
    console.log("setImmediate executed");
});

process.nextTick(() => {
    console.log("process.nextTick executed");
});

console.log("Program Ended");