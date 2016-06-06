function PhotonsContainer () {
	var phi = 0; var theta = 0;

	var temp = 1; // mean temperature
	var Mp = null;
	var Mm = null;
	var M = null;
	var cmb_string = null;
	
	var q_out, q_in;
	var k_out, k_in;
	var w;
	var I;
	
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
		
		Mp = cmb_string.getMatrix(+1)
		Mm = cmb_string.getMatrix(-1)
		
		M = Mm.inv().x( Mp )
		// phi from -pi to pi, theta from -pi/2 to pi/2
		for ( x = -w; x <= w; x++ )
			for ( y = -h; y <= h; y++ )
				grid[x][y] = this.getTemp( x/w * Math.PI, y/h * Math.PI/2 )
			
	}
	
	this.getTemp = function (phi, theta) {
		// k_mu = hw q_mu, where q is 
		q_out = Vector.create([
			1,
			Math.cos(theta) * Math.sin(phi),
			Math.cos(theta) * Math.cos(phi),
			Math.sin(theta)
		])
		w = temp;
		// f( phi, theta ) * d(w-T) * d(k-T) = f(w,k,ph,th) - probability density
		// where T is mean temperature. we think that all quanta have the same energy
		//
		// so this f transforms as dw = f * d^4k,
		// f( phi, theta )
		if ( Math.abs(phi) > Math.PI/2 )
			return Temp.color( q_out.x(w).e(1), 1 );
		
		k_out = q_out.x(w);
		
		k_in = M.x(k_out);
		
		
		// (w'/w)^2 |M| ./[ (w'2 - k'z2) / (w2 - kz2)  ]
		I = M.det() * ( k_out.e(1)/k_in.e(1) ) * ( k_out.e(1)/k_in.e(1) ) *
			Math.sqrt( (k_out.e(1)*k_out.e(1) - k_out.e(4)*k_out.e(4)) / (k_in.e(1)*k_in.e(1) - k_in.e(4)*k_in.e(4) ) )
		
		if ( Math.random() > 0.95 ) console.log( k_in.elements );
		if ( Math.random() > 0.95 ) console.log( I );
		
		return Temp.color( k_in.e(1), I );
	}
}

PhotonsContainer.prototype = Object.create(Drawable.prototype)
