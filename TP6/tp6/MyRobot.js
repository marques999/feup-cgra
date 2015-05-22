function MyRobot(scene)
{
	CGFobject.call(this, scene);

	this.robotX = 8.5;
	this.robotY = 0.0;
	this.robotZ = 8.0;
	this.robotAngle = 0.0;
	this.robotGreet = 0;
	this.robotIncrement = Math.PI / 12;
	this.robotJump = 0;
	this.robotScale = 1.0;
	this.robotSpeed = 0.2;

	this.leftArmAngle = 0;
	this.rightArmAngle = 0;
	this.leftWheelAngle = 0;
	this.rightWheelAngle = 0;

	this.armIncrement = Math.PI / 24;
	this.armAmplitude = Math.PI / 3;
	this.armMovement = 0;
	this.armRaiseAmplitude = Math.PI;
	this.armWaveAmplitude = Math.PI / 2;
	this.armWaveIncrement = Math.PI / 12;
	this.armWaveAngle = 0.0;

	this.robotAppearance = new CGFappearance(this.scene);
	this.robotAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.robotAppearance.setDiffuse(0.9, 0.9, 0.9, 1.0);
	this.robotAppearance.setSpecular(0.6, 0.6, 0.6, 1.0);
	this.robotAppearance.setShininess(60);

	this.greetAnimation = 
	{
		ARM_STOP : 0,
    	ARM_RAISE : 1,
   	 	ARM_WAVE : 4,
   	 	ARM_LOWER : 5,
	};

	this.jumpAnimation = 
	{
		JUMP_STOP : 0,
		JUMP_UP : 1,
		JUMP_DOWN : 2,
	};

	this.robotBody = new MyCylinder(this.scene, 24, 24, 0.0, 1.0, 0.5, 1.0);
	this.robotBody.initBuffers();
	this.robotHead = new MyLamp(this.scene, 24, 24, 0.0, 1.0, 0.0, 0.5);
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

MyRobot.prototype.setTexture = function(str)
{
	this.robotAppearance.loadTexture(str);
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
	if (this.robotGreet || this.robotJump)
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
	this.rotateLeftWheel(true);
	this.rotateRightWheel(true);
}

MyRobot.prototype.moveBackward = function()
{
	this.move(Math.sin(this.robotAngle), Math.cos(this.robotAngle));
	this.rotateLeftWheel(false);
	this.rotateRightWheel(false);
}

MyRobot.prototype.rotate = function(right)
{
	if (this.robotGreet || this.robotJump)
	{
		return;
	}
	
	if (right)
	{
		this.robotAngle -= this.robotIncrement;
		this.rotateLeftWheel(false);
		this.rotateRightWheel(true);
	}
	else
	{
		this.robotAngle += this.robotIncrement;
		this.rotateLeftWheel(true);
		this.rotateRightWheel(false);
	}
}

MyRobot.prototype.rotateLeftWheel = function(forward)
{
	if (forward)
	{
		this.leftWheelAngle -= this.robotIncrement;
	}
	else
	{
		this.leftWheelAngle += this.robotIncrement;
	}
}

MyRobot.prototype.rotateRightWheel = function(forward)
{
	if (forward)
	{
		this.rightWheelAngle += this.robotIncrement;
	}
	else
	{
		this.rightWheelAngle -= this.robotIncrement;
	}	
}

MyRobot.prototype.rotateLeft = function()
{
	this.rotate(false);
};

MyRobot.prototype.rotateRight = function()
{
	this.rotate(true);
}

MyRobot.prototype.update = function()
{
	this.robotScale = this.scene.scaleRobot;

	if (this.robotJump)
	{
		this.jumpAux();
	}

	if (this.robotGreet)
	{
		this.greet();
	}
};

MyRobot.prototype.jump = function()
{
	if (this.robotGreet)
	{
		return;
	}
	
	if (!this.robotJump)
	{
		this.leftArmAngle = 0.0;
		this.rightArmAngle = 0.0;
		this.robotJump = 1;
	}
}

MyRobot.prototype.jumpAux = function()
{
	if (this.robotJump == this.jumpAnimation.JUMP_UP)
	{
		if (this.robotY < 3.0)
		{	
			this.robotSpeed -= 0.005;
			this.robotY += this.robotSpeed;
			
			if (this.rightArmAngle < this.armRaiseAmplitude)
			{
				this.leftArmAngle -= this.armIncrement;
				this.rightArmAngle += this.armIncrement;
			}
		}
		else
		{
			this.robotSpeed = -this.robotSpeed;
			this.robotJump = this.jumpAnimation.JUMP_DOWN;
		}	 
	}
	else if (this.robotJump == this.jumpAnimation.JUMP_DOWN)
	{
		if (this.robotY > 0.0)
		{
			this.robotSpeed += 0.01;
			this.robotY -= this.robotSpeed;

			if (this.rightArmAngle > 0.0)
			{
				this.leftArmAngle += this.armIncrement;
				this.rightArmAngle -= this.armIncrement;
			}
		}
		else
		{
			this.robotJump = this.jumpAnimation.JUMP_STOP;
			this.leftArmAngle = 0.0;
			this.rightArmAngle = 0.0;
			this.robotY = 0.0;
			this.robotSpeed = 0.2
		}
	}
}

MyRobot.prototype.greet = function()
{
	if (this.robotGreet == this.greetAnimation.ARM_RAISE)
	{
		if (this.rightArmAngle <= this.armRaiseAmplitude)
		{
			this.rightArmAngle += this.robotIncrement;
		}
		else
		{
			this.robotGreet++;
		}
	}
	else if (this.robotGreet <= this.greetAnimation.ARM_WAVE)
	{
		if (this.armWaveAngle > this.armWaveAmplitude)
		{
			this.armWaveAngle = this.armWaveAmplitude;
			this.armWaveIncrement = -this.armWaveIncrement;
		} 
		else if (this.armWaveAngle < 0.0)
		{
			this.armWaveAngle = 0.0;
			this.armWaveIncrement = -this.armWaveIncrement;
			this.robotGreet++;
		}
		else
		{
			this.armWaveAngle += this.armWaveIncrement;
		}
	}
	else if (this.robotGreet == this.greetAnimation.ARM_LOWER)
	{
		if (this.rightArmAngle > 0.0)
		{
			this.rightArmAngle -= this.robotIncrement;
		}
		else
		{
			this.rightArmAngle = 0.0;
			this.armWaveAngle = 0.0;
			this.armWaveIncrement = Math.PI / 12;
			this.robotGreet = this.greetAnimation.ARM_STOP;
		}
	}
}

MyRobot.prototype.draw = function()
{
	// Robot Body
	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.25, 0.0);
	this.scene.scale(0.7, 1.25, 0.7);
	this.robotAppearance.apply();
	this.robotBody.display();
	this.scene.popMatrix();

	// Robot Head
	this.scene.pushMatrix();
	this.scene.translate(0.0, 1.5, 0.0);
	this.scene.scale(0.7, 0.6, 0.7);
	this.robotAppearance.apply();
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
	this.scene.rotate(this.armWaveAngle, 0, 0, 1);
	this.robotRightArm.display();
	this.scene.popMatrix();
}

MyRobot.prototype.display = function()
{
	this.scene.translate(this.robotX, this.robotY, this.robotZ);
	this.scene.rotate(this.robotAngle, 0, 1, 0);
	this.scene.scale(this.robotScale, this.robotScale, this.robotScale);
	this.draw();
};