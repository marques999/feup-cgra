/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene)
{
    CGFobject.call(this, scene);

    this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor = MyUnitCube;

MyUnitCube.prototype.initBuffers = function ()
{
    this.vertices = [
            // vertices da face lateral esquerda
            -0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5,
            -0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5,

            // vertices da face lateral direita
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5
    ];

    this.indices = [
	        // face frontal
            2, 0, 4,
            6, 2, 4,

            // face lateral direita
            6, 4, 5,
            7, 6, 5,

            // face traseira
            3, 7, 5,
            3, 5, 1,

            // face lateral esquerda
            2, 3, 1,
            2, 1, 0,

            // face superior
            3, 2, 6,
            6, 7, 3,

            // face inferior
            0, 1, 4,
            1, 5, 4
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};