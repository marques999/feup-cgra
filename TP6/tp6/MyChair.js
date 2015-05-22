function MyChair(scene)
{
	CGFobject.call(this, scene);

	this.quad = new MyUnitCubeQuad(this.scene);
	this.quad.initBuffers();

	this.wood = new CGFappearance(this.scene);
	this.wood.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.wood.setDiffuse(0.4, 0.2, 0.0, 1.0);
	this.wood.setSpecular(0.4, 0.2, 0.0, 0.1);
	this.wood.setShininess(120);

	this.metal = new CGFappearance(this.scene);
	this.metal.setAmbient(0.4, 0.4, 0.4, 1.0);
	this.metal.setDiffuse(0.4, 0.4, 0.4, 0.8);
	this.metal.setSpecular(0.6, 0.6, 0.6, 1.0);
	this.metal.setShininess(10);
};

MyChair.prototype = Object.create(CGFobject.prototype);
MyChair.prototype.constructor = MyChair;

MyChair.prototype.display = function()
{
	// tampo
	this.scene.pushMatrix();
	this.scene.translate(0.0, 2.0, 0.0);
	this.scene.scale(2.0, 0.3, 2.0);
	this.wood.apply();
	this.quad.display();
	this.scene.popMatrix();

	// costas
	this.scene.pushMatrix();
	this.scene.translate(0.0, 3.5, -0.85);
	this.scene.scale(2.0, 2.8, 0.3);
	this.quad.display();
	this.scene.popMatrix();

	// perna posterior esquerda
	this.scene.pushMatrix();
	this.scene.translate(-0.85, 0.85, 0.85);
	this.scene.scale(0.3, 2.0, 0.3);
	this.metal.apply();
	this.quad.display();
	this.scene.popMatrix();

	// perna posterior direita
	this.scene.pushMatrix();
	this.scene.translate(0.85, 0.85, 0.85);
	this.scene.scale(0.3, 2.0, 0.3);
	this.quad.display();
	this.scene.popMatrix();

	// perna anterior esquerda
	this.scene.pushMatrix();
	this.scene.translate(-0.85,  0.85, -0.85);
	this.scene.scale(0.3, 2.0, 0.3);
	this.quad.display();
	this.scene.popMatrix();

	// perna anterior direita
	this.scene.pushMatrix();
	this.scene.translate(0.85, 0.85, -0.85);
	this.scene.scale(0.3, 2.0, 0.3);
	this.quad.display();
	this.scene.popMatrix();
};