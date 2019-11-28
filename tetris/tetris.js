
document.addEventListener('DOMContentLoaded', theGame);


// вместо getElementByID
function get(e) {
	return document.getElementById(e);
}


/*class Tetrablock {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}*/

class Keyblock {
	constructor(x, y, type, facing) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.facing = facing;
	}
}


class Tetramino {
	constructor(keyblock, color){
		this.color = color;
		this.key = keyblock;
		this.facing = this.key.facing;
		this.type = this.key.type;
		this.keyX = this.key.x;
		this.keyY = this.key.y;		
		
		let keyParams = this.coords()[this.type][this.facing];
		this.t1 = {x: keyParams.t1.x, y: keyParams.t1.y};
		this.t2 = {x: keyParams.t2.x, y: keyParams.t2.y};
		this.t3 = {x: keyParams.t3.x, y: keyParams.t3.y};
	}

	asArray() {
		return [this.key].concat(this.t1).concat(this.t2).concat(this.t3);
	}

	render() {
		let color = this.color;
		let tetrArray = this.asArray();
		tetrArray.forEach(function(block, of, tetramino){
			let cell = get('x' + block.x + 'y' + block.y);
			cell.style.background = color;
		});
	}

	turn(direction, currentFacing) {
		this.facing = direction;
		
		let keyParams = this.coords()[this.type][this.facing];
		this.t1 = {x: keyParams.t1.x, y: keyParams.t1.y};
		this.t2 = {x: keyParams.t2.x, y: keyParams.t2.y};
		this.t3 = {x: keyParams.t3.x, y: keyParams.t3.y};
		this.render();
	}

	coords() {
		let tetrablockCoords = {
			'l': {
				'up': {
					't1': {x: this.key.x, y: this.key.y+2},
					't2': {x: this.key.x, y: this.key.y+1},
					't3': {x: this.key.x, y: this.key.y+2},
				},
				'left': {
					't1': {x: this.key.x-2, y: this.key.y},
					't2': {x: this.key.x-1, y: this.key.y},
					't3': {x: this.key.x+1, y: this.key.y},
				},
				'down': {
					't1': {x: this.key.x, y: this.key.y+1},
					't2': {x: this.key.x, y: this.key.y-1},
					't3': {x: this.key.x, y: this.key.y-2},
				},
				'right': {
					't1': {x: this.key.x+2, y: this.key.y},
					't2': {x: this.key.x+1, y: this.key.y},
					't3': {x: this.key.x-1, y: this.key.y},
				},
			}
		}
		return tetrablockCoords;
	}
}



function theGame() {

	// рисуем таблицу
	height = 20;
	
	while (height != 0) {

		let row = document.createElement('tr');
		width = 0;
		while (width < 10) {
			let cell = document.createElement('td');
			cell.setAttribute('id', 'x' + (width+1) + 'y' + height);
			row.append(cell);
			width++;
		}
		get('tetris_field').append(row);
		height--;
	}
}