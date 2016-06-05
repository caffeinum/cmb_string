function CString (mass) {
	var mu = this.mu = mass || 1;
	var G = 1;
	var eps = function ( num ) { return (num > 0) ? +1 : -1; };
	var M = function (lam) {
		
		m_uvyz = Matrix.create(
		[
			[1,					0,			0,				0], // u
			[lam*lam/4,			1,			lam*eps(lam),	0], // v
			[lam*eps(lam)/2,	0,			1,				0], // y
			[0,					0,			0,				1]  // z
		]);
		
		m_txyz = Matrix.create(
		[
			[1 + lam*lam/4,		-lam*lam/4,			lam*eps(lam),	0], // t
			[lam*lam/4,			1 - lam*lam/4,		lam*eps(lam),	0], // x
			[lam*eps(lam)/2,	-lam*eps(lam)/2,	1,				0], // y
			[0,					0,					0,				1]  // z
		]);
		
		return m_txyz;
	};
	
	this.init = function () {
		
	}
	
	this.prepare = function () {
		
	}
	
	this.getMatrix = function (lam) {
		lam = lam || (8 * mu * Math.PI * G);
		return M(lam)
	}
}

CString.prototype = Object.create(Drawable.prototype);