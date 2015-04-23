function MyClock(scene) 
{
	CGFobject.call(this, scene);

	this.clockFrame = new MyCylinder(this.scene, 12, 1);
	this.clockFrame.initBuffers();
	this.clockTop = new MyCircle(this.scene, 12);
	this.clockTop.initBuffers();
	this.secondsHand = new MyClockHand(this.scene);
	this.secondsHand.setAngle(270);
	this.minutesHand = new MyClockHand(this.scene);
	this.minutesHand.setAngle(180);
	this.hoursHand = new MyClockHand(this.scene);
	this.hoursHand.setAngle(90);

	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.clockAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.clockAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.clockAppearance.loadTexture("../resources/images/clock.png");

	this.frameAppearance = new CGFappearance(this.scene);
	this.frameAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.frameAppearance.setDiffuse(0.4, 0.4, 0.4, 1.0);
	this.frameAppearance.setSpecular(0.6, 0.6, 0.6, 1.0);
	this.frameAppearance.setShininess(4);

	this.hoursAppearance = new CGFappearance(this.scene);
	this.hoursAppearance.setAmbient(0.5, 0.5, 0.5, 0.5);
	this.hoursAppearance.setDiffuse(0.1, 0.1, 0.1, 1.0);
	this.hoursAppearance.setSpecular(0.6, 0.6, 0.6, 0.2);

	this.minutesAppearance = new CGFappearance(this.scene);
	this.minutesAppearance.setAmbient(0.5, 0.5, 0.5, 0.5);
	this.minutesAppearance.setDiffuse(0.5, 0.5, 0.5, 1.0);
	this.minutesAppearance.setSpecular(0.6, 0.6, 0.6, 0.2);

	this.secondsAppearance = new CGFappearance(this.scene);
	this.secondsAppearance.setAmbient(0.5, 0.5, 0.5, 0.5);
	this.secondsAppearance.setDiffuse(0.8, 0.9, 0.0, 1.0);
	this.secondsAppearance.setSpecular(0.6, 0.6, 0.6, 0.2);

	this.previousTime = 0;
	this.elapsedTime = 0;
	this.secondsIncrement = (360 / 60);
	this.minutesIncrement = this.secondsIncrement / 60;
	this.hoursIncrement = this.secondsIncrement / 3600;
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() 
{
	// Seconds Hand
	this.scene.pushMatrix();
	this.scene.scale(1.2, 1, 1);
	this.scene.translate(0.0, 0.0, 0.275);
	this.secondsAppearance.apply();
	this.secondsHand.display();
	this.scene.popMatrix();

	// Minutes Hand
	this.scene.pushMatrix();
	this.scene.scale(1.0, 1, 1);
	this.scene.translate(0.0, 0.0, 0.245);
	this.minutesAppearance.apply();
	this.minutesHand.display();
	this.scene.popMatrix();

	// Hours Hand
	this.scene.pushMatrix();
	this.scene.scale(1.0, 0.7, 1.0);
	this.scene.translate(0.0, 0.0, 0.215);
	this.hoursAppearance.apply();
	this.hoursHand.display();
	this.scene.popMatrix();

	// Clock Frame
	this.scene.pushMatrix();
	this.scene.scale(0.7, 0.7, 0.2);
	this.frameAppearance.apply();
	this.clockFrame.display();
	this.scene.popMatrix();

	// Clock Top
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 0.2);
	this.scene.scale(0.7, 0.7, 1);
	this.clockAppearance.apply();
	this.clockTop.display();
	this.scene.popMatrix();
};

MyClock.prototype.update = function(currTime)
{
	if (this.previousTime == 0)
	{
		var elapsedSeconds = Math.round(currTime / 1000) % 60;
		var elapsedMinutes = Math.round(currTime / 1000 / 60) % 60;
		var elapsedHours = Math.round(currTime / 1000 / 60 / 60) % 12;

		this.secondsHand.setAngle(elapsedSeconds * this.secondsIncrement);
		this.minutesHand.setAngle(elapsedMinutes * this.secondsIncrement + elapsedSeconds * this.minutesIncrement);
		this.hoursHand.setAngle(elapsedHours * (360/12) + elapsedMinutes * this.minutesIncrement);
		this.previousTime = currTime;
	}

	this.elapsedTime += (currTime - this.previousTime);
	this.previousTime = currTime;
	
	if (this.elapsedTime >= 1000)
	{
		var elapsedSeconds = Math.round(currTime / 1000) % 60;
		var elapsedMinutes = Math.round(currTime / 1000 / 60) % 60;
		var elapsedHours = Math.round(currTime / 1000 / 60 / 60) % 12;

		this.secondsHand.setAngle(elapsedSeconds * this.secondsIncrement);
		this.minutesHand.setAngle(elapsedMinutes * this.secondsIncrement + elapsedSeconds * this.minutesIncrement);
		this.hoursHand.setAngle(elapsedHours * (360/12) + elapsedMinutes * this.minutesIncrement);
		this.elapsedTime = 0;
	}
}