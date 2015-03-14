/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) 
{
	CGFobject.call(this,scene);

	this.cube=new MyUnitCubeQuad(this.scene);
	this.cube.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function() 
{
	// tampo
    this.scene.pushMatrix();
    this.scene.scale(5, 0.3, 3);
  	this.scene.translate(0, 6.33, 0);
    this.cube.display();
    this.scene.popMatrix();

	// perna posterior direita
    this.scene.pushMatrix();
    this.scene.scale(0.3, 3.5, 0.3);
    this.scene.translate(7.5, 0, 4);
    this.cube.display(),
    this.scene.popMatrix();

	// perna posterior esquerda
    this.scene.pushMatrix();
    this.scene.scale(0.3, 3.5, 0.3);
    this.scene.translate(-7.5, 0, 4);
    this.cube.display();
    this.scene.popMatrix();

    // perna anterior direita
    this.scene.pushMatrix();
    this.scene.scale(0.3, 3.5, 0.3);
    this.scene.translate(7.5, 0, -4);
    this.cube.display();
    this.scene.popMatrix();

    // perna anterior esquerda
  	this.scene.pushMatrix();
  	this.scene.scale(0.3, 3.5, 0.3),
  	this.scene.translate(-7.5, 0, -4);
  	this.cube.display();
  	this.scene.popMatrix();
};
