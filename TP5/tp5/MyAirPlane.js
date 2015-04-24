function MyAirplane(scene) 
{
	CGFobject.call(this, scene);

	this.initBuffers();
};

MyAirplane.prototype = Object.create(CGFobject.prototype);
MyAirplane.prototype.constructor = MyAirplane;

MyAirplane.prototype.initBuffers = function() 
{
	this.vertices = 
	[
		0.0, 0.0, 0.0,
		-1.0, 0.0, 3.0,
		-0.25, 0.0, 3.0,
		0.25, 0.0, 3.0,
		1.0, 0.0, 3.0,
		0.0, -0.5, 3.0,
	];
	
	this.indices = 
	[ 
		0, 1, 2,
		1, 0, 2,
		0, 3, 4,
		3, 0, 4,
		0, 2, 5,
		2, 0, 5,
		0, 3, 5,
		3, 0, 5,
	];
	
	this.normals = 
	[ 
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, -1,
		0, 0, -1,
	];

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};