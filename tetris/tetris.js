document.addEventListener('DOMContentLoaded', drawTable);
document.addEventListener('DOMContentLoaded', theGame);




class Tetromino {
	constructor(x, y, type, facing, color){
		this.x = x;
		this.y = y;
		this.type = type;
		this.facing = facing;
		this.color = color;
	}

	asArray() {
		return [{x: this.x, y: this.y}].concat(this.t1).concat(this.t2).concat(this.t3);
	}

	clear() {
		this.asArray().forEach(function(block, of, tetromino){
			let cell = get('x' + block.x + 'y' + block.y);
			if (cell != undefined) {
				cell.classList.remove('tetrapiece');
				cell.classList.add('free');
			}
		});
	}

	build() {
		let keyParams = coords(this)[this.type][this.facing];
		this.t1 = {x: keyParams.t1.x, y: keyParams.t1.y};
		this.t2 = {x: keyParams.t2.x, y: keyParams.t2.y};
		this.t3 = {x: keyParams.t3.x, y: keyParams.t3.y};
	}

	render() {
		let color = this.color;
		let tetrArray = this.asArray();
		tetrArray.forEach(function(block, of, tetromino){
			let cell = get('x' + block.x + 'y' + block.y);
			if (cell != undefined) {
				cell.classList.add('tetrapiece');
			}			
		});
	}


	rotate(currentFacing, direction) {
		this.facing = facings[currentFacing][direction];
		this.clear();
		this.build();
		
		this.render();
	}

	move(direction) {
		this.clear();

		let changeX = {
			'left': -1,
			'right': 1,
		}

		this.x += changeX[direction];		
		this.build();
		this.render();
	}


	down() {

		this.clear();
		this.y -= 1;
		this.build();
		this.render();

	}
	

	dummy(facing) {
		let key = {x: this.x, y: this.y};
		let keyParams = coords(key)[this.type][facing];
		let t1 = {x: keyParams.t1.x, y: keyParams.t1.y};
		let t2 = {x: keyParams.t2.x, y: keyParams.t2.y};
		let t3 = {x: keyParams.t3.x, y: keyParams.t3.y};
		return {key: key, t1: t1, t2: t2, t3: t3}
	}

	vDummy() {
		let key = {x: this.x, y: this.y-1};
		let keyParams = coords(key)[this.type][this.facing];
		let t1 = {x: keyParams.t1.x, y: keyParams.t1.y};
		let t2 = {x: keyParams.t2.x, y: keyParams.t2.y};
		let t3 = {x: keyParams.t3.x, y: keyParams.t3.y};
		return {key: key, t1: t1, t2: t2, t3: t3}
	}

	hDummy(d) {
		let newX;
		if (d == 'left') {
			newX = this.x - 1;
		}
		else if (d == 'right') {
			newX = this.x + 1;
		}
		let key = {x: newX, y: this.y};
		let keyParams = coords(key)[this.type][this.facing];
		let t1 = {x: keyParams.t1.x, y: keyParams.t1.y};
		let t2 = {x: keyParams.t2.x, y: keyParams.t2.y};
		let t3 = {x: keyParams.t3.x, y: keyParams.t3.y};
		return {key: key, t1: t1, t2: t2, t3: t3}
	}

	lowest() {
		let lowest = [this.t1, this.t2, this.t3].reduce(function(i, j){
			if (i > j) {
				return i;
			}
			else return j;
		}, 0);
		return lowest;
	}

	stick() {
		let tetrArray = this.asArray();
		tetrArray.forEach(function(block, of, tetromino) {
			get('x' + block.x + 'y' + block.y).classList.remove('free', 'tetrapiece');
			get('x' + block.x + 'y' + block.y).classList.add('blocked');
		});
		this.x = 5;
		this.y = 20;
		this.type = types[randomNum()];
		//this.build();
		//this.render();
	}

}

function dummyCrashes(dummy) {
		let ifCrashes = (b) => (b.x <= 0 || b.x > 10 || b.y < 1 );
		let crashes = [dummy.key, dummy.t1, dummy.t2, dummy.t3].some(ifCrashes);
		return crashes;
	}


function touchesWall(obj, wall) {
		let wallCheck = {
			'left': (obj.t1.x == 1 || obj.t2.x == 1 || obj.t3.x == 1),
			'right': (obj.t1.x == 10 || obj.t2.x == 10 || obj.t3.x == 10),
		}

		return wallCheck[wall];
	}

