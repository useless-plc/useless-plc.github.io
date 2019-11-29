
document.addEventListener('DOMContentLoaded', theGame);


// вместо getElementByID
function get(e) {
	return document.getElementById(e);
}


class Tetromino {
	constructor(x, y, type, facing, color){
		this.x = x;
		this.y = y;
		this.type = type;
		this.facing = facing;
		this.color = color;
		/*let keyParams = this.coords()[this.type][this.facing];
		this.t1 = {x: keyParams.t1.x, y: keyParams.t1.y};
		this.t2 = {x: keyParams.t2.x, y: keyParams.t2.y};
		this.t3 = {x: keyParams.t3.x, y: keyParams.t3.y};*/
	}

	asArray() {
		return [{x: this.x, y: this.y}].concat(this.t1).concat(this.t2).concat(this.t3);
	}

	clear() {
		this.asArray().forEach(function(block, of, tetromino){
			let cell = get('x' + block.x + 'y' + block.y);
			cell.style.background = 'white';
		});
	}

	build() {
		let keyParams = this.coords()[this.type][this.facing];
		this.t1 = {x: keyParams.t1.x, y: keyParams.t1.y};
		this.t2 = {x: keyParams.t2.x, y: keyParams.t2.y};
		this.t3 = {x: keyParams.t3.x, y: keyParams.t3.y};
	}

	render() {
		let color = this.color;
		let tetrArray = this.asArray();
		tetrArray.forEach(function(block, of, tetromino){
			let cell = get('x' + block.x + 'y' + block.y);
			cell.style.background = color;
		});
	}

	rotate(currentFacing, direction) {
		this.facing = this.facings()[currentFacing][direction];
		this.clear();
		this.build();
		
		this.render();
	}

	moveLeft() {
		this.clear();
		this.x -= 1;		
		this.build();
		this.render();
	}

	moveRight() {
		this.clear();
		this.x += 1;
		this.build();
		this.render();
	}

