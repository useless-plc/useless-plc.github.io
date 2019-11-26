// таблица
var s;

j = 20;

while(j != 0) {

	i = 0;
	s = '<tr>';
	while(i < 20) {				
		s = s + '<td id="x' + (i+1) + 'y' + j + '"></td>';
		i += 1;
	}
	s = s + '</tr>';
	$('#table').append(s);
	j -= 1;
}


let randomNum = () => {return Math.floor(Math.random() * 20 + 1)};


// случайная ячейка для печеньки
function newCookieCell()  {
	let cellX = randomNum();
	let cellY = randomNum();
	let snakeArray = snake.asArray();


	// чтобы печенька не появлялась на теле змейки
	let snakeCoords = [];
	for(i in snake.asArray()) {
		snakeCoords.push([snakeArray[i].x, snakeArray[i].y].join(','));
	};


	while (snakeCoords.find(item => item == [cellX, cellY].join(',')) != undefined) {
		cellX = randomNum();
		cellY = randomNum();
	}

	console.log([cellX, cellY].join(','), snakeCoords);

	let cookieCell = $('#x' + cellX + 'y' + cellY);
	cookieCell.css('background', 'gold');
	return {x: cellX, y: cellY}
};



// змейка
let tail = new snakePart(1, 10, 'orange');
let body = [new snakePart(1, 9, 'orange'), ];
let head = new snakePart(1, 8, 'orange');
let snake = new Snake(tail, body, head);
let currentDirection = 'down';
let cookieCell = newCookieCell();
let nextCell;

snake.render();

$(document).keydown(function(e) {

	let nextCells = {
		'up': {x: snake.head.x, y: snake.head.y+1},
		'down': {x: snake.head.x, y: snake.head.y-1},
		'left': {x: snake.head.x-1, y: snake.head.y},
		'right': {x: snake.head.x+1, y: snake.head.y},
	}

	var directions = {
		'37': {action: snake.headLeft(), direction: 'left'},
		'38': {action: snake.headUp(), direction: 'up'},
		'39': {action: snake.headRight(), direction: 'right'},
		'40': {action: snake.headDown(), direction: 'down'},
	}

	

	
	if ( !(directions[e.keyCode] == undefined) ) {
		currentDirection = directions[e.keyCode].direction;
		$('#direction').html(directions[e.keyCode].direction);

		if (nextCells[currentDirection].x == cookieCell.x && nextCells[currentDirection].y == cookieCell.y) {
			snake.yum(cookieCell);
			cookieCell = newCookieCell();
			$('#cookieCell').text('x:' + cookieCell.x + ', y:' + cookieCell.y);
			$('#snakeLength').text(snake.length());
			
		}

		else {
			snake.update(directions[e.keyCode].action);

		}

		$('#x' + cookieCell.x + 'y' + cookieCell.y).css('background', 'gold');

		

		$('#snake').html(JSON.stringify(snake));
	}
	
});


$('#cookieCell').text('x:' + cookieCell.x + ', y:' + cookieCell.y);

$('#snakeLength').text(snake.length());



/*$('#cookie').click(function() {
	newCookieCell();
});

$('#direction').html(currentDirection);


$('#snake').html(JSON.stringify(snake));*/