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
		let snake = this.asArray();
		snake.forEach(function(part, of, snake) {
			$('#x' + part.x + 'y' + part.y).css('background', part.color);
		});
	}


	// голова движется вниз
	headDown() {
		var headDown = new snakePart(this.head.x, this.head.y-1, this.head.color);
		return headDown;
	}


	// голова движется вправо
	headRight() {
		var headRight = new snakePart(this.head.x+1, this.head.y, this.head.color);
		return headRight;
	}


	// голова движется влево
	headLeft() {
		var headLeft = new snakePart(this.head.x-1, this.head.y, this.head.color);
		return headLeft;
	}


	// голова движется вверх
	headUp() {
		var headUp = new snakePart(this.head.x, this.head.y+1, this.head.color);
		return headUp;
	}


	// отбросить хвост - последнюю клетку (для движения)
	dropTail() {
		$('#x' + this.tail.x + 'y' + this.tail.y).css('background', 'white');
	}


	// обновление при движении
	update(newHead) {
		this.dropTail();
		this.tail = this.body.shift();
		this.body.push(this.head);
		this.head = newHead;
		this.render();		
	}


	// "съесть" печеньку / вырасти
	yum(cell) {
		let newCell = new snakePart(cell.x, cell.y, 'orange');
		this.body.push(this.head);
		this.head = newCell;
		this.render();		
	}


	// длина змейки
	length() {
		return this.asArray().length;
	}


	// змейка в виде массива
	asArray() {
		return [this.tail].concat(this.body).concat(this.head);
	}

}
