$(document).ready(function () {
	// initial parameters
	var step = 20;
	var energy = 1;
	var k = 0;
	var KS = [];
	var MKS = [];
	var MAKS = [];
	
	// create map
	var cmb_map = new CMBMap();
	// draw grid and axis
	cmb_map.init();
	// create drawer
	var drawer = new Drawer( cmb_map.canvas.width, cmb_map.canvas.height );
	// make him draw
	
	var photons = new PhotonsContainer();
	var cstring = new CString(.1);
	
	photons.init(cstring);
	
	drawer.add( photons );
	drawer.add( cstring );
	
	cmb_map.setSource( drawer );
	drawer.setPrecision( 100 );
	
	//drawer.calculate(function () {
	//	cmb_map.draw();
	//});	
	
	var image = document.getElementById('cvsimg');
	var info = document.getElementById('info');
	var inform = function (text) {
		info.innerHTML = text
	}
	
	image.style.display = "none";
	$('#imgsave').click(function () {
		var dataURL = canvas.toDataURL();

		// set canvasImg image src to dataURL
		// so it can be saved as an image
		
		image.src = dataURL;
		image.style.display = "block";
	});
	
	$('#redraw').click(function () {
		inform("Computing...")
		drawer.calculate(function () {
			inform("Done:")
			cmb_map.draw();
		});
	});
	$('#mass').val( cstring.mu )
	$('#setmass').click(function () {
		var mass = parseFloat($('#mass').val())
		var cstring = new CString( mass )
		photons.init(cstring)
		inform("Set mass " + cstring.mu )
	});
	
	
	$('#precision').val( drawer.getPrecision() )
	$('#setpr').click(function () {
		var pr = parseInt( $('#precision').val() )
		inform("Set precision " + drawer.setPrecision( pr ) )
	});
	
	canvas  = document.getElementById( "cvs" );
    if ( ! canvas ) return console.error("No canvas");
    cnt = canvas.getContext("2d");
    if ( ! cnt ) return console.error("No context");
	
	dist = function (x,y) {
		return Math.sqrt(x*x + y*y);
	};
	
	calc = function (x,y, lam) {
		theta	= ( y + 400 ) / 800 * Math.PI;
		phi		= ( x + 0 ) / 600 * Math.PI;
		
		k = Vector.create([
			energy,
			-energy * Math.sin(theta) * Math.sin(phi),
			-energy * Math.sin(theta) * Math.cos(phi),
			-energy * Math.cos(theta)
		]);
		
		KS[x][y] = k;
		k = M(lam).x(k);
		MKS[x][y] = k; // M * k
		
		// M * k -> thetaphi
		theta = Math.atan( dist(k.elements[1],k.elements[2]) / k.elements[3] );
		phi = Math.atan( k.elements[1]/k.elements[2] );
		if ( k.elements[3] < 0 )
			theta += Math.PI;
		if ( k.elements[2] < 0 )
			phi += Math.PI;
		
		MAKS[x][y] = [
			theta, phi		
		];
		
		if ( x % 100 == 0 && y % 100 == 0 )
			console.log( x,y,'thetaphi', theta, phi, 'k', k );
		
	};
	outer_temp = function (x,y) {
		
		return MKS[x][y].e(1);
		
		
		return dist(x,y) / 400;
	};
	temp = function (x,y) {
		if ( y > 350 )
			return x / 600 + 1;
		else
			return outer_temp(x,y);
	};
	intense = function (x,y) {
		
		return .9;
		var sq = ( MAKS[x+step][y][0] - MAKS[x-step][y][0] ) * ( MAKS[x][y+step][1] - MAKS[x][y-step][1] );
		console.log( 'xy', x,y);
		
		console.log('MAKS', MAKS[x+step][y][0], MAKS[x-step][y][0], MAKS[x][y+step][1], MAKS[x][y-step][1] );
		console.log('MKS', MKS[x+step][y].elements, MKS[x-step][y].elements, MKS[x][y+step].elements, MKS[x][y-step].elements );
		
		var sq_xy = sq / Math.PI * 600 / Math.PI * 800;
		console.log( 'sq_xy', Math.abs(sq_xy));
		return 1/Math.abs(sq_xy);//Math.min(100 / dist(x,y), 1);
	};
	
	redraw = function (lam) {

		for ( var x = -canvas.width/2-step; x <= canvas.width/2; x+=step ) {
			KS[x] = [];
			MKS[x] = [];
			MAKS[x] = [];
			for ( var y = -canvas.height/2; y < canvas.height/2; y+=step ) {
				KS[x][y] = [];
				MKS[x][y] = [];
				MAKS[x][y] = [];
				
				calc(x,y, lam);
			}
		}
		
		for ( var x = -canvas.width/2; x < canvas.width/2; x+=step ) {
			for ( var y = -canvas.height/2; y < canvas.height/2; y+=step ) {
				if ( x % 100 == 0 && y % 100 == 0 )
					console.log( x,y,'temp', temp(x,y),'int', intense(x,y), 'color', Temp.color ( temp(x,y), intense(x,y) ) );
				point(x,y, Temp.color( temp(x,y), intense(x,y) ));		
			}
		}
	};
	count = 0;
	lll = [.1, .5, 1, 2, 3];
	//redraw( 3 );
	setInterval(function () {
		//cnt.clearRect(0,0,1200,800);
		//redraw( lll[count++ % 5] );
	}, 2000);

});