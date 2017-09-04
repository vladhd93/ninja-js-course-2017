class Rectangle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  static TEST() {
    console.log(123);
    return 345;
  }

  static get zero() {
    return new Point(0, 0);
  }

  *[Symbol.iterator]() {
    const { x, y, height, width } = this;
    yield { x, y };
    yield { x: x + width, y };
    yield { x: x + width, y: y + height };
    yield { x, y: y + height };
  }

  toString() {
    return ` ${this.x},${this.y}`;
  }
}

class FilledRectangle extends Rectangle {
  constructor(x, y, width, height, color) {
    super(x, y, width, height);
    this.color = color;
  }
}

let rect = new Rectangle(3, 3, 100, 100);
for (const point of rect) {
  console.log(point);
}

const colorRect = new FilledRectangle(2, 2, 100, 100, 'red');
