function MyRobot(scene)
{
	CGFobject.call(this, scene);

	this.robotAngle = -5 * Math.PI / 6;
	this.robotX = 9.0;
	this.robotY = 0.0;
	this.robotZ = 8.0;

	this.robotAppearance = new CGFappearance(this.scene);
	this.robotAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.robotAppearance.setDiffuse(0.9, 0.4, 0.0, 1.0);
	this.robotAppearance.setSpecular(0.6, 0.6, 0.6, 1.0);
	this.robotAppearance.setShininess(60);
	
	this.initBuffers();
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor = MyRobot;

MyRobot.prototype.initBuffers = function()
{
	this.vertices = 
	[
		0.5, 0.3, 0.0,
		-0.5, 0.3, 0.0,
		0.0, 0.3, 2.0
	];
	
	this.indices = 
	[ 
		0, 1, 2,
		1, 0, 2
	];
	
	this.normals = 
	[ 
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
	];

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyRobot.prototype.move = function(p)
{
	if (p)
	{
		if (this.robotX <= 12.5)
		{
			this.robotX += Math.sin(this.robotAngle);
		}

		if (this.robotZ <= 12.5)
		{
			this.robotZ += Math.cos(this.robotAngle);
		}
	}
	else
	{
		if (this.robotX >= 0.5)
		{
			this.robotX -= Math.sin(this.robotAngle);
		}

		if (this.robotZ >= 0.5)
		{
			this.robotZ -= Math.cos(this.robotAngle);
		}
	}
};

MyRobot.prototype.rotate = function(a)
{
	this.robotAngle += a;
};

MyRobot.prototype.draw = function()
{
	this.scene.translate(this.robotX, this.robotY, this.robotZ);
	this.scene.rotate(this.robotAngle, 0, 1, 0);
	this.robotAppearance.apply();
};