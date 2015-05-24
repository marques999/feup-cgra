function MyInterface()
{
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

MyInterface.prototype.init = function(application)
{
	CGFinterface.prototype.init.call(this, application);

	this.gui = new dat.GUI();
	this.gui.add(this.scene, 'pauseClock');
	this.gui.add(this.scene, 'pauseScene');

	var groupLights = this.gui.addFolder("Lights");

	groupLights.open();
	groupLights.add(this.scene, 'backgroundLight');
	groupLights.add(this.scene, 'boardLight');
	groupLights.add(this.scene, 'slidesLight');
	groupLights.add(this.scene, 'windowLight');

	var groupViews = this.gui.addFolder("Views");

	groupViews.open();
	groupViews.add(this.scene, 'defaultView');
	groupViews.add(this.scene, 'frontView');
	groupViews.add(this.scene, 'topView');

	var groupScene = this.gui.addFolder("Scene");

	groupScene.open();
	groupScene.add(this.scene, 'drawBall');
	groupScene.add(this.scene, 'drawBoard');
	groupScene.add(this.scene, 'drawChairs');
	groupScene.add(this.scene, 'drawClock');
	groupScene.add(this.scene, 'drawColumns');
	groupScene.add(this.scene, 'drawLandscape');
	groupScene.add(this.scene, 'drawRobot');
	groupScene.add(this.scene, 'drawSlides');
	groupScene.add(this.scene, 'drawTables');
	groupScene.add(this.scene, 'updateInterval', 10, 60);

	var groupRobot = this.gui.addFolder("Robot");

	groupRobot.open();
	groupRobot.add(this.scene, 'currentRobot', this.scene.robotAppearanceList);
	groupRobot.add(this.scene, 'followRobot');
	groupRobot.add(this.scene, 'robotScale', 0.1, 5.0);
	groupRobot.add(this.scene, 'armAmplitude', Math.PI / 6, Math.PI);

	return true;
};

MyInterface.prototype.processKeyDown = function(event)
{
	CGFinterface.prototype.processKeyDown.call(this, event);

	switch (event.keyCode || event.which)
	{
		case 87: case 119:
			this.scene.robot.goForward = 1;
			break;
		case 83: case 115:
			this.scene.robot.goBackward = 1;
			break;
		case 65: case 97:
			this.scene.robot.rotateLeft = 1;
			break;
		case 68: case 100:
			this.scene.robot.rotateRight = 1;
			break;
		case 32:
			this.scene.robot.jump();
			break;
		case 79: case 111:
			this.scene.robot.robotGreet = 1;
			break;
	};
};

MyInterface.prototype.processKeyUp = function(event)
{
	CGFinterface.prototype.processKeyDown.call(this, event);

	switch (event.keyCode || event.which)
	{
		case 87: case 119:
			this.scene.robot.goForward = 0;
			break;
		case 83: case 115:
			this.scene.robot.goBackward = 0;
			break;
		case 65: case 97:
			this.scene.robot.rotateLeft = 0;
			break;
		case 68: case 100:
			this.scene.robot.rotateRight = 0;
			break;
	};
};