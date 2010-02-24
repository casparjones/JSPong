/**
 * <code>Pong</code> creates the <code>ModelLocator</code> and initializes
 * the <code>StageModel</code>.
 * 
 * After the <code>ModelLocator</code> has been created,
 * the <code>View</code> is created with the <code>ModelLocator</code>
 * and used canvas.
 */
Pong = function (canvas) {
	this.canvas = canvas;
	
	// Model
	this.modelLocator = new ModelLocator();
	this.modelLocator.stageModel.width = this.canvas.width;
	this.modelLocator.stageModel.height = this.canvas.height;
	
	// View
	this.view = new View(this.canvas, this.modelLocator);
	
	// Controller
	this.startUpController = new StartUpController(this.modelLocator);
}

/**
 * Start the game by executing the <code>StartUpController</code>.
 */
Pong.prototype.start = function() {
	this.startUpController.execute();
}
