
function theGame() {
	// вместо getElementById
function get(e) {
	return document.getElementById(e);
}

// часть змейки
class snakePart {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	}

	getCell() {
		return get('x' + this.x + 'y' + this.y);
	}
}


// змейка
class Snake {
	constructor(tail, body, head) {
		this.tail = tail;
		this.body = [body];
		this.head = head;
	}

	// отрисовка змейки
	render() {
		let snake = this.asArray();
		snake.forEach(function(part, of, snake) {
			part.getCell().style.background = part.color;
		});
	}


	// затирание всех ячеек, занимаемых змейкой
	clear() {
		let snake = this.asArray();
		snake.forEach(function(part, of, snake) {
			part.getCell().style.background = 'white';
		});
	}


	move(direction) {
		let moves = {
			'up': {x: this.head.x, y: this.head.y+1},
			'down': {x: this.head.x, y: this.head.y-1},
			'right': {x: this.head.x+1, y: this.head.y},
			'left': {x: this.head.x-1, y: this.head.y},
		}

		let nextHead = moves[direction];

		let head = new snakePart(nextHead.x, nextHead.y, this.head.color);
		
		return head;
	}


	// отбросить хвост - последнюю клетку (для движения)
	dropTail(tail) {
		tail.getCell().style.background = 'white';
	}

	getTail() {
		return this.tail
	}


	// обновление при движении
	update(newHead) {
		this.tail = this.body.shift();
		this.body.push(this.head);
		this.head = newHead;	
	}


	// "съесть" печеньку / вырасти
	yum(cell) {
		let newCell = new snakePart(cell.x, cell.y, 'orange');
		this.body.push(this.head);
		this.head = newCell;		
	}


	// длина змейки
	length() {
		return this.asArray().length;
	}


	// змейка в виде массива
	asArray() {
		return [this.tail].concat(this.body).concat(this.head);
	}

	// змейка в виде массива координат её частей
	asCoordArray() {
		let snakeArray = this.asArray();
		let coordArray = [];

		snakeArray.forEach(function(part, of, snakeArray) {
			coordArray.push([part.x, part.y].join(':'));
		});

		return coordArray;
	}

}







// поле
let s;
let fieldWidth = 20; // ширина поля
let fieldHeight = 20; // длина поля

j = fieldHeight;

while(j != 0) {

	i = 0;
	let tr = document.createElement('tr');
	while(i < fieldWidth) {		
		let td = document.createElement('td');
		td.setAttribute('id', 'x' + (i+1) + 'y' + j);		
		tr.append(td);
		i += 1;
	}
	get('snake_field').append(tr);
	j -= 1;
}


/// случайное число
let randomNum = (x) => {return Math.floor(Math.random() * x + 1)};


// случайная ячейка для печеньки
function newCookieCell()  {
	let cellX = randomNum(fieldWidth-1);
	let cellY = randomNum(fieldHeight-1);
	let snakeArray = snake.asArray();


	// чтобы печенька не появлялась на теле змейки
	let snakeCoords = [];
	for(i in snake.asArray()) {
		snakeCoords.push([snakeArray[i].x, snakeArray[i].y].join(','));
	};


	while (snakeCoords.find(item => item == [cellX, cellY].join(',')) != undefined) {
		cellX = randomNum(fieldWidth-1);
		cellY = randomNum(fieldHeight-1);
	}

	get('x' + cellX + 'y' + cellY).style.background = 'gold';
	return {x: cellX, y: cellY}
};



// змейка
let tail = new snakePart(1, 10, 'orange');
let body = new snakePart(1, 9, 'orange');
let head = new snakePart(1, 8, 'orange');
let snake = new Snake(tail, body, head);
let currentDirection = 'down';
let cookieCell = newCookieCell();


// коснулась ли голова туловища
function touchedSelf(head) {
	let bodyCoords = snake.asCoordArray();
	if (bodyCoords.find(item => item == head) != undefined) {
		return true;
	}
	else {
		return false;
	}
}

function touchedWall(head) {
	let nextCoords = head.split(':');
	let x = Number(nextCoords[0]);
	let y = Number(nextCoords[1]);

	if (x > fieldWidth || x < 1 ||
		y > fieldHeight || y < 1) {
		return true;
	}

	else {
		return false;
	}
}


// смена направления
document.addEventListener('keydown', function(e) {
	let buttons = {
		'37': {direction: 'left', restricted: 'right'},
		'38': {direction: 'up', restricted: 'down'},
		'39': {direction: 'right', restricted: 'left'},
		'40': {direction: 'down', restricted: 'up'},
	}

	let button = buttons[e.keyCode];

	if (button != undefined && currentDirection != button.restricted) {
			currentDirection = buttons[e.keyCode].direction;
		}
});


// главная функция
function main() {
	let tail = snake.getTail();
	let nextCells = {
		'up': {x: snake.head.x, y: snake.head.y+1},
		'down': {x: snake.head.x, y: snake.head.y-1},
		'left': {x: snake.head.x-1, y: snake.head.y},
		'right': {x: snake.head.x+1, y: snake.head.y},
	}


	// если змейка ест печеньку
	if (nextCells[currentDirection].x == cookieCell.x && nextCells[currentDirection].y == cookieCell.y) {
			snake.yum(cookieCell);
			snake.render();
			cookieCell = newCookieCell();
			get('snakeLength').innerHTML = snake.length();			
		}


	// если просто движется
	else {
		let nextCoords = [nextCells[currentDirection].x, nextCells[currentDirection].y].join(':');
		let bodyCoords = snake.asCoordArray();
		bodyCoords.pop();


		// проверка того, касается ли голова тела
		if (touchedSelf(nextCoords) == false && touchedWall(nextCoords) == false) {
			snake.update(snake.move(currentDirection));
			snake.dropTail(tail);
			snake.render();
		}

		// если касается:
		else {
			clearInterval(cycle);
			alert('game over');
		}
		
	}
	
}


// отрисовали змейку
snake.render();

// запуск основного цикла
let cycle = null;


function start() {
	currentDirection = 'down';
	cycle = setInterval(main, 100);
	get('start').removeEventListener('click', start);
}

function restart() {
	clearInterval(cycle);
	snake.clear();
	snake = new Snake(tail, body, head);
	snake.render();
	get('start').addEventListener('click', start);
}

get('start').addEventListener('click', start);
get('restart').addEventListener('click', restart);

get('snakeLength').innerHTML = snake.length();

}

document.addEventListener('DOMContentLoaded', theGame);