function MySphere(scene, slices, stacks)
{
	CGFobject.call(this, scene);

	this.slices = slices;
	this.stacks = stacks;
	this.initBuffers();
};

MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;

MySphere.prototype.initBuffers = function()
{
	this.indices = [];
	this.normals = [];
	this.vertices = [];

	var phi = 0;
	var phiIncrement = (2 * Math.PI) / this.slices;
	var thetaIncrement = Math.PI / this.stacks;

	for (var i = 0; i <= this.slices; i++) 
	{
		var theta = 0;

		for (var j = 0; j <= this.stacks; j++) 
		{
			var x = Math.cos(phi) * Math.sin(theta);
			var z = Math.sin(phi) * Math.sin(theta);
			var y = Math.cos(theta);

			this.vertices.push(x, y, z);
			this.normals.push(x, y, z);

			theta += thetaIncrement;
		}

		phi += phiIncrement;
	}

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