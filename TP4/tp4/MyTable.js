function MyTable(scene)
{
    CGFobject.call(this, scene);

    this.quad = new MyUnitCubeQuad(this.scene);
    this.quad.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function ()
{
    // perna posterior esquerda
    this.scene.pushMatrix();
    this.scene.translate(-2.35, 1.75, 1.35);
    this.scene.scale(0.3, 3.5, 0.3);
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
    this.scene.translate(0, 3.65, 0);
    this.scene.scale(5, 0.3, 3);
    this.quad.display();
    this.scene.popMatrix();
};