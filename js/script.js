$(document).ready(function () {
	// create map
	var cmb_map = new CMBMap();
	// draw grid and axis
	cmb_map.init();
	// create drawer
	var drawer = new Drawer( cmb_map.canvas.width, cmb_map.canvas.height );
	// make him draw
	window.drawer = drawer
	
	var photons = new PhotonsContainer();
	var cstring = new CString( Math.exp(-1) );
	
	photons.init(cstring);
	
	drawer.add( photons );
	drawer.add( cstring );
	
	cmb_map.setSource( drawer );
	drawer.setPrecision( 100 );
	
	var image = document.getElementById('cvsimg');
	var info = document.getElementById('info');
	var inform = function (text) {
		info.innerHTML = text + '<br>' + info.innerHTML
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
		image.style.display = "none";
		inform("Computing...")
		drawer.calculate(function () {
			inform("Done:")
			cmb_map.draw();
		});
	}
	$('#redraw').click(redraw);
	$('#mass').val( Math.log(cstring.mu) )
	$('#mass').change(function () {
		var mass = parseFloat($('#mass').val())
		var cstring = new CString( Math.exp(mass) )
		photons.init(cstring)
		inform("Set mass " + Math.exp(mass) )
		
		if ( drawer.getPrecision( ) > 5 ) redraw();
		else {
			inform( drawer.getPrecision( ) + " is very big, set 10")
			drawer.setPrecision(5)
			$('#precision').val( drawer.getPrecision() )
			redraw();
		}
	})
	
	var inter;
	var i;
	var values = {from:-5,to:2};
	$('#animate').click(function () {
		i = 0
		var range = (values.from - values.to);
		if ( ! ( range > 0 ) ) range = 7
		var cstring, mass;
		inter = setInterval(function () {
			i++;
			mass = i % range + values.from
			cstring = new CString( Math.exp( mass ) )
			photons.init(cstring)
			inform("Set mass " + Math.exp(mass) )
			if ( drawer.getPrecision( ) > 5 ) redraw();
			else {
				inform( drawer.getPrecision( ) + " is very big, set 10")
				drawer.setPrecision(5)
				$('#precision').val( drawer.getPrecision() )
				redraw();
			}
		}, 1000)
	});
	
	$('#stop').click(function () {
		clearInterval(inter);
	});
	
	
	
	$('#precision').val( drawer.getPrecision() )
	$('#precision').change(function () {
		var pr = parseInt( $('#precision').val() )
		inform("Set precision " + drawer.setPrecision( pr ) )
		
		if ( drawer.getPrecision( ) > 5 ) redraw();
		else inform(pr + " is very big, redraw manually")
	});
});