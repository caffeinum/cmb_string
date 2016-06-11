function CString (mass) {
	var mu = this.mu = mass || 1;
	var G = 1;
	var eps = function ( num ) { return (num > 0) ? +1 : -1; };
	var M = function (lam, e) {
		
		m_uvyz = Matrix.create(
		[
			[1,					0,			0,				0], // u
			[lam*lam/4,			1,			lam*eps(lam),	0], // v
			[lam*eps(lam)/2,	0,			1,				0], // y
			[0,					0,			0,				1]  // z
		]);
		
		m_txyz = Matrix.create(
		[
			[1 + lam*lam/4,		-lam*lam/4,			lam*e,			0], // t
			[lam*lam/4,			1 - lam*lam/4,		lam*e,			0], // x
			[lam*e/2,			-lam*e/2,			1,				0], // y
			[0,					0,					0,				1]  // z
		]);
		
		return m_txyz;
	};
	
	var A = function(lam, e) {
		return Matrix.create([
			[
				-lam*lam*(lam*lam + 2),
				+lam*lam*(lam*lam + 1),
				 2*e*lam*(lam*lam + 1),
			 						 0,
			]
		])
	}
	
	this.init = function () {
		
	}
	
	this.prepare = function () {
		
	}
	
	this.getMatrix = function (e, lam) {
		lam = lam || (8 * mu * Math.PI * G);
		e = (e>0) ? +1 : -1;
		return M(lam, e)
	}
	
	this.getA = function (e, lam) {
		lam = lam || (8 * mu * Math.PI * G);
		e = (e>0) ? +1 : -1;
		return A(lam, e)
	}
}

CString.prototype = Object.create(Drawable.prototype);