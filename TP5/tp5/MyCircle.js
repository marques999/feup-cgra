function MyCircle(scene, slices) 
{
	CGFobject.call(this, scene);
	
	this.slices = slices;
	this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor = MyCircle;

MyCircle.prototype.initBuffers = function() 
{
	this.vertices = [];
	this.texCoords = [];
	this.normals = [];

	var theta = 0;
	var thetaIncrement = (2 * Math.PI) / this.slices;

	for (var i = 0; i <= this.slices; i++) 
	{
		var x = Math.cos(theta);
		var y = Math.sin(theta);

		this.vertices.push(x, y, 0);
		this.texCoords.push(x*0.5 + 0.5, 0.5 - y*0.5);
		this.normals.push(0, 0, 1);

		theta += thetaIncrement;
	}

	this.vertices.push(0, 0, 0);
	this.texCoords.push(0.5, 0.5);
	this.normals.push(0, 0, 1);

	this.indices = [];

	var vertexNumber = 0;
	var lastVertex = (this.vertices.length / 3) - 1;

	for (var i = 0; i < this.slices; i++) 
	{
		this.indices.push(vertexNumber, vertexNumber + 1, lastVertex);

		vertexNumber++;
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};