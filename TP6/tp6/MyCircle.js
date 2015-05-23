function MyCircle(scene, slices, minS, maxS, minT, maxT)
{
	CGFobject.call(this, scene);

	this.slices = slices;
	this.minS = minS || 0.0;
	this.maxS = maxS || 1.0;
	this.minT = minT || 0.0;
	this.maxT = maxT || 1.0;
	this.texelLengthS = (this.maxS - this.minS) / 2;
	this.texelLengthT = (this.maxT - this.minT) / 2;
	this.initBuffers();
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor = MyCircle;

MyCircle.prototype.initBuffers = function()
{
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	this.vertices = [];

	var theta = 0;
	var thetaIncrement = (2 * Math.PI) / this.slices;
	var vertexNumber = 1;

	this.vertices.push(0, 0, 0);
	this.texCoords.push(this.texelLengthS, this.texelLengthT);
	this.normals.push(0, 0, 1);

	for (var i = 0; i <= this.slices; i++)
{
		var x = Math.cos(theta);
		var y = Math.sin(theta);

		this.vertices.push(x, y, 0);
		this.texCoords.push(x * this.texelLengthS + this.texelLengthS, this.texelLengthT - y * this.texelLengthT);
		this.normals.push(0, 0, 1);

		theta += thetaIncrement;
	}

	for (var i = 0; i < this.slices; i++, vertexNumber++)
{
		this.indices.push(vertexNumber, vertexNumber + 1, 0);
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};