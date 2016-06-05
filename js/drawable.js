
function Drawable () {
	var error = function (text) {
		console.error( "Can't draw: " + this.name + ". Error is " + text.toUpperCase() );
	}
	
	this.name = "Drawable";
	var context = null;
	this.ready = false;
	
	this.init = function (givenContext) {
		if ( givenContext )
			context = givenContext;
		else error("Wrong context given")
	}
	this.prepare = function () {
		this.ready = true;
	}
	this.draw = function () {
		context.drawText("I am here", Math.random()*500, Math.random()*600)
	}
				
	this.drawObject = function () {
		if ( this.ready ) {
			if ( this.context ) {
				this.draw( context )
			} else {
				error("No context")
			}
		}
		
		error("Not ready")
		return false;
	}
	
	
}
