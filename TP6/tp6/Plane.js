function Plane(scene, nrDivs, minS, maxS, minT, maxT) 
{
	CGFobject.call(this, scene);

	nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

	this.minS = minS || 0.0;
	this.maxS = maxS || 1.0;
	this.minT = minT || 0.0;
	this.maxT = maxT || 1.0;
	this.nrDivs = nrDivs;
	this.patchLength = 1.0 / nrDivs;
	this.texelLengthS = (maxS - minS) / nrDivs;
	this.texelLengthT = (maxT - minT) / nrDivs;
	this.initBuffers();
};

Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.initBuffers = function() 
{
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	this.vertices = [];

	var yCoord = 0.5;
	var tCoord = this.minT;

	for (var j = 0; j <= this.nrDivs; j++) 
	{
		var xCoord = -0.5;
		var sCoord = this.minS;

		for (var i = 0; i <= this.nrDivs; i++) 
		{
			this.vertices.push(xCoord, yCoord, 0);
			this.normals.push(0, 0, 1);
			this.texCoords.push(sCoord, tCoord);

			xCoord += this.patchLength;
			sCoord += this.texelLengthS;
		}

		yCoord -= this.patchLength;
		tCoord += this.texelLengthT;
	}

	var ind = 0;

	for (var j = 0; j < this.nrDivs; j++) 
	{
		for (var i = 0; i <= this.nrDivs; i++) 
		{
			this.indices.push(ind);
			this.indices.push(ind + this.nrDivs + 1);

			ind++;
		}

		if (j + 1 < this.nrDivs) 
		{
			this.indices.push(ind + this.nrDivs);
			this.indices.push(ind);
		}
	}

	this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
	this.initGLBuffers();
};