	coords() {
		let tetrablockCoords = {
			'l': {
				'up': {
					't1': {x: this.x, y: this.y+2},
					't2': {x: this.x, y: this.y+1},
					't3': {x: this.x, y: this.y-1},
				},
				'left': {
					't1': {x: this.x-2, y: this.y},
					't2': {x: this.x-1, y: this.y},
					't3': {x: this.x+1, y: this.y},
				},
				'down': {
					't1': {x: this.x, y: this.y+1},
					't2': {x: this.x, y: this.y-1},
					't3': {x: this.x, y: this.y-2},
				},
				'right': {
					't1': {x: this.x+2, y: this.y},
					't2': {x: this.x+1, y: this.y},
					't3': {x: this.x-1, y: this.y},
				},
			},
			'o': {
				'up': {
					't1': {x: this.x, y: this.y+1},
					't2': {x: this.x+1, y: this.y+1},
					't3': {x: this.x+1, y: this.y},
				},
				'left': {
					't1': {x: this.x, y: this.y+1},
					't2': {x: this.x+1, y: this.y+1},
					't3': {x: this.x+1, y: this.y},
				},
				'down': {
					't1': {x: this.x, y: this.y+1},
					't2': {x: this.x+1, y: this.y+1},
					't3': {x: this.x+1, y: this.y},
				},
				'right': {
					't1': {x: this.x, y: this.y+1},
					't2': {x: this.x+1, y: this.y+1},
					't3': {x: this.x+1, y: this.y},
				},
			},
			's': {
				'up': {
					't1': {x: this.x-1, y: this.y+1},
					't2': {x: this.x-1, y: this.y},
					't3': {x: this.x, y: this.y-1},
				},
				'left': {
					't1': {x: this.x-1, y: this.y-1},
					't2': {x: this.x, y: this.y-1},
					't3': {x: this.x+1, y: this.y},
				},
				'down': {
					't1': {x: this.x+1, y: this.y-1},
					't2': {x: this.x+1, y: this.y},
					't3': {x: this.x, y: this.y+1},
				},
				'right': {
					't1': {x: this.x, y: this.y+1},
					't2': {x: this.x+1, y: this.y+1},
					't3': {x: this.x-1, y: this.y},
				},
			},
			'z': {
				'up': {
					't1': {x: this.x+1, y: this.y+1},
					't2': {x: this.x+1, y: this.y},
					't3': {x: this.x, y: this.y-1},
				},
				'left': {
					't1': {x: this.x-1, y: this.y+1},
					't2': {x: this.x, y: this.y+1},
					't3': {x: this.x+1, y: this.y},
				},
				'down': {
					't1': {x: this.x-1, y: this.y-1},
					't2': {x: this.x-1, y: this.y},
					't3': {x: this.x, y: this.y+1},
				},
				'right': {
					't1': {x: this.x+1, y: this.y-1},
					't2': {x: this.x, y: this.y-1},
					't3': {x: this.x-1, y: this.y},
				},
			},
			'L': {
				'up': {
					't1': {x: this.x, y: this.y+2},
					't2': {x: this.x, y: this.y+1},
					't3': {x: this.x+1, y: this.y},
				},
				'left': {
					't1': {x: this.x-2, y: this.y},
					't2': {x: this.x-1, y: this.y},
					't3': {x: this.x, y: this.y+1},
				},
				'down': {
					't1': {x: this.x, y: this.y-2},
					't2': {x: this.x, y: this.y-1},
					't3': {x: this.x-1, y: this.y},
				},
				'right': {
					't1': {x: this.x+2, y: this.y},
					't2': {x: this.x+1, y: this.y},
					't3': {x: this.x, y: this.y-1},
				},
			},
			'J': {
				'up': {
					't1': {x: this.x, y: this.y+2},
					't2': {x: this.x, y: this.y+1},
					't3': {x: this.x-1, y: this.y},
				},
				'left': {
					't1': {x: this.x-2, y: this.y},
					't2': {x: this.x-1, y: this.y},
					't3': {x: this.x, y: this.y-1},
				},
				'down': {
					't1': {x: this.x, y: this.y-2},
					't2': {x: this.x, y: this.y-1},
					't3': {x: this.x+1, y: this.y},
				},
				'right': {
					't1': {x: this.x+2, y: this.y},
					't2': {x: this.x+1, y: this.y},
					't3': {x: this.x, y: this.y+1},
				},
			},
			'T': {
				'up': {
					't1': {x: this.x-1, y: this.y},
					't2': {x: this.x, y: this.y+1},
					't3': {x: this.x+1, y: this.y},
				},
				'left': {
					't1': {x: this.x, y: this.y-1},
					't2': {x: this.x-1, y: this.y},
					't3': {x: this.x, y: this.y+1},
				},
				'down': {
					't1': {x: this.x+1, y: this.y},
					't2': {x: this.x, y: this.y-1},
					't3': {x: this.x-1, y: this.y},
				},
				'right': {
					't1': {x: this.x, y: this.y+1},
					't2': {x: this.x+1, y: this.y},
					't3': {x: this.x, y: this.y-1},
				},
			},

		}
		return tetrablockCoords;
	}

	facings() {
		let facings = {
			'up': {'left': 'left', 'right': 'right'},
			'left': {'left': 'down', 'right': 'up'},
			'down': {'left': 'right', 'right': 'left'},
			'right': {'left': 'up', 'right': 'down'},
		}

		return facings;
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



	let tetromino = new Tetromino(4, 4, 'T', 'right', 'black');
	tetromino.build();
	tetromino.render();

	
	document.addEventListener('keydown', function(e){
		let buttons = {
			'37': {direction: 'left', restricted: 'right'},
			'39': {direction: 'right', restricted: 'left'},
		}

			if (e.keyCode == '40') {
				tetromino.moveLeft();
			}
			if (e.keyCode == '38') {
				tetromino.moveRight();
			}
		
		let newFacing = buttons[e.keyCode].direction;

		if (newFacing != undefined && tetromino.facing != newFacing.restricted && tetromino.facing != newFacing.direction) {
			
			tetromino.rotate(tetromino.facing, newFacing);
		}
	});

}
