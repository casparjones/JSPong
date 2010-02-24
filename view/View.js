/**
 * The <code>View</code> is a mediator for the <code>MapView</Code>,
 * <code>BallView</code> and <code>PlayerView</code>s.
 * 
 * It observers the <code>ModelLocator</code>'s models and updates the views.
 * 
 * @param canvas the <code>Canvas</code> to retrieve the context from.
 * @param modelLocator a <code>ModelLocator</code> reference.
 */
View = function(canvas, modelLocator) {
	this.canvas = canvas;
	this.modelLocator = modelLocator;

	this.drawingContext = canvas.getContext("2d");

	// Views.
	this.mapView = new MapView(this.drawingContext, this.canvas.width, this.canvas.height);
	this.player1View = new PlayerView(this.drawingContext);
	this.player2View = new PlayerView(this.drawingContext);
	this.ballView = new BallView(this.drawingContext);

	// Controllers.
	this.ballController = new BallController(this.modelLocator);
	this.keyUpController = new KeyUpController(this.modelLocator);
	this.keyDownController = new KeyDownController(this.modelLocator);

	// Observ the BallModel.	
	this.modelLocator.ballModel.addObserver(this);
	
	// Interval Ids for referencing used intervals when uising clearInterval.
	this.ballControllerIntervalId;
	this.keyDownIntervalId;
}

/**
 * Draws the views.
 */
View.prototype.draw = function() {
	this.drawingContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.mapView.draw();
	this.player1View.draw(this.modelLocator.player1Model.x, this.modelLocator.player1Model.y);
	this.player2View.draw(this.modelLocator.player2Model.x, this.modelLocator.player2Model.y);
	this.ballView.draw(this.modelLocator.ballModel.x, this.modelLocator.ballModel.y);
}

/**
 * Is called if a key has been pressed. 
 * 
 * @param event an <code>Object</code> containing the keycode.
 */
View.prototype.onKeyDown = function(event) {
	// Clear any existing interval.
	if(this.keyDownIntervalId)
		clearInterval(this.keyDownIntervalId);

	var ref = this;
	switch(event.keyCode) {
		case 38:
			this.keyDownIntervalId = setInterval(function(ref) {ref.keyUpController.execute();}, 0, this);
			break;
		case 40:
			this.keyDownIntervalId = setInterval(function(ref) {ref.keyDownController.execute();}, 0, this);
			break;
	}
}

/**
 * Is called if a key has been released.
 * 
 * @param event an <code>Object</code> containing the keycode.
 */
View.prototype.onKeyUp = function(event) {
	// Clear the interval matching the keyDownIntervalId
	if(this.keyDownIntervalId)
		clearInterval(this.keyDownIntervalId);	
}

/**
 * Updates the View.
 * 
 * @param observable the <code>Observable</code> reference.
 * @param updateMessage an <code>Object</code> containing additional
 * information.
 */
View.prototype.update = function(observable, updateMessage) {
	switch(observable) {
		case this.modelLocator.playStateModel:
			if(true == updateMessage) {
				var ref = this;
				// Start interval where the ballController gets executed.
				this.ballControllerIntervalId = setInterval(function(ref) {ref.ballController.execute();}, 0, this);
				
				document.onkeydown = function(event) {
					ref.onKeyDown(event);
				}
				
				document.onkeyup = function(event) {
					ref.onKeyUp(event);
				}
			} else if(false == updateMessage) {
				if(this.ballControllerIntervalId)
					clearInterval(this.ballControllerIntervalId);
			}
			break;
		default:
			this.draw();
			break;
	}
}

/**
 * The <code>MapView</code> draws a map in the specified context using
 * the specified width and height.
 * 
 * @param drawingContext the context to draw in.
 * @param width the <code>Map</code>'s width.
 * @param height the <code>Map</code>'s height.
 */
MapView = function(drawingContext, width, height) {
	this.drawingContext = drawingContext;
	this.width = width;
	this.height = height;
}

/**
 * Draws the <code>MapView</code>.
 */
MapView.prototype.draw = function() {
	this.drawingContext.fillStyle = "#000000";
	this.drawingContext.fillRect(0, 0, this.width, this.height);
}

/**
 * The <code>PlayerView</code> draws the player in the specified context.
 * 
 * @param drawingContext the context to draw in.
 */
PlayerView = function(drawingContext) {
	this.drawingContext = drawingContext;
}

/**
 * Draws the <code>PlayerView</code> at the specified position.
 * 
 * @param x the <code>PlayerView</code>'s x value.
 * @param y the <code>PlayerView</code>'s y value.
 */
PlayerView.prototype.draw = function(x, y) {
	this.drawingContext.fillStyle = "#FFFFFF";
	this.drawingContext.fillRect(x, y, 10, 40);
}

/**
 * The <code>BallView</code> draws the ball in the specified context.
 * 
 * @param drawingContext the context to draw in.
 */
BallView = function(drawingContext) {
	this.drawingContext = drawingContext;
}

/**
 * Draws the <code>BallView</code> at the specified position.
 * 
 * @param x the <code>BallView</code>'s x value.
 * @param y the <code>BallView</code>'s y value.
 */
BallView.prototype.draw = function(x, y) {
	this.drawingContext.fillStyle = "#FFFFFF";
	this.drawingContext.fillRect(x, y, 10, 10);
}