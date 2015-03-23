/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks)
{
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function ()
{
    this.vertices = [];

    var ang = 0;
    var angIncrement = (2 * Math.PI) / this.slices;
    var stackIncrement = 1.0 / this.stacks;

	for (var i = 0; i < this.slices; i++) 
	{
		var x0 = Math.cos(ang);
		var y0 = Math.sin(ang);
		var x1 = Math.cos(ang + angIncrement);
		var y1 = Math.sin(ang + angIncrement);
		
		var z = 0;

		for (var j = 0; j < this.stacks; j++)
		{
			this.vertices.push(x0, y0, z);
			this.vertices.push(x0, y0, z + stackIncrement);
			this.vertices.push(x1, y1, z);
			this.vertices.push(x1, y1, z + stackIncrement);

			z += stackIncrement;
		}

		ang += angIncrement;
	}

    this.indices = [];

    var vertexNumber = 1;

    for (var i = 0; i < this.slices; i++) 
	{
		for (var j = 0; j < this.stacks; j++)
		{
			this.indices.push(vertexNumber, vertexNumber + 1, vertexNumber + 2);
			this.indices.push(vertexNumber + 1, vertexNumber, vertexNumber - 1);		

			vertexNumber += 4;	
		}		
	}

    ang = 0;

    this.normals = [];

    for (var j = 0; j < this.slices; j++)
    {
        var x0 = Math.cos(ang);
        var y0 = Math.sin(ang);
        var x1 = Math.cos(ang + angIncrement);
        var y1 = Math.sin(ang + angIncrement);

        for (var k = 0; k < this.stacks; k++)
        {
            this.normals.push(x0, y0, 0);
            this.normals.push(x0, y0, 0);
            this.normals.push(x1, y1, 0);
            this.normals.push(x1, y1, 0);
        }

        ang += angIncrement;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};