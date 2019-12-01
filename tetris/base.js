

function coords(t) {
		let tetrablockCoords = {
			'l': {
				'up': {
					't1': {x: t.x, y: t.y+2},
					't2': {x: t.x, y: t.y+1},
					't3': {x: t.x, y: t.y-1},
				},
				'left': {
					't1': {x: t.x-2, y: t.y},
					't2': {x: t.x-1, y: t.y},
					't3': {x: t.x+1, y: t.y},
				},
				'down': {
					't1': {x: t.x, y: t.y+2},
					't2': {x: t.x, y: t.y+1},
					't3': {x: t.x, y: t.y-1},
				},
				'right': {
					't1': {x: t.x-2, y: t.y},
					't2': {x: t.x-1, y: t.y},
					't3': {x: t.x+1, y: t.y},
				},
			},
			'o': {
				'up': {
					't1': {x: t.x+1, y: t.y},
					't2': {x: t.x, y: t.y-1},
					't3': {x: t.x+1, y: t.y-1},
				},
				'left': {
					't1': {x: t.x+1, y: t.y},
					't2': {x: t.x, y: t.y-1},
					't3': {x: t.x+1, y: t.y-1},
				},
				'down': {
					't1': {x: t.x+1, y: t.y},
					't2': {x: t.x, y: t.y-1},
					't3': {x: t.x+1, y: t.y-1},
				},
				'right': {
					't1': {x: t.x+1, y: t.y},
					't2': {x: t.x, y: t.y-1},
					't3': {x: t.x+1, y: t.y-1},
				},
			},
			's': {
				'up': {
					't1': {x: t.x-1, y: t.y+1},
					't2': {x: t.x-1, y: t.y},
					't3': {x: t.x, y: t.y-1},
				},
				'left': {
					't1': {x: t.x-1, y: t.y-1},
					't2': {x: t.x, y: t.y-1},
					't3': {x: t.x+1, y: t.y},
				},
				'down': {
					't1': {x: t.x-1, y: t.y+1},
					't2': {x: t.x-1, y: t.y},
					't3': {x: t.x, y: t.y-1},
				},
				'right': {
					't1': {x: t.x-1, y: t.y-1},
					't2': {x: t.x, y: t.y-1},
					't3': {x: t.x+1, y: t.y},
				},
			},
			'z': {
				'up': {
					't1': {x: t.x+1, y: t.y+1},
					't2': {x: t.x+1, y: t.y},
					't3': {x: t.x, y: t.y-1},
				},
				'left': {
					't1': {x: t.x+1, y: t.y-1},
					't2': {x: t.x, y: t.y-1},
					't3': {x: t.x-1, y: t.y},
				},
				'down': {
					't1': {x: t.x+1, y: t.y+1},
					't2': {x: t.x+1, y: t.y},
					't3': {x: t.x, y: t.y-1},
				},
				'right': {
					't1': {x: t.x+1, y: t.y-1},
					't2': {x: t.x, y: t.y-1},
					't3': {x: t.x-1, y: t.y},
				},
			},			
			'L': {
				'up': {
					't1': {x: t.x, y: t.y-2},
					't2': {x: t.x, y: t.y-1},
					't3': {x: t.x-1, y: t.y},
				},
				'left': {
					't1': {x: t.x+2, y: t.y},
					't2': {x: t.x+1, y: t.y},
					't3': {x: t.x, y: t.y-1},
				},
				'down': {
					
					't1': {x: t.x, y: t.y+2},
					't2': {x: t.x, y: t.y+1},
					't3': {x: t.x+1, y: t.y},
				},
				'right': {
					
					't1': {x: t.x-2, y: t.y},
					't2': {x: t.x-1, y: t.y},
					't3': {x: t.x, y: t.y+1},
				},
			},
			'J': {
				'up': {
					't1': {x: t.x, y: t.y+2},
					't2': {x: t.x, y: t.y+1},
					't3': {x: t.x-1, y: t.y},
				},
				'left': {
					't1': {x: t.x-2, y: t.y},
					't2': {x: t.x-1, y: t.y},
					't3': {x: t.x, y: t.y-1},
				},
				'down': {
					't1': {x: t.x, y: t.y-2},
					't2': {x: t.x, y: t.y-1},
					't3': {x: t.x+1, y: t.y},
				},
				'right': {
					't1': {x: t.x+2, y: t.y},
					't2': {x: t.x+1, y: t.y},
					't3': {x: t.x, y: t.y+1},
				},
			},
			'T': {
				'up': {
					't1': {x: t.x, y: t.y+1},
					't2': {x: t.x+1, y: t.y},
					't3': {x: t.x, y: t.y-1},
				},
				'left': {
					't1': {x: t.x+1, y: t.y},
					't2': {x: t.x, y: t.y-1},
					't3': {x: t.x-1, y: t.y},
				},
				'down': {					
					't1': {x: t.x, y: t.y-1},
					't2': {x: t.x-1, y: t.y},
					't3': {x: t.x, y: t.y+1},
				},
				'right': {					
					't1': {x: t.x-1, y: t.y},
					't2': {x: t.x, y: t.y+1},
					't3': {x: t.x+1, y: t.y},
				},
			},

		}
		return tetrablockCoords;
	}

const facings = {
	'up': {'left': 'left', 'right': 'right'},
	'left': {'left': 'down', 'right': 'up'},
	'down': {'left': 'right', 'right': 'left'},
	'right': {'left': 'up', 'right': 'down'},
}

function drawTable() {
	// рисуем таблицу
	height = 20;
	
	while (height != 0) {

		let row = document.createElement('tr');
		row.setAttribute('id', 'tetris_row_' + height);
		width = 0;
		while (width < 10) {
			let cell = document.createElement('td');
			cell.setAttribute('id', 'x' + (width+1) + 'y' + height);
			cell.classList.add('free');
			row.append(cell);
			width++;
		}
		get('tetris_field').append(row);
		height--;
	}
}

// вместо getElementByID
function get(e) {
	return document.getElementById(e);
}