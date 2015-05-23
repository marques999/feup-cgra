function MyTable(scene)
{
	CGFobject.call(this, scene);

	this.quad = new MyUnitCubeQuad(this.scene);
	this.quad.initBuffers();

	this.wood = new CGFappearance(this.scene);
	this.wood.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.wood.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.wood.setSpecular(0.8, 0.8, 0.8, 0.2);
	this.wood.setShininess(40);
	this.wood.loadTexture("../resources/images/table.png");

	this.metal = new CGFappearance(this.scene);
	this.metal.setAmbient(0.4, 0.4, 0.4, 1.0);
	this.metal.setDiffuse(0.4, 0.4, 0.4, 0.8);
	this.metal.setSpecular(0.6, 0.6, 0.6, 1.0);
	this.metal.setShininess(10);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function()
{
	// perna posterior esquerda
	this.scene.pushMatrix();
	this.scene.translate(-2.35, 1.75, 1.35);
	this.scene.scale(0.3, 3.5, 0.3);
	this.metal.apply();
	this.quad.display();
	this.scene.popMatrix();

	// perna posterior direita
	this.scene.pushMatrix();
	this.scene.translate(2.35, 1.75, 1.35);
	this.scene.scale(0.3, 3.5, 0.3);
	this.quad.display();
	this.scene.popMatrix();

	// perna anterior esquerda
	this.scene.pushMatrix();
	this.scene.translate(-2.35, 1.75, -1.35);
	this.scene.scale(0.3, 3.5, 0.3);
	this.quad.display();
	this.scene.popMatrix();

	// perna anterior direita
	this.scene.pushMatrix();
	this.scene.translate(2.35, 1.75, -1.35);
	this.scene.scale(0.3, 3.5, 0.3);
	this.quad.display();
	this.scene.popMatrix();

	// tampo
	this.scene.pushMatrix();
	this.scene.translate(0.0, 3.65, 0.0);
	this.scene.scale(5.0, 0.3, 3.0);
	this.wood.apply();
	this.quad.display();
	this.scene.popMatrix();
};