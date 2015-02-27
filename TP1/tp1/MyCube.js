/**
 * NyCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyCube.prototype = Object.create(CGFobject.prototype);
MyCube.prototype.constructor=MyCube;

MyCube.prototype.initBuffers = function () 
{
	this.vertices = 
	[
		-0.5, -0.5, 0.5,
		0.5, -0.5, 0.5,
		-0.5, 0.5, 0.5, 
		0.5, 0.5, 0.5,
		-0.5, -0.5, -0.5,
		0.5, -0.5, -0.5,
		-0.5, 0.5, -0.5, 
		0.5, 0.5, -0.5,
	];

	this.indices = 
	[
		// left
		0, 1, 2,
		3, 2, 1,


		6, 5, 4,
		5, 6, 7,

		// bottom
	    4, 1, 0,
		1, 4, 5,

		// top
		3, 6 ,2,
		6, 3 ,7,
		

		5, 3, 1,
		7, 3 ,5,

		0, 2, 4,
		4, 2, 6,
	];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
