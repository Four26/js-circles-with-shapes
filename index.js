const getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Shape {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.element = document.createElement('div');
        this.element.classList.add('shape');
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
        this.element.style.backgroundColor = this.color;
        document.getElementById('container').appendChild(this.element);
    }

    shrink() {
        let size = parseInt(this.element.style.width);
        if (size > 0) {
            size -= 1;
            this.element.style.width = this.element.style.height = size + 'px';
            const self = this;
            setTimeout(function () {
                self.shrink();
            }, 50);
        } else {
            document.getElementById('container').removeChild(this.element);
        }
    }
}

class Circle extends Shape {
    constructor(x, y, radius, color) {
        super(x, y, color);
        this.radius = radius;
        this.element.classList.add('circle');
        this.element.style.width = this.element.style.height = this.radius * 2 + 'px';
    }
}

class Square extends Shape {
    constructor(x, y, size, color) {
        super(x, y, color);
        this.size = size;
        this.element.classList.add('square');
        this.element.style.width = this.element.style.height = this.size + 'px';
    }
}

class Rectangle extends Shape {
    constructor(x, y, width, height, color) {
        super(x, y, color);
        this.width = width;
        this.height = height;
        this.originalWidth = width;
        this.originalHeight = height;
        this.element.classList.add('rectangle');
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
    }

    shrink() {
        let size = parseInt(this.element.style.width);
        if (size > 0) {
            size -= 1;
            this.element.style.width = size + 'px';
            this.element.style.height = (size * this.originalHeight / this.originalWidth) + 'px';
            const self = this;
            setTimeout(function () {
                self.shrink();
            }, 70);
        } else {
            document.getElementById('container').removeChild(this.element);
        }
    }
}


const resetScreen = function () {
    const shapes = document.querySelectorAll(".shape");
    shapes.forEach(function (shape) {
        document.getElementById('container').removeChild(shape);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const colorOptions = document.querySelectorAll(".color-option");
    let selectedColor = "green";
    let selectedShape = "round";

    colorOptions.forEach(function (option) {
        option.addEventListener("click", function () {
            selectedColor = option.style.backgroundColor;
            colorOptions.forEach(function (event) {
                event.classList.remove("selected");
                event.querySelector(".shape-option").style.backgroundColor = 'white';
            });
            option.classList.add("selected");
            option.querySelector(".shape-option").style.backgroundColor = selectedColor;
        });
    });


    const shapeOptions = document.querySelectorAll(".shape-option");
    shapeOptions.forEach(function (option) {
        option.addEventListener("click", function () {
            selectedShape = option.id;
            shapeOptions.forEach(function (event) {
                event.classList.remove("selected");
            });
            option.classList.add("selected");
            option.style.backgroundColor = selectedColor;
            shapeOptions.forEach(function (event) {
                if (event !== option) {
                    event.style.backgroundColor = 'white';
                }
            });
        });
    });

    document.getElementById('container').addEventListener("mousedown", function (event) {
        let x = event.clientX;
        let y = event.clientY;
        let color = selectedColor;
        let shape;
        switch (selectedShape) {
            case "round":
                shape = new Circle(x, y, getRandomInt(10, 200), color);
                console.log(shape);
                break;
            case "square":
                shape = new Square(x, y, getRandomInt(50, 200), color);
                console.log(shape);
                break;
            case "rectangle":
                let width = getRandomInt(50, 200);
                let height = getRandomInt(10, 200);
                shape = new Rectangle(x, y, width, height, color);
                break;
            default:
                shape = new Circle(x, y, getRandomInt(10, 200), color);
                break;
        }
        shape.shrink();

    });

    const resetButton = document.querySelector("#reset-button");
    resetButton.addEventListener("click", function () {
        resetScreen();
    });
});
