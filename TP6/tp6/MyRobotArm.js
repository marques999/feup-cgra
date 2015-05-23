function MyRobotArm(scene)
{
	CGFobject.call(this, scene);

	this.robotArm = new MyCylinder(this.scene, 12, 12);
	this.robotArm.initBuffers();
	this.robotHand = new MyLamp(this.scene, 12, 12);
	this.robotHand.initBuffers();

	this.handAppearance = new CGFappearance(this.scene);
	this.handAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.handAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.handAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);

	this.armAppearance = new CGFappearance(this.scene);
	this.armAppearance.setAmbient(0.0, 0.0, 0.0, 1.0);
	this.armAppearance.setDiffuse(0.4, 0.4, 0.4, 1.0);
	this.armAppearance.setSpecular(0.6, 0.6, 0.6, 1.0);
	this.armAppearance.setShininess(4);
};

MyRobotArm.prototype = Object.create(CGFobject.prototype);
MyRobotArm.prototype.constructor = MyRobotArm;

MyRobotArm.prototype.display = function()
{
	// moldura da roda
	this.scene.pushMatrix();
	this.scene.scale(0.15, 0.5, 0.15);
	this.scene.translate(0.0, -1.0, 0.0);
	this.armAppearance.apply();
	this.robotArm.display();
	this.scene.popMatrix();

	// frente da roda
	this.scene.pushMatrix();
	this.scene.scale(0.15, 0.15, 0.15);
	this.handAppearance.apply();
	this.robotHand.display();
	this.scene.popMatrix();

	// traseira da roda
	this.scene.pushMatrix();
	this.scene.translate(0.0, -0.5, 0.0);
	this.scene.scale(0.15, 0.15, 0.15);
	this.scene.rotate(Math.PI, 0, 0, 1);
	this.robotHand.display();
	this.scene.popMatrix();
};