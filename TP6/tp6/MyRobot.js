function MyRobot(scene)
{
	CGFobject.call(this, scene);

	this.robotAngle = 0;
	this.robotIncrement = Math.PI / 12;
	this.robotX = 8.5;
	this.robotY = 0.0;
	this.robotZ = 8.0;
	this.robotScale = 1.0;
	this.robotGreet = 0;
	this.robotJump = 0;
	this.robotSpeed = 0.2;
	
	this.leftArmAngle = 0;
	this.rightArmAngle = 0;
	this.leftWheelAngle = 0;
	this.rightWheelAngle = 0;
	
	this.waveAngle = 0;
	this.waveIncrement = Math.PI / 12;
	this.armAmplitude = Math.PI / 3;
	this.armMovement = 0;

	this.robotAppearance = new CGFappearance(this.scene);
	this.robotAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.robotAppearance.setDiffuse(0.9, 0.4, 0.0, 1.0);
	this.robotAppearance.setSpecular(0.6, 0.6, 0.6, 1.0);
	this.robotAppearance.setShininess(60);

	this.bodyAppearance = new CGFappearance(this.scene);
	this.bodyAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.bodyAppearance.setDiffuse(0.9, 0.9, 0.9, 1.0);
	this.bodyAppearance.setSpecular(0.6, 0.6, 0.6, 1.0);
	this.bodyAppearance.setShininess(60);
	this.bodyAppearance.loadTexture("../resources/images/cyanogen_body.png");

	this.robotAnimation = 
	{
    	ARM_RAISE : 1,
   	 	ARM_WAVE : 4,
   	 	ARM_LOWER : 5
	}

	this.robotBody = new MyCylinder(this.scene, 24, 24);
	this.robotBody.initBuffers();
	this.robotHead = new MyHemisphere(this.scene, 24, 24);
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

MyRobot.prototype.loadTextures = function()
{
	if (this.reloadTextures)
	{
		this.bodyAppearance.loadTexture(this.scene.robotBodyTexture);
		this.reloadTextures = false;
	}
}

MyRobot.prototype.moveArms = function()
{
	if (!this.armMovement)
	{
		this.leftArmAngle -= this.robotIncrement;
		this.rightArmAngle -= this.robotIncrement;
		
		if (this.leftArmAngle <= -this.armAmplitude)
		{
			this.armMovement = !this.armMovement;
		}
	}
	else
	{
		this.leftArmAngle += this.robotIncrement;
		this.rightArmAngle += this.robotIncrement;
			
		if (this.leftArmAngle >= this.armAmplitude)
		{
			this.armMovement = !this.armMovement;
		}
	}
}

MyRobot.prototype.move = function(dx, dz)
{
	if (this.robotGreet)
	{
		return;
	}

	if (this.robotX + dx >= 0.5 && this.robotX + dx <= 15.0)
	{
		this.robotX += dx;
	}

	if (this.robotZ + dz >= 0.5 && this.robotZ + dz <= 15.0)
	{
		this.robotZ += dz;
	}

	this.moveArms();
}

MyRobot.prototype.moveForward = function()
{
	this.move(-Math.sin(this.robotAngle), -Math.cos(this.robotAngle));
}

MyRobot.prototype.moveBackward = function()
{
	this.move(Math.sin(this.robotAngle), Math.cos(this.robotAngle));
}

MyRobot.prototype.rotateLeft = function()
{
	if (this.robotGreet)
	{
		return;
	}
	
	this.robotAngle += this.robotIncrement;
	this.rightWheelAngle -= Math.PI / 24;
	this.leftWheelAngle += Math.PI / 24;
};

MyRobot.prototype.rotateRight = function()
{
	if (this.robotGreet)
	{
		return;
	}

	this.robotAngle -= this.robotIncrement;
	this.rightWheelAngle += Math.PI / 24;
	this.leftWheelAngle -= Math.PI / 24;
}

MyRobot.prototype.update = function()
{
	this.robotScale = this.scene.scaleRobot;

	if (this.robotJump)
	{
		this.jump();
	}

	if (this.robotGreet)
	{
		this.greet();
	}
};

MyRobot.prototype.jump = function()
{
	if (this.robotY >= 3.0)
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

MyRobot.prototype.greet = function()
{
	var maxRaiseAmplitude = Math.PI;
	var maxWaveAmplitude = Math.PI / 2;

	if (this.robotGreet == this.robotAnimation.ARM_RAISE)
	{
		if (this.rightArmAngle <= maxRaiseAmplitude)
		{
			this.rightArmAngle += this.robotIncrement;
		}
		else
		{
			this.robotGreet++;
		}
	}
	else if (this.robotGreet <= this.robotAnimation.ARM_WAVE)
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
	else if (this.robotGreet == this.robotAnimation.ARM_LOWER)
	{
		if (this.rightArmAngle > 0.0)
		{
			this.rightArmAngle -= this.robotIncrement;
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

MyRobot.prototype.draw = function()
{
	// Robot Body
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.25, 0.0);
	this.scene.scale(0.7, 1.25, 0.7);
	this.bodyAppearance.apply();
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
	this.scene.translate(-0.9, 0.4, 0.0);
	this.scene.scale(1.0, 0.4, 0.4);
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.scene.rotate(this.leftWheelAngle, 0, 0, 1);
	this.robotLeftWheel.display();
	this.scene.popMatrix();

	// Robot Right Wheel
	this.scene.pushMatrix();
	this.scene.translate(0.9, 0.4, 0.0);
	this.scene.scale(1.0, 0.4, 0.4);
	this.scene.rotate(Math.PI / 2, 0, -1, 0);
	this.scene.rotate(this.rightWheelAngle, 0, 0, 1);
	this.robotRightWheel.display();
	this.scene.popMatrix();

	// Robot Left Arm
	this.scene.pushMatrix();
	this.scene.translate(-0.75, 1.5, 0.0);
	this.scene.rotate(this.leftArmAngle, -1, 0, 0);
	this.robotLeftArm.display();
	this.scene.popMatrix();

	// Robot Right Arm
	this.scene.pushMatrix();
	this.scene.translate(0.75, 1.5, 0.0);
	this.scene.rotate(this.rightArmAngle, 1, 0, 0);
	this.scene.rotate(this.waveAngle, 0, 0, 1);
	this.robotRightArm.display();
	this.scene.popMatrix();
}

MyRobot.prototype.display = function()
{
	this.scene.translate(this.robotX, this.robotY, this.robotZ);
	this.scene.rotate(this.robotAngle, 0, 1, 0);
	this.scene.scale(this.robotScale, this.robotScale, this.robotScale);
	this.robotAppearance.apply();
	this.draw();
};