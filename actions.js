// таблица
var s;

j = 10;

while(j != 0) {

	i = 0;
	s = '<tr>';
	while(i < 10) {				
		s = s + '<td id="x' + (i+1) + 'y' + j + '"></td>';
		i += 1;
	}
	s = s + '</tr>';
	$('#table').append(s);
	j -= 1;
}


var randomNum = () => {return Math.floor(Math.random() * 10 + 1)};
var randomCoordinates = () => {return 'x' + randomNum() + 'y' + randomNum()};

function newCookieCell()  {
	let cookieCell = $('#' + randomCoordinates());
	cookieCell.addClass("cookie");
};



// змейка
let tail = new snakePart(1, 10, 'orange');
let body = [new snakePart(1, 9, 'orange'), ];
let head = new snakePart(1, 8, 'orange');
let snake = new Snake(tail, body, head);
let currentDirection = 'down';
var cookieCell = newCookieCell();

snake.render();

$(document).keydown(function(e) {

	var directions = {
		'37': snake.headLeft(),
		'38': snake.headUp(),
		'39': snake.headRight(),
		'40': snake.headDown(),
	}

	snake.update(directions[e.keyCode]);
	
});


$('#cookie').click(function() {
	newCookieCell();
});
