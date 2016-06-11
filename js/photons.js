function PhotonsContainer () {
	var phi = 0; var theta = 0;

	var temp = 1; // mean temperature
	var Mp = null;
	var Mm = null;
	var M = null;
	var a = null;
	var cmb_string = null;
	
	var q_out, q_in;
	var k_out, k_in;
	var omega;
	var I;
	var prec = 1000;
	
	var projection = function (x,y) {return "#ccffcc"};
	
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
		
		a = cmb_string.getA(-1);
		
		projection = Projections.mollweide( getTemp );
		prec = w
		
		// phi from -pi to 0, theta from -pi/2 to pi/2
		for ( x = -w; x <= 0; x++ )
			for ( y = -h; y <= h; y++ )
				grid[x][y] = projection(x/w,y/h)
					
		a = cmb_string.getA(+1);
	
		// phi from 0 to pi, theta from -pi/2 to pi/2
		for ( x = 0; x <= w; x++ )
			for ( y = -h; y <= h; y++ )
				grid[x][y] = projection(x/w,y/h)
			
	}
	
	var getTemp = function (phi, theta) {
		
		// k_mu = hw q_mu, where q is 
		q_out = Vector.create([
			1,
			Math.cos(theta) * Math.sin(phi),
			Math.cos(theta) * Math.cos(phi),
			Math.sin(theta)
		])
		omega = temp;
		
		if ( Math.abs(phi) > Math.PI/2 )
			return Temp.color( 1, 1 );
		
		omega = omega * M.e(1,1) / ( 1 - a.x(q_out).e(1))
		
		if ( Math.random() < 1/1000/prec )
			console.log( 'lam', (8 * cmb_string.mu * Math.PI * 1) ),
			console.log( 'q', q_out.elements ),
			console.log( 'a x q', a.x(q_out).elements ),
			console.log( '1 - aq', ( 1 - a.x(q_out).e(1) ) ),
			console.log( 'M_0_0', M.e(1,1) );

		I = 1
		//	M.det() * ( k_out.e(1)/k_in.e(1) ) * ( k_out.e(1)/k_in.e(1) ) *
		//	Math.sqrt( (k_out.e(1)*k_out.e(1) - k_out.e(4)*k_out.e(4)) / (k_in.e(1)*k_in.e(1) - k_in.e(4)*k_in.e(4) ) )
		
		
		return Temp.color( omega, I );
	}
/*
	// func ( phi, theta )
	var func = getTemp
	
	var identicalScaledProjection = function(x,y) {
		return func( x * Math.PI, y * Math.PI/2 )
	}
	
	var R = .5
	var sqrt2 = Math.sqrt(2)
	var Rsqrt2 = R * sqrt2
	var l = 0
	
	var mollweideProjection = function(x,y) {
		// https://en.wikipedia.org/api/rest_v1/media/math/render/svg/659885e4072f82558ef9e631bc77d7fd6aa3c4d6
		// https://en.wikipedia.org/api/rest_v1/media/math/render/svg/624eacf46ab0792746a62533e48fd746ee3fbdc4
		// https://en.wikipedia.org/api/rest_v1/media/math/render/svg/e3efc738f07f450616cf31fd4be0ad3bed1ec021
		
		// x-coordinate has a range of [−2R√2, 2R√2], and the y-coordinate has a range of [−R√2, R√2].
		
		if ( (x*x + 4*y*y) > 8*R*R )
			return Temp.color( 1, 1001 )
		
		theta = Math.asin( y / Rsqrt2 )
		phi = Math.asin( ( 2*theta + Math.sin(2*theta) ) / Math.PI)
		
		if ( Math.cos(theta) )
			l = Math.PI * x / ( 2*Rsqrt2 * Math.cos(theta) )
		else
			l = 0
		
		return func( l, phi )
	}*/
}

PhotonsContainer.prototype = Object.create(Drawable.prototype)