function blocked(dummy) {
	function thereIsABlock(b) {
		let cell = get('x' + b.x + 'y' + b.y);
		if (cell != undefined) {
			return (cell.classList.contains('blocked'));
		}
		else return false;
	}
	return [dummy.key, dummy.t1, dummy.t2, dummy.t3].some(thereIsABlock);
}

function reCell(cell) {
	let x = Number(cell.id.split('y')[0].replace('x', ''));
	let y = Number(cell.id.split('y')[1]) + 1;

	if (y < 20) {
		let topCell = get('x' + x + 'y' + y);
		cell.classList = topCell.classList;
	}
	
}

function reRow(row) {
	let cells = row.childNodes;
	for(let cell of cells) {
		reCell(cell);
	}
}


let types = ['l', 'L', 'J', 'o', 's', 'T', 'z'];
//let 

let randomNum = () => {return Math.floor(Math.random() * types.length )};

let tetromino = new Tetromino(5, 20, types[randomNum()], 'left', 'black');
let buttons = {
			'188': {direction: 'left', restricted: 'right'},
			'190': {direction: 'right', restricted: 'left'},
		}

function rowIsFilled(row) {
	//let row = get('tetris_row_' + rowNum);
	let cells = row.childNodes;
	for(let cell of cells) {
		if (!(cell.classList.contains('blocked'))) {
			return false;
		}
	}
	return true;
}

function clearRow(row) {
	let cells = row.childNodes;
	for(let cell of cells) {
		cell.classList.remove('blocked');
		cell.classList.add('free');
	}
}

tetromino.build();
tetromino.render();



function theGame() {
	let rows = Array.from(get('tetris_field').childNodes).reverse();

	function fall() {
		let vDummy = tetromino.vDummy();
		if ((tetromino.t1.y == 1 || tetromino.t2.y == 1 || tetromino.t3.y == 1) || blocked(vDummy)) {
			tetromino.stick();

			rows.forEach(function(row, of ,table) {


				while (rowIsFilled(row)) {
					clearRow(row);
					reRow(row);
					let n = Number(row.id.split('_')[2]);
					rows.forEach(function(r, o ,t ){
						let m = Number(r.id.split('_')[2]);
						if(m>n && m<20) {
							reRow(r);
						}
					});	

				}
			});

			tetromino.build();
			tetromino.render();
			
		}
		else {
			tetromino.down();
		}
		
			

		
	}



	let cycle = setInterval(fall, 1000);
	
	

	document.addEventListener('keydown', function(e){
		if (e.keyCode == '40') {
			let vDummy = tetromino.vDummy();
			if ((tetromino.t1.y == 1 || tetromino.t2.y == 1 || tetromino.t3.y == 1) || blocked(vDummy)) {
				/*rows.forEach(function(row, of ,table) {
				if(rowIsFilled(row)) {
					clearRow(row);
					let n = Number(row.id.split('_')[2]);
					rows.forEach(function(r, o ,t ){
						let m = Number(r.id.split('_')[2]);
						if(m>=n && m<20) {
							reRow(r);
						}
					});
				}
			});*/

			rows.forEach(function(row, of ,table) {


				while (rowIsFilled(row)) {
					clearRow(row);
					reRow(row);
					let n = Number(row.id.split('_')[2]);
					rows.forEach(function(r, o ,t ){
						let m = Number(r.id.split('_')[2]);
						if(m>n && m<20) {
							reRow(r);
						}
					});	

				}
			});

			tetromino.build();
			tetromino.render();
			
		}
		else {
			tetromino.down();
		}					
		}
	});
	
	document.addEventListener('keydown', function(e) {
		

		if (e.keyCode == '37') {
			let dummy = tetromino.hDummy('left');
			if (!(touchesWall(tetromino, 'left')) && !(blocked(dummy))) {
				tetromino.move('left');
			}
			
		}
		if (e.keyCode == '39') {
			let dummy = tetromino.hDummy('right');
			if (!(touchesWall(tetromino, 'right')) && !(blocked(dummy))) {
				tetromino.move('right');
			}
			
		}
		
		
		let newFacing = buttons[e.keyCode].direction;

		if (newFacing != undefined && 
			tetromino.facing != newFacing.restricted && 
			tetromino.facing != newFacing.direction) {

			let dummy = tetromino.dummy(facings[tetromino.facing][newFacing]);
			
			if (!(dummyCrashes(dummy)) && !(blocked(dummy))) {
				tetromino.rotate(tetromino.facing, newFacing);
			}
			
		}
	});


	let stickButton = get('stick');
		stickButton.addEventListener('click', function(){
			clearInterval(cycle);
		});

}



