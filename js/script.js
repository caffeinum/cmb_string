$(document).ready(function () {
	// create map
	var cmb_map = new CMBMap();
	// draw grid and axis
	cmb_map.init();
	// create drawer
	var drawer = new Drawer( cmb_map.canvas.width, cmb_map.canvas.height );
	// make him draw
	
	var photons = new PhotonsContainer();
	var cstring = new CString(.01);
	
	photons.init(cstring);
	
	drawer.add( photons );
	drawer.add( cstring );
	
	cmb_map.setSource( drawer );
	drawer.setPrecision( 100 );
	
	var image = document.getElementById('cvsimg');
	var info = document.getElementById('info');
	var inform = function (text) {
		info.innerHTML = text
	}
	
	image.style.display = "none";
	$('#imgsave').click(function () {
		var dataURL = cmb_map.canvas.toDataURL();

		// set canvasImg image src to dataURL
		// so it can be saved as an image
		
		image.src = dataURL;
		image.style.display = "block";
	});
	
	function redraw() {
		inform("Computing...")
		drawer.calculate(function () {
			inform("Done:")
			cmb_map.draw();
		});
	}
	$('#redraw').click(redraw);
	$('#mass').val( cstring.mu )
	$('#mass').change(function () {
		var mass = parseFloat($('#mass').val())
		var cstring = new CString( mass )
		photons.init(cstring)
		inform("Set mass " + cstring.mu )
		
		if ( drawer.getPrecision( ) > 50 ) redraw();
	})
	
	
	$('#precision').val( drawer.getPrecision() )
	$('#precision').change(function () {
		var pr = parseInt( $('#precision').val() )
		inform("Set precision " + drawer.setPrecision( pr ) )
		
		if ( drawer.getPrecision( ) > 50 ) redraw();
	});
});