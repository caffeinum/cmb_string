var Projections = {
	identical: function ( func ) {
		// where func is func(phi, theta)
		return function(x,y) {
			return func( x * Math.PI, y * Math.PI/2 )
		}
	},
	mollweide: function (func) {
		var R = .3
		var sqrt2 = Math.sqrt(2)
		var Rsqrt2 = R * sqrt2
		var l = 0
		var phi = 0
		var theta = 0
		
		return function(x,y) {
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
		}
	},
	mollweideInverse: function (func) {
		var R = .5
		var sqrt2 = Math.sqrt(2)
		var Rsqrt2 = R * sqrt2
		var l = 0
		var phi = 0
		var theta = 0
		
		return function(x,y) {
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
		}
	}
}