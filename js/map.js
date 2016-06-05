function CMBMap ( canvasId ) {
    var canvas = document.getElementById( canvasId || "cvs" );
    if ( ! canvas ) return;
    var cnt = canvas.getContext("2d");
    if ( ! cnt ) return;
	
	var labels = document.getElementById( "labels" );
    if ( ! labels ) return;
    var lab_cnt = labels.getContext("2d");
    if ( ! lab_cnt ) return;
	
	
	var w = canvas.width;
	var h = canvas.height;
	
	var center = {
		x: Math.round(w/2),
		y: Math.round(h/2)
	}
	
    this.canvas = canvas;
	this.drawer = null;
	
	this.init = function () {
		// init	
		this.drawLabels();
		this.drawAxis();
		this.drawGrid();
		this.drawFrame();
	}
	
	this.setSource = function( drawer ) { 
		this.drawer = drawer
	}
	
	this.clear = function () {
        cnt.clearRect(0, 0, canvas.width, canvas.height);
    };
	
	this.drawLabels = function () {
		var pd = 30
		this.drawText("x", w - pd,		center.y)
		this.drawText("y", center.x,	pd)
		
	};
	
	this.drawAxis = function () {
		this.drawLine("vertical",	center.x, "black", 1.0);
		this.drawLine("horizontal",	center.y, "black", 1.0);
	};
	
	this.drawGrid = function () {
		var step = 50;
		
		for ( var i = 0; i < w; i+=step )
			this.drawLine("vertical", i, "grey", 0.1);
		
		for ( var j = 0; j < h; j+=step )
			this.drawLine("horizontal", j, "grey", 0.1);
	};
	
	this.drawFrame = function () {
		cnt.strokeStyle = "#000000";
        
        cnt.beginPath();
        cnt.moveTo(0, 0);
        cnt.lineTo(0, h);
        cnt.lineTo(w, h);
        cnt.lineTo(w, 0);
        cnt.lineTo(0, 0);
        cnt.stroke();
	}
	
	var drawPoint = function (x,y,step,color) {
        cnt.fillStyle = color;
        cnt.fillRect(center.x + x*step - step/2, center.y - y*step - step/2, step, step);
    };
	
	this.draw = function (notDrawElements) {
		this.clear();
		
		var p = this.drawer.getPrecision() || 1;
		var point, color;
		
		for ( var x = -w/2/p; x <= w/2/p; x++ ) {
			for ( var y = -h/2/p; y <= h/2/p; y++ ) {
				color = this.drawer.getPoint(x,y)
				
				if (Math.random() > 0.99) console.log( color )
				drawPoint(x,y,p,color)
			}		
		}
		
		if (!notDrawElements) {
			this.drawLabels();
			this.drawAxis();
			this.drawGrid();
			this.drawFrame();
		} else {
        	lab_cnt.clearRect(0, 0, canvas.width, canvas.height);
		}
	}
	
	
	
	
    this.fillRect = function (x,y,w,h) {
        cnt.fillStyle = "#000000";
        cnt.fillRect(x,y,w,h);
    };
    
    this.drawCircle = function (centerX, centerY, radius, color) {
        cnt.fillStyle = color;
        cnt.beginPath();
        cnt.arc( centerX, centerY, radius, 0, 2*Math.PI );
        cnt.fill();
    };
    
    this.drawImage = function (img, cx,cy,cw,ch, x,y,w,h) {
        cnt.drawImage(img,cx,cy,cw,ch,x,y,w,h);
    };
    
    this.drawText = function (text, x, y) {
		x = x || w/2
		y = y || h/2
        lab_cnt.font = "24px Arial";
        lab_cnt.fillStyle = "#000000";
        lab_cnt.fillText(text, x,y);
    };
    
	this.drawLine = function (which, constraint, color, width) {
		if ( which == "vertical" ) {
			this.drawLineFromPoints(constraint, 0, constraint, h, color, width)
		} else if ( which == "horizontal" ) {
			this.drawLineFromPoints(0, constraint, w, constraint, color, width)
		} else {
			var alpha = which; var beta = constraint;
			// line is alpha * x + beta * y = 1
			// therefore for x = 0 y = 1/beta, and for x = w y = (1 - alpha w)/beta
			// that's if beta is non null
			// otherwise x = 1/alpha
			if ( beta != 0 ) {
				this.drawLineFromPoints(0, 1/beta, w, (1-alpha*w)/beta, color, width)
			} else {
				this.drawLineFromPoints(1/alpha, 0, 1/alpha, h, color, width)
			}
			
			
		}
	}
		
    this.drawLineFromPoints = function (x1, y1, x2, y2, color, lineWidth) {
        
		lab_cnt.lineWidth = lineWidth || 0.5
        lab_cnt.strokeStyle = color || "#ffffff";
        
        lab_cnt.beginPath();
        lab_cnt.moveTo(x1, y1);
        lab_cnt.lineTo(x2, y2);
        lab_cnt.stroke();
        return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
    };
}
