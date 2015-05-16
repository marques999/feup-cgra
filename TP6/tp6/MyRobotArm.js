function MyRobotArm(scene) 
{
	CGFobject.call(this, scene);

	this.robotArm = new MyCylinder(this.scene, 12, 1);
	this.robotArm.initBuffers();
	this.robotHand = new MyHemisphere(this.scene, 12, 12);
	this.robotHand.initBuffers();

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

MyRobotArm.prototype = Object.create(CGFobject.prototype);
MyRobotArm.prototype.constructor = MyRobotArm;

MyRobotArm.prototype.display = function() 
{
	// moldura da roda
	this.scene.pushMatrix();
	this.scene.scale(0.15, 0.5, 0.15);
	this.scene.translate(0, -1.0, 0);
	this.frameAppearance.apply();
	this.robotArm.display();
	this.scene.popMatrix();

	// frente da roda
	this.scene.pushMatrix();
	this.scene.scale(0.15, 0.15, 0.15);
	this.wheelAppearance.apply();
	this.robotHand.display();
	this.scene.popMatrix();

	// traseira da roda
	this.scene.pushMatrix();
	this.scene.translate(0.0, -0.5, 0.0);
	this.scene.scale(0.15, 0.15, 0.15);
	this.scene.rotate(Math.PI, 0, 0, 1);

	this.wheelAppearance.apply();
	this.robotHand.display();
	this.scene.popMatrix();
};