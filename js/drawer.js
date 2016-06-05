function Drawer(width, height) {
	var objects = []
	var grid = []
	var step = 5
	var x = 0; var y = 0;
	var scale = 1;
	
	var w = width;
	var h = height;
	var temp = 0;
	for ( x = -width; x <= width; x++ ) {	
		grid[x] = []
		for ( y = -height; y <= height; y++ ){
			if ( x > - width && y > -height )
				temp =	grid[x-1][y-1].e(0) * Math.random()/4 + grid[x][y-1].e(0) * Math.random()/4 +
						grid[x-1][y].e(0) * Math.random()/4 + Math.random()/4
			
			grid[x][y] = Vector.create([2*temp,0,0,0])
		}
	}
	
	this.getPrecision = function () {
		return (scale)
	}
	
	this.setPrecision = function (scaleFactor) {
		if ( ! Number.isPrototypeOf(scaleFactor) )
			scaleFactor = new Number(scaleFactor)
		
		if ( scaleFactor <= 0 )
			scaleFactor = 1
			
		w = width / scaleFactor
		h = height / scaleFactor
		
		return (scale = scaleFactor)
	}
	
	this.add = function (object) {
		if ( object.prepare )
		objects.push( object );
	}
	
	this.calculate = function (callback) {	
		objects.forEach(function (elem) {
			console.log( 'Preparing ' + elem + ' for drawing')
			elem.prepare(grid, Math.floor(w/2), Math.floor(h/2));
		})
		
		callback();
	}
	
	this.draw = function () {
		objects.forEach(function (elem) {
			elem.drawObject();
		})
	}
	
	this.getPoint = function (x,y) {
		x = Math.round(x); y = Math.round(y)
		return Temp.color( grid[x][y].e(1), 1 );
	}
		
	this.getPoints = function () {
		return grid;
	}
}
