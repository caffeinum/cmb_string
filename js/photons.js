function PhotonsContainer () {
	var phi = 0; var theta = 0;

	var temp = 1; // mean temperature
	var M = null;
	var cmb_string = null;
	
	this.draw = function (context) {
		context.drawText("Photons container here  " + this.photons[0], Math.random()*500, Math.random()*600)		
	}
	this.init = function (str) {
		// wouldn't be bad to set a string here
		cmb_string = str;
		
	}
	this.prepare = function (grid, w, h, scale, x, y) {
		// draw onto the grid
		// put into 'grid' transformation of the inner phi,theta array
		console.log( 'preparing grid for drawing, there is ' + w + 'x' + h + 'image' )
		if ( ! cmb_string )
			return console.error("Photons container is not initialized");
		
		M = cmb_string.getMatrix()
		// phi from -pi to pi, theta from -pi/2 to pi/2
		for ( x = -w; x <= w; x++ )
			for ( y = -h; y <= h; y++ )
				grid[x][y] = this.getTemp( x/w * Math.PI, y/h * Math.PI/2 )
			
	}
	
	this.getTemp = function (phi, theta) {
		// k_mu = hw q_mu, where q is 
		var q = Vector.create([1, Math.cos(phi)*Math.cos(theta), Math.sin(phi), 0])
		var w = temp;
		
		if ( Math.abs(phi) > Math.PI/2 )
			return q.x(w);
		
		if ( Math.random() > 0.9 ) console.log( M.elements );
		q = M.x(q);
		
		if ( Math.random() > 0.9 ) console.log( M.x(q) );
		
		return q.x(w);
	}
}

PhotonsContainer.prototype = Object.create(Drawable.prototype)
