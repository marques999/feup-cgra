/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) 
 {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() 
 {
	this.vertices = [];

	var ang = 0;
	var angIncrement = (2 * Math.PI) / this.slices;

	for (var i = 0; i < this.slices; i++) 
	{
		var x0 = Math.cos(ang);
		var y0 = Math.sin(ang);

		this.vertices.push(x0, y0, 0);
		this.vertices.push(x0, y0, 1);

		ang += angIncrement;
	}

	this.indices = [];

	var vertexNumber = 1;

	for (var i = 0; i < this.slices; i++)
	{
	    if (i < this.slices - 1)
	    {
	        this.indices.push(vertexNumber, vertexNumber + 1, vertexNumber + 2);
	        this.indices.push(vertexNumber + 1, vertexNumber, vertexNumber - 1);
	    }
	    else
	    {
	        this.indices.push(vertexNumber, 0, 1);
	        this.indices.push(0, vertexNumber, vertexNumber - 1);
	    }

		vertexNumber += 2;
	}

    ang = 0;

	this.normals = [];
	
	for (var j = 0; j < this.slices; j++) 
	{
		var x0 = Math.cos(ang);
		var y0 = Math.sin(ang);

		this.normals.push(x0, y0, 0);
		this.normals.push(x0, y0, 0);
		
		ang += angIncrement;
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };