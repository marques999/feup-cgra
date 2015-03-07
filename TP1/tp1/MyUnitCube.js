/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {

this.vertices = [
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
             -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5
			];

	this.indices = [
			1, 0 , 3,
			2, 3 , 0, //face traseira
			
			4, 5, 6,
			7, 6, 5,
			7, 1, 3,
			5, 1 , 7,
			0, 4, 2,
			6, 2, 4,
			7,3, 6,
			2, 6, 3,
			4, 0, 5,
			1, 5, 0
        ];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};