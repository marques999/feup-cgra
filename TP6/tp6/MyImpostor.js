function MyImpostor(scene) 
{
	CGFobject.call(this, scene);

	this.divisions =
	[
		new Plane(this.scene, 16, 0.0, -0.5, 1.0/32.0, 1.5),
		new Plane(this.scene, 16, 0.0, 1.0, 1.0, 53.0/32.0),
		new Plane(this.scene, 16, 0.0, -1.0, 1.0, 0.0),
		new Plane(this.scene, 16, 0.5, 1.0, 0.0, 1.0)
	];

	this.divisions[0].initBuffers();
	this.divisions[1].initBuffers();
	this.divisions[2].initBuffers();
	this.divisions[3].initBuffers();
	this.impostorAppearance = new CGFappearance(this.scene);
	this.impostorAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.impostorAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.impostorAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.impostorAppearance.loadTexture("../resources/images/bliss.png");
	this.impostorAppearance.setTextureWrap("REPEAT", "REPEAT");
};

MyImpostor.prototype = Object.create(CGFobject.prototype);
MyImpostor.prototype.constructor = MyImpostor;

MyImpostor.prototype.display = function()
{
	// left division
	this.scene.pushMatrix();
	this.scene.translate(0,4,12.5);
	this.scene.scale(1,8,5);
	this.scene.rotate(Math.PI / 2,0,1,0);
	this.divisions[0].display();
	this.impostorAppearance.apply();
	this.scene.popMatrix();

	// upper division
	this.scene.pushMatrix()
	this.scene.translate(0,7,7.5);
	this.scene.scale(1,2,5);
	this.scene.rotate(Math.PI / 2,0,0,1);
	this.scene.rotate(Math.PI / 2,1,0,0);
	this.divisions[1].display();
	this.scene.popMatrix();

	// lower division
	this.scene.pushMatrix();
	this.scene.translate(0,1,7.5);
	this.scene.scale(1,2,5);
	this.scene.rotate(Math.PI / 2,0,0,1);
	this.scene.rotate(Math.PI / 2,1,0,0);
	this.divisions[2].display();
	this.scene.popMatrix();

	// right division
	this.scene.pushMatrix();
	this.scene.translate(0,4,2.5);
	this.scene.scale(1,8,5);
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.divisions[3].display();
	this.scene.popMatrix();
};