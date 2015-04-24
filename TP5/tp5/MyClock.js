function MyClock(scene) 
{
	CGFobject.call(this, scene);

	this.clockFrame = new MyCylinder(this.scene, 12, 1);
	this.clockFrame.initBuffers();
	this.clockTop = new MyCircle(this.scene, 12);
	this.clockTop.initBuffers();
	this.secondsHand = new MyClockHand(this.scene, 0.6);
	this.secondsHand.setAngle(270);
	this.minutesHand = new MyClockHand(this.scene, 0.5);
	this.minutesHand.setAngle(180);
	this.hoursHand = new MyClockHand(this.scene, 0.35);
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

	this.secondsIncrement = 360 / 60;
	this.minutesIncrement = this.secondsIncrement / 60;
	this.hoursIncrement =  this.minutesIncrement / 12;
	this.lastUpdate = 0;
	this.updateInterval = 1000;
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() 
{
	// ponteiro dos segundos
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 0.265);
	this.secondsAppearance.apply();
	this.secondsHand.display();
	this.scene.popMatrix();

	// ponteiro dos minutos
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 0.240);
	this.minutesAppearance.apply();
	this.minutesHand.display();
	this.scene.popMatrix();

	// ponteiro das horas
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 0.215);
	this.hoursAppearance.apply();
	this.hoursHand.display();
	this.scene.popMatrix();

	// moldura do relogio
	this.scene.pushMatrix();
	this.scene.scale(0.7, 0.7, 0.2);
	this.frameAppearance.apply();
	this.clockFrame.display();
	this.scene.popMatrix();

	// frente do relogio
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 0.2);
	this.scene.scale(0.7, 0.7, 1);
	this.clockAppearance.apply();
	this.clockTop.display();
	this.scene.popMatrix();
};

MyClock.prototype.update = function(currTime)
{
	if (this.lastUpdate == 0)
	{
		var elapsedSeconds = Math.round(currTime / 1000) % 60;
		var elapsedMinutes = Math.round(currTime / 1000 / 60) % 60;
		var elapsedHours = Math.round(currTime / 1000 / 60 / 60) % 12;

		this.secondsHand.setAngle(elapsedSeconds * this.secondsIncrement);
		this.minutesHand.setAngle(elapsedMinutes * this.secondsIncrement + elapsedSeconds * this.minutesIncrement);
		this.hoursHand.setAngle(elapsedHours * (360 / 12) + elapsedMinutes * this.minutesIncrement + elapsedSeconds * this.hoursIncrement);
		this.lastUpdate = currTime;
	}

	if (currTime - this.lastUpdate >= this.updateInterval)
	{
		this.secondsHand.incrementAngle(this.secondsIncrement);
		this.minutesHand.incrementAngle(this.minutesIncrement);
		this.hoursHand.incrementAngle(this.hoursIncrement);
		this.lastUpdate = currTime;
	}
}