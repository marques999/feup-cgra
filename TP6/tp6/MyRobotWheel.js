function MyRobotWheel(scene) 
{
	CGFobject.call(this, scene);

	this.wheelFrame = new MyCylinder(this.scene, 12, 1);
	this.wheelFrame.initBuffers();
	this.wheelTop = new MyCircle(this.scene, 12);
	this.wheelTop.initBuffers();

	this.wheelAppearance = new CGFappearance(this.scene);
	this.wheelAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.wheelAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.wheelAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.wheelAppearance.loadTexture("../resources/images/clock.png");

	this.frameAppearance = new CGFappearance(this.scene);
	this.frameAppearance.setAmbient(0.0, 0.0, 0.0, 1.0);
	this.frameAppearance.setDiffuse(0.4, 0.4, 0.4, 1.0);
	this.frameAppearance.setSpecular(0.6, 0.6, 0.6, 1.0);
	this.frameAppearance.setShininess(4);
};

MyRobotWheel.prototype = Object.create(CGFobject.prototype);
MyRobotWheel.prototype.constructor = MyRobotWheel;

MyRobotWheel.prototype.display = function() 
{
	// moldura da roda
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI / 2, 1, 0, 0);
	this.scene.scale(1.0, 0.2, 1.0);
	this.frameAppearance.apply();
	this.wheelFrame.display();
	this.scene.popMatrix();

	// frente da roda
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 0.2);
	this.wheelAppearance.apply();
	this.wheelTop.display();
	this.scene.popMatrix();

	// traseira da roda
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI, 0, 1, 0);
	this.wheelAppearance.apply();
	this.wheelTop.display();
	this.scene.popMatrix();
};