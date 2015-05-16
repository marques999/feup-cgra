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
	this.gui.add(this.scene, 'pauseAirplane');
	this.gui.add(this.scene, 'pauseClock');	
	this.gui.add(this.scene, 'pauseScene');	
	
	var groupLights = this.gui.addFolder("Lights");
	
	groupLights.open();
	groupLights.add(this.scene, 'slidesLight');
	groupLights.add(this.scene, 'boardLight');
	groupLights.add(this.scene, 'windowLight');
	groupLights.add(this.scene, 'pillarLight');

	var groupScene = this.gui.addFolder("Scene");

	groupScene.open();
	groupScene.add(this.scene, 'drawAirplane');
	groupScene.add(this.scene, 'drawBoard');
	groupScene.add(this.scene, 'drawClock');
	groupScene.add(this.scene, 'drawPillars');
	groupScene.add(this.scene, 'drawRobot');
	groupScene.add(this.scene, 'drawSlides');
	groupScene.add(this.scene, 'drawTables');	
	groupScene.add(this.scene, 'updateInterval', 10, 60);

	var groupRobot = this.gui.addFolder("Robot");

	groupRobot.open();
	groupRobot.add(this.scene, 'currentRobot', this.scene.robotAppearanceList);
	groupRobot.add(this.scene, 'scaleRobot', 0.1, 5.0);
	groupRobot.add(this.scene, 'armAmplitude', Math.PI / 6, Math.PI);
	
	return true;
};

MyInterface.prototype.processKeyboard = function(event) 
{
	CGFinterface.prototype.processKeyboard.call(this, event);

	var keyCode = event.keyCode || event.which;
	
	switch (keyCode)
	{
		case 87: case 119:
			this.scene.robot.move(1);
			break;
		case 83: case 115:
			this.scene.robot.move(0);
			break;
		case 65: case 97:
			this.scene.robot.rotate(Math.PI / 12);
			break;
		case 58: case 100:
			this.scene.robot.rotate(-Math.PI / 12);
			break;
		case 32:
			this.scene.robot.jump();
			break;
		case 72: case 104:
			this.scene.robot.greet();
			break;
	};
};