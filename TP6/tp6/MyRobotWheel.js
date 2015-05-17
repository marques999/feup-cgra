function MyRobotWheel(scene) 
{
	CGFobject.call(this, scene);

	this.robotTire = new MyCylinder(this.scene, 24, 1, 0.0, 2.0, 0.0, 1.0);
	this.robotTire.initBuffers();

	this.robotRim = new MyCircle(this.scene, 24, 0.0, 1.0, 0.0, 0.0, 1.0);
	this.robotRim.initBuffers();

	this.wheelAppearance = new CGFappearance(this.scene);
	this.wheelAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.wheelAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.wheelAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.wheelAppearance.setTextureWrap("REPEAT", "REPEAT");
	this.wheelAppearance.loadTexture("../resources/images/tread.png");

	this.rimAppearance = new CGFappearance(this.scene);
	this.rimAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.rimAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.rimAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.rimAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	this.rimAppearance.loadTexture("../resources/images/wheel.png");
};

MyRobotWheel.prototype = Object.create(CGFobject.prototype);
MyRobotWheel.prototype.constructor = MyRobotWheel;

MyRobotWheel.prototype.display = function() 
{
	// roda
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI / 2, 1, 0, 0);
	this.scene.scale(1.0, 0.2, 1.0);
	this.wheelAppearance.apply();
	this.robotTire.display();
	this.scene.popMatrix();

	// face frontal
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 0.2);
	this.rimAppearance.apply();
	this.robotRim.display();
	this.scene.popMatrix();

	// face traseira
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI, 0, 1, 0);
	this.rimAppearance.apply();
	this.robotRim.display();
	this.scene.popMatrix();
};