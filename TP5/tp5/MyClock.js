function MyClock(scene) 
{
	CGFobject.call(this, scene);

	this.clockFrame = new MyCylinder(this.scene, 12, 1);
	this.clockFrame.initBuffers();
	this.clockTop = new MyCircle(this.scene, 12);
	this.clockTop.initBuffers();
	this.clockHand = new MyClockHand(this.scene);
	this.clockHand.initBuffers();

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
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() 
{
	// Seconds Hand
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 0.215);
	this.clockHand.setAngle(180);
	this.clockHand.display();
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