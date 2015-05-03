function MyCylinder(scene, slices, stacks, minS, maxS, minT, maxT) 
{
	CGFobject.call(this, scene);

	this.slices = slices;
	this.stacks = stacks;
	this.minS = minS || 0.0;
	this.maxS = maxS || 1.0;
	this.minT = minT || 0.0;
	this.maxT = maxT || 1.0;
	this.texelLengthS = (this.maxS - this.minS) / this.slices;
	this.texelLengthT = (this.maxT - this.minT) / this.stacks;
	this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() 
{
	this.vertices = [];
	this.texCoords = [];
	this.normals = [];

	var theta = 0;
	var thetaIncrement = (2 * Math.PI) / this.slices;
	var stackIncrement = 1.0 / this.stacks;
	var s = this.minS;

	for (var i = 0; i <= this.slices; i++) 
	{
		var x = Math.cos(theta);
		var y = Math.sin(theta);
		var t = this.minT;
		var z = 0;

		for (var j = 0; j <= this.stacks; j++) 
		{
			this.vertices.push(x, z, y);
			this.normals.push(x, 0, y);
			this.texCoords.push(s, t);

			z += stackIncrement;
			t += this.texelLengthT;
		}

		theta += thetaIncrement;
		s += this.texelLengthS;
	}

	this.indices = [];

	var vertexNumber = 1;

	for (var i = 0; i < this.slices; i++) 
	{
		for (var j = 0; j < this.stacks; j++) 
		{
			this.indices.push(vertexNumber, vertexNumber + this.stacks, vertexNumber + this.stacks + 1);
			this.indices.push(vertexNumber + this.stacks, vertexNumber, vertexNumber - 1);
			this.indices.push(vertexNumber + this.stacks + 1, vertexNumber + this.stacks, vertexNumber);
			this.indices.push(vertexNumber, vertexNumber + this.stacks, vertexNumber - 1);

			vertexNumber++;
		}

		vertexNumber++;
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};