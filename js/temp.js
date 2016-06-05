var Temp = {
	colorString: function (num) {
		var str = num.toString(16);
		if ( str.length < 6 )
			str = "000000".slice(str.length - 6) + str;
		
		return '#' + str; //((num / 0x10000) % 0x100).toString(16) + ((num / 0x100) % 0x100).toString(16) +  (num % 0x100).toString(16);
	},
	
	gauss: function (temp, intense) {
		var r = g = b = 0;
		var width = 2;
		
		r = Math.floor( 0xFF * intense * Math.exp( - ( 0 - temp )*( 0 - temp ) / width / intense ) );
		g = Math.floor( 0xFF * intense * Math.exp( - ( 1 - temp )*( 1 - temp ) / width / intense ) );
		b = Math.floor( 0xFF * intense * Math.exp( - ( 2 - temp )*( 2 - temp ) / width / intense ) );
		
		//var rgb = {r:r,g:g,b:b};
		return r * 0x10000 + g * 0x100 + b;
	},
	
	color: function (temp, intense) {
		return this.colorString( this.gauss(temp, intense) );	
	}
}