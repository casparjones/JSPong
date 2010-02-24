/**
 * The <code>StartUpController</code> initializes the
 * <code>BallModel</code> and <code>PlayerModel</code>s.
 * After the models haven been initialized, the
 * <code>PlayStateModel</code>'s state is set to true.
 * 
 * @param modelLocator a <code>ModelLocator</code> reference.
 */
StartUpController = function(modelLocator) {
	this.modelLocator = modelLocator;
}

/**
 * Executes the <code>StartUpController</code>.
 */
StartUpController.prototype.execute = function() {
	var stageModel = this.modelLocator.stageModel;
	
	var ballModel = this.modelLocator.ballModel;
	ballModel.setX((stageModel.width - 10) >> 1);
	ballModel.setY((stageModel.height - 10) >> 1);

	var player1Model = this.modelLocator.player1Model;
	player1Model.setX(0);
	player1Model.setY((stageModel.height - 40) >> 1);

	var player2Model = this.modelLocator.player2Model;
	player2Model.setX(stageModel.width - 10);
	player2Model.setY((stageModel.height - 40) >> 1);
	
	this.modelLocator.playStateModel.setState(true);
}


/**
 * The <code>BallController</code> controls the
 * <code>BallModel</code>'s x and y values depending
 * on the <code>BallModel</code>'s hSpeed and vSpeed.
 * 
 * It also checks for collision with the walls and
 * <code>PlayerModel</code>s and inverts the speed.
 * 
 * @param modelLocator a <code>ModelLocator</code> reference.
 */
BallController = function(modelLocator) {
	this.modelLocator = modelLocator;
}

/**
 * Executes the <code>BallController</code>.
 */
BallController.prototype.execute = function() {
	var stageModel = this.modelLocator.stageModel;
	var ballModel = this.modelLocator.ballModel;
	var player1Model = this.modelLocator.player1Model;
	var player2Model = this.modelLocator.player2Model;
	
	ballModel.setX(ballModel.x + ballModel.hSpeed);
	ballModel.setY(ballModel.y + ballModel.vSpeed);

	if(ballModel.y <= 0 || ballModel.y >= stageModel.height - 10)
		ballModel.vSpeed *= -1;	
	if(ballModel.x > stageModel.width - 10) {
		if (ballModel.y >= player2Model.y && ballModel.y <= player2Model.y + 30) {
			ballModel.hSpeed *= -1;
		} else {
			ballModel.setX((stageModel.width - 10) >> 1);
			ballModel.setY((stageModel.height - 10) >> 1);
		}
	} else if(ballModel.x <= 10) {
		if(ballModel.y >= player1Model.y && ballModel.y <= player1Model.y + 30) {
			ballModel.hSpeed *= -1;
		} else {
			ballModel.setX((stageModel.width - 10) >> 1);
			ballModel.setY((stageModel.height - 10) >> 1);
		}
	}
	
	player2Model.setY((ballModel.y / (stageModel.height - 10)) * (40 + stageModel.height - 80));
}

/**
 * The <code>KeyUpController</code> decreases the <code>PlayerModel</code>'s
 * y value.
 * 
 * @param modelLocator a <code>ModelLocator</code> reference.
 */
KeyUpController = function(modelLocator) {
	this.modelLocator = modelLocator;
}

/**
 * Executes the <code>KeyUpController</code>.
 */
KeyUpController.prototype.execute = function() {
	var player1Model = this.modelLocator.player1Model;
	
	if(player1Model.y > 0) {
		player1Model.setY(player1Model.y - 1);
	}
}

/**
 * The <code>KeyDownController</code> increases the <code>PlayerModel</code>'s
 * y value.
 * 
 * @param modelLocator a <code>ModelLocator</code> reference.
 */
KeyDownController = function(modelLocator) {
	this.modelLocator = modelLocator;
}

/**
 * Executes the <code>KeyDownController</code>.
 */
KeyDownController.prototype.execute = function() {
	var player1Model = this.modelLocator.player1Model;
	var stageModel = this.modelLocator.stageModel;

	if(player1Model.y < stageModel.height - 40) {
		player1Model.setY(player1Model.y + 1);
	}
}
