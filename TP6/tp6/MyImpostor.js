function MyImpostor(scene)
{
	CGFobject.call(this, scene);

	this.divisions =
	[
		new Plane(this.scene, 16, -1.0, 0.04, 0.01, 0.98),
		new Plane(this.scene, 16, -0.89, 1.89, -0.5, 0.04),
		new Plane(this.scene, 16, 0.96, 2.0, 0.01, 0.98),
		new Plane(this.scene, 16, -0.89, 1.89, 0.96, 1.5),
		new Plane(this.scene, 16, 0.0, 0.5, 0.01, 0.98),
		new Plane(this.scene, 16, 0.5, 1.0, 0.01, 0.98)
	];

	this.divisions[0].initBuffers();
	this.divisions[1].initBuffers();
	this.divisions[2].initBuffers();
	this.divisions[3].initBuffers();
	this.divisions[4].initBuffers();
	this.divisions[5].initBuffers();

	this.impostorAppearance = new CGFappearance(this.scene);
	this.impostorAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.impostorAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.impostorAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.impostorAppearance.loadTexture("../resources/images/window_new.png");
	this.impostorAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
};

MyImpostor.prototype = Object.create(CGFobject.prototype);
MyImpostor.prototype.constructor = MyImpostor;

MyImpostor.prototype.display = function()
{
	// left division
	this.scene.pushMatrix();
	this.scene.translate(0, 4, 12.5);
	this.scene.scale(1, 4.0, 5.0);
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.impostorAppearance.apply();
	this.divisions[0].display();
	this.scene.popMatrix();

	// upper division
	this.scene.pushMatrix()
	this.scene.translate(0, 7, 7.5);
	this.scene.scale(1.0, 2.0, 15.0);
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.divisions[1].display();
	this.scene.popMatrix();

	// right division
	this.scene.pushMatrix();
	this.scene.translate(0, 4.0, 2.5);
	this.scene.scale(1, 4, 5);
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.divisions[2].display();
	this.scene.popMatrix();

	// lower division
	this.scene.pushMatrix();
	this.scene.translate(0, 1.0, 7.5);
	this.scene.scale(1, 2, 15.0);
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.divisions[3].display();
	this.scene.popMatrix();

	// left portada
	this.scene.pushMatrix();
	this.scene.translate(1.0, 4.0, 9.4);
	this.scene.rotate(Math.PI / 6, 0, 1, 0);
	this.scene.scale(2.5, 4, 1.0);
	this.divisions[4].display();
	this.scene.popMatrix();

	// right portada
	this.scene.pushMatrix();
	this.scene.translate(1.0, 4.0, 5.6);
	this.scene.rotate(5 * Math.PI / 6, 0, 1, 0);
	this.scene.scale(2.5, 4, 1.0);
	this.divisions[5].display();
	this.scene.popMatrix();
};