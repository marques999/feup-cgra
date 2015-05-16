function MyRobot(scene)
{
	CGFobject.call(this, scene);

	this.robotAngle = -5 * Math.PI / 6;
	this.robotX = 9.0;
	this.robotY = 0.0;
	this.robotZ = 8.0;
	this.robotScale = 1.0;
	this.robotWave = 0;
	this.robotGreet = 0;
	this.robotJump = 0;
	this.robotSpeed = 0.2;
	
	this.leftArmAngle = 0;
	this.rightArmAngle = 0;
	this.waveAngle = 0;
	this.waveIncrement = Math.PI / 12;
	this.armAmplitude = Math.PI / 3;
	this.armIncrement = Math.PI / 12;
	this.armMovement = 0;

	this.robotAppearance = new CGFappearance(this.scene);
	this.robotAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.robotAppearance.setDiffuse(0.9, 0.4, 0.0, 1.0);
	this.robotAppearance.setSpecular(0.6, 0.6, 0.6, 1.0);
	this.robotAppearance.setShininess(60);

	this.robotBody = new MyCylinder(this.scene, 16, 16);
	this.robotBody.initBuffers();
	this.robotHead = new MyHemisphere(this.scene, 16, 16);
	this.robotHead.initBuffers();
	this.robotLeftArm = new MyRobotArm(this.scene);
	this.robotLeftArm.initBuffers();
	this.robotRightArm = new MyRobotArm(this.scene);
	this.robotRightArm.initBuffers();
	this.robotLeftWheel = new MyRobotWheel(this.scene);
	this.robotLeftWheel.initBuffers();
	this.robotRightWheel = new MyRobotWheel(this.scene);
	this.robotRightWheel.initBuffers();
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor = MyRobot;

MyRobot.prototype.moveArms = function()
{
	if (!this.armMovement)
	{
		this.leftArmAngle -= this.armIncrement;
		this.rightArmAngle -= this.armIncrement;
		
		if (this.leftArmAngle <= -this.armAmplitude)
		{
			this.armMovement = !this.armMovement;
		}
	}
	else
	{
		this.leftArmAngle += this.armIncrement;
		this.rightArmAngle += this.armIncrement;
			
		if (this.leftArmAngle >= this.armAmplitude)
		{
			this.armMovement = !this.armMovement;
		}
	}
}

MyRobot.prototype.move = function(p)
{
	var deltaX = Math.sin(this.robotAngle); 
	var deltaZ = Math.cos(this.robotAngle);
	
	if (p)
	{
		if (this.robotX + deltaX >= 1.0 && this.robotX + deltaX <= 14.0)
		{
			this.robotX += deltaX;
		}

		if (this.robotZ + deltaZ >= 1.0 && this.robotZ + deltaZ <= 14.0)
		{
			this.robotZ += deltaZ;
		}
	}
	else
	{
		if (this.robotX - deltaX >= 0.0 && this.robotX - deltaX <= 15.0)
		{
			this.robotX -= deltaX;
		}

		if (this.robotZ - deltaZ >= 0.0 && this.robotZ - deltaZ <= 15.0)
		{
			this.robotZ -= deltaZ;
		}
	}
	
	this.moveArms();
};

MyRobot.prototype.update = function()
{
	this.robotScale = this.scene.scaleRobot;

	if (this.robotJump)
	{
		if  (this.robotY >= 3.0)
		{
			this.robotSpeed = -0.2;
			this.robotY = 3.0;
		} 
		else if (this.robotY < 0.0)
		{
			this.robotSpeed = 0.2;
			this.robotY = 0.0;
			this.robotJump = 0;
		}
		else
		{
			this.robotSpeed -= 0.01;
			this.robotY += this.robotSpeed;
		}
	}

	if (this.robotGreet)
	{
		this.wave();
	}
};

MyRobot.prototype.wave = function()
{
	var maxRaiseAmplitude = Math.PI;
	var maxWaveAmplitude = Math.PI / 2;

	if (this.robotGreet == 1)
	{
		if (this.rightArmAngle <= maxRaiseAmplitude)
		{
			this.rightArmAngle += this.armIncrement;
		}
		else
		{
			this.robotGreet++;
		}
	}
	else if (this.robotGreet <= 4)
	{
		if (this.waveAngle > maxWaveAmplitude)
		{
			this.waveAngle = maxWaveAmplitude;
			this.waveIncrement = -this.waveIncrement;
		} 
		else if (this.waveAngle < 0.0)
		{
			this.waveAngle = 0.0;
			this.waveIncrement = -this.waveIncrement;
			this.robotGreet++;
		}
		else
		{
			this.waveAngle += this.waveIncrement;
		}
	}
	else if (this.robotGreet == 5)
	{
		if (this.rightArmAngle > 0.0)
		{
			this.rightArmAngle -= this.armIncrement;
		}
		else
		{
			this.robotGreet = 0;
		}
	}
	else
	{
		this.waveAngle = 0.0;
		this.waveIncrement = Math.PI / 12;
		this.rightArmAngle = 0.0;
		this.robotGreet = 0;
	}
}

MyRobot.prototype.greet = function()
{
	this.robotGreet = 1;
}

MyRobot.prototype.reset = function()
{
}

MyRobot.prototype.rotate = function(a)
{
	this.robotAngle += a;
	this.moveArms();
};

MyRobot.prototype.draw = function()
{
	// Robot Body
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.25, 0.0);
	this.scene.scale(0.7, 1.25, 0.7);
	this.robotBody.display();
	this.scene.popMatrix();

	// Robot Head
	this.scene.pushMatrix();
	this.scene.translate(0.0, 1.5, 0.0);
	this.scene.scale(0.7, 0.6, 0.7);
	this.robotHead.display(),
	this.scene.popMatrix();

	// Robot Left Wheel
	this.scene.pushMatrix();
	this.scene.translate(0.7, 0.4, 0.0);
	this.scene.scale(1.0, 0.4, 0.4);
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.scene.rotate(this.robotAngle, 0, 0, 1);
	this.robotLeftWheel.display();
	this.scene.popMatrix();

	// Robot Right Wheel
	this.scene.pushMatrix();
	this.scene.translate(-0.7, 0.4, 0.0);
	this.scene.scale(1.0, 0.4, 0.4);
	this.scene.rotate(Math.PI / 2, 0, -1, 0);
	this.scene.rotate(-this.robotAngle, 0, 0, 1);
	this.robotRightWheel.display();
	this.scene.popMatrix();

	// Robot Left Arm
	this.scene.pushMatrix();
	this.scene.translate(0.7, 1.5, 0.0);
	this.scene.rotate(this.leftArmAngle, 1, 0, 0);
	this.robotLeftArm.display();
	this.scene.popMatrix();

	// Robot Right Arm
	this.scene.pushMatrix();
	this.scene.translate(-0.7, 1.5, 0.0);
	this.scene.rotate(this.rightArmAngle, -1, 0, 0);
	this.scene.rotate(this.waveAngle, 0, 0, -1);
	this.robotRightArm.display();
	this.scene.popMatrix();
}

MyRobot.prototype.jump = function()
{
	this.robotJump = 1;
}

MyRobot.prototype.display = function()
{
	this.scene.translate(this.robotX, this.robotY, this.robotZ);
	this.scene.rotate(this.robotAngle, 0, 1, 0);
	this.scene.scale(this.robotScale, this.robotScale, this.robotScale);
	this.robotAppearance.apply();
	this.draw();
};