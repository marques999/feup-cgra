function MyRobotWheel(scene)
{
	CGFobject.call(this, scene);

	this.robotRim = new MyCircle(this.scene, 24, 0.0, 1.0, 0.0, 0.0, 1.0);
	this.robotRim.initBuffers();
	this.robotTire = new MyCylinder(this.scene, 24, 1, 0.0, 2.0, 0.0, 1.0);
	this.robotTire.initBuffers();

	this.tireAppearance = new CGFappearance(this.scene);
	this.tireAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.tireAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.tireAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.tireAppearance.setTextureWrap("REPEAT", "REPEAT");
	this.tireAppearance.loadTexture("../resources/images/tread.png");

	this.wheelAppearance = new CGFappearance(this.scene);
	this.wheelAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.wheelAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.wheelAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.wheelAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	this.wheelAppearance.loadTexture("../resources/images/wheel.png");
};

MyRobotWheel.prototype = Object.create(CGFobject.prototype);
MyRobotWheel.prototype.constructor = MyRobotWheel;

MyRobotWheel.prototype.display = function()
{
	// tire
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI / 2, 1, 0, 0);
	this.scene.scale(1.0, 0.2, 1.0);
	this.tireAppearance.apply();
	this.robotTire.display();
	this.scene.popMatrix();

	// front-facing wheel
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 0.2);
	this.wheelAppearance.apply();
	this.robotRim.display();
	this.scene.popMatrix();

	// back-facing wheel
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI, 0, 1, 0);
	this.robotRim.display();
	this.scene.popMatrix();
};