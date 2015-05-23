function MyAirplane(scene)
{
	CGFobject.call(this, scene);

	this.airplaneAnimation =
	{
		AIRPLANE_FLYING: 0,
		AIRPLANE_CRASH: 1,
		AIRPLANE_FALLING: 2
	};

	this.initBuffers();
	this.reset();
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

MyAirplane.prototype.draw = function()
{
	this.scene.translate(-1.5, 0.0, 0.0);
	this.scene.scale(0.5, 0.5, 0.5);
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.scene.translate(-15.0, this.currentY, this.currentZ);
	this.scene.rotate(this.currentAngle, 1, 0, 0);
};

MyAirplane.prototype.reset = function()
{
	this.currentFrame = 0;
	this.numberFrames = 70;
	this.animationSection = 0;
	this.currentX = -16.0;
	this.currentY = 11.0;
	this.currentZ = 24.0;
	this.currentAngle = 0.0;
};

MyAirplane.prototype.update = function()
{
	this.currentFrame++;

	if (this.currentFrame >= this.numberFrames && this.animationSection < 3)
	{
		this.animationSection++;
		this.currentFrame = 0;
	}

	if (this.animationSection == this.airplaneAnimation.AIRPLANE_FLYING)
	{
		this.currentZ -= 21 / this.numberFrames;
		this.currentAngle += Math.PI / 12 / this.numberFrames;
	}
	else if (this.animationSection == this.airplaneAnimation.AIRPLANE_CRASH)
	{
		this.currentY -= 10.5 / this.numberFrames;

		if (this.currentAngle > -Math.PI / 2)
		{
			this.currentAngle -= Math.PI / 12;
		}
	}
	else if (this.animationSection == this.airplaneAnimation.AIRPLANE_FALLING)
	{
		this.currentZ = 6.5;
		this.currentAngle = Math.PI;
	}
	else
	{
		this.reset();
	}
};