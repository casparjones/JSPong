/**
 * <code>Observable</code> is a base for <code>Objects</code> that
 * provide an interface for <code>Object</code>s that want to observe
 * the <code>Observable</code>.
 * 
 * Observers must implement an <code>update</code> method in order
 * to register to an <code>Observable</code> <code>Object</code>.
 */
Observable = function() {}

// An Array used to store the observers.
Observable.prototype.observers = [];

/**
 * Adds the specified observer to the observers <code>Array</code>.
 * 
 * @param observer the <code>Object</code> to add.
 * @return wheter or not the specified observer has been added.
 * It will only be added if <code>update</code> is implemented.
 */
Observable.prototype.addObserver = function(observer) {
	if(!observer.update)
		return false;
	
	this.observers.push(observer);
	
	return true;
}

/**
 * Dispatches the specified updateMessage to all registered observers.
 * 
 * @param updateMessage an <code>Object</code> containing information
 * about the <code>Observer</code>s state.
 */
Observable.prototype.dispatchUpdateMessage = function(updateMessage) {
	var l = this.observers.length;
	while(l--) {
		this.observers[l].update(this, updateMessage);
	}
}

/**
 * The <code>PlayerModel</code> is an <code>Observable</code>
 * that holds a player's state.
 */
PlayerModel = function() {}

PlayerModel.prototype = new Observable();

PlayerModel.prototype.x = 0;

PlayerModel.prototype.y = 0;

/**
 * Sets the <code>PlayerModel</code>'s x value.
 * 
 * @param value the <code>PlayerModel</code>'s x value.
 */
PlayerModel.prototype.setX = function(value) {
	this.x = value;
	this.dispatchUpdateMessage(this.x);
}

/**
 * Sets the <code>PlayerModel</code>'s y value.
 * 
 * @param value the <code>PlayerModel</code>'s y value.
 */
PlayerModel.prototype.setY = function(value) {
	this.y = value;
	this.dispatchUpdateMessage(this.y);
}

/**
 * The <code>BallModel</code> is an <code>Observable</code>
 * that holds the ball's state.
 */
BallModel = function() {}

BallModel.prototype = new Observable();

BallModel.prototype.x = 0;

BallModel.prototype.y = 0;

BallModel.prototype.hSpeed = 2;

BallModel.prototype.vSpeed = 2;

/**
 * Sets the <code>BallModel</code>'s x value.
 * 
 * @param value the <code>BallModel</code>'s x value.
 */
BallModel.prototype.setX = function(value) {
	this.x = value;
	this.dispatchUpdateMessage(this.x);
}

/**
 * Sets the <code>BallModel</code>'s y value.
 * 
 * @param value the <code>BallModel</code>'s y value.
 */
BallModel.prototype.setY = function(value) {
	this.y = value;
	this.dispatchUpdateMessage(this.y);
}

/**
 * The <code>StageModel</code> holds the game's map dimension.
 */
StageModel = function() {}

StageModel.prototype.width = 0;

StageModel.prototype.height = 0;


/**
 * The <code>PlayStateModel</code> is an <code>Observable</code>
 * that holds wheter or not the games is running.
 */
PlayStateModel = function() {}

PlayStateModel.prototype = new Observable();

PlayStateModel.prototype.state = false;

/**
 * Sets the <code>PlayStateModel</code>'s state.
 * 
 * @param value the <code>PlayStateModel</code>'s state.
 */
PlayStateModel.prototype.setState = function(value) {
	this.state = value;
	this.dispatchUpdateMessage(this.state);
}

/**
 * The <code>ModelLocator</code> provides an API for accessing the models.
 */
ModelLocator = function() {}

ModelLocator.prototype.player1Model = new PlayerModel();

ModelLocator.prototype.player2Model = new PlayerModel();

ModelLocator.prototype.ballModel = new BallModel();

ModelLocator.prototype.stageModel = new StageModel();

ModelLocator.prototype.playStateModel = new PlayStateModel();
