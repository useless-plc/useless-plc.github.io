// часть змейки
class snakePart {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}
}


// змейка
class Snake {
	constructor(tail, body, head) {
		this.tail = tail;
		this.body = body;
		this.head = head;
	}

	// отрисовка змейки
	render() {
		let snake = [this.tail].concat(this.body).concat(this.head);
		snake.forEach(function(part, of, snake) {
			$('#x' + part.x + 'y' + part.y).css('background', part.color);
		});
	}


	headDown() {
		var headDown = new snakePart(this.head.x, this.head.y-1, this.head.color);
		return headDown;
	}


	headRight() {
		var headRight = new snakePart(this.head.x+1, this.head.y, this.head.color);
		return headRight;
	}


	headLeft() {
		var headLeft = new snakePart(this.head.x-1, this.head.y, this.head.color);
		return headLeft;
	}


	headUp() {
		var headUp = new snakePart(this.head.x, this.head.y+1, this.head.color);
		return headUp;
	}


	dropTail() {
		$('#x' + this.tail.x + 'y' + this.tail.y).css('background', 'white');
	}


	update(newHead) {
		this.dropTail();
		this.tail = this.body.shift();
		this.body.push(this.head);
		this.head = newHead;
		this.render();		
	}


	grow(cell) {
		let newCell = new snakePart(cell.x, cell.y, 'orange');
		this.body.push(this.head);
		this.head = newCell;
		this.render();
	}
}
