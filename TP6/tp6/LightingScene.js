var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;
var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() 
{
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) 
{
	CGFscene.prototype.init.call(this, application);

	this.enableTextures(true);
	this.initCameras();
	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.numberFrames = 70;
	this.animationSection = 0;
	this.currentFrame = 0;
	this.currentY = 9.0;
	this.currentZ = 24.0;
	this.currentAngle = 0
	
	this.clockPaused = false; 
	this.scenePaused = false;
	this.drawClock = true;
	this.drawTables = true;
	this.drawPillars = true;
	this.drawSlides = true;
	this.drawBoard = true;
	this.updateInterval = 60;
	this.previousInterval = 60;
	this.slidesLight = true;
	this.boardLight = true;
	this.windowLight = true;
	this.pillarLight = true;
    
	this.axis = new CGFaxis(this);
	this.airplane = new MyAirplane(this);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25, 0.0, 1.0);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0.0, 1.0, 0.0, 1.0);
	this.floor = new MyQuad(this, 0.0, 10.0, 0, 12.0);
	this.table = new MyTable(this);
	this.wallA = new MyQuad(this, -1.0, 2.0, -0.5, 1.5);
	this.wallB = new MyQuad(this, 0.0, 2.0, 0.0, 2.0);
	this.materialDefault = new CGFappearance(this);
	this.clock = new MyClock(this);
	this.robot = new MyRobot(this);
	this.cylinder = new MyCylinder(this, 32, 64);

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.slidesAppearance.setDiffuse(0.8, 0.8, 0.8, 0.8);
	this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 0.2);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.boardAppearance.setDiffuse(0.6, 0.6, 0.6, 0.6);
	this.boardAppearance.setSpecular(1.0, 1.0, 1.0, 0.8);
	this.boardAppearance.setShininess(60);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.floorAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.floorAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.floorAppearance.setTextureWrap("REPEAT", "REPEAT");

	this.pillarAppearance = new CGFappearance(this);
	this.pillarAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.pillarAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.pillarAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.pillarAppearance.loadTexture("../resources/images/granite.png");
	this.pillarAppearance.setTextureWrap("REPEAT", "REPEAT");

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.windowAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.windowAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	this.wallAppearance = new CGFappearance(this);
	this.wallAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.wallAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.wallAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.wallAppearance.loadTexture("../resources/images/camo.png");
	this.wallAppearance.setTextureWrap("REPEAT", "REPEAT");

	this.setUpdatePeriod(1000 / this.updateInterval);
};

LightingScene.prototype.pauseClock = function()
{
	this.clockPaused = !this.clockPaused;
};

LightingScene.prototype.pauseScene = function()
{
	this.scenePaused = !this.scenePaused;
};

LightingScene.prototype.initCameras = function() 
{
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() 
{
	this.setGlobalAmbientLight(0.0, 0.0, 0.0, 1.0);
	this.shader.bind();

	this.lights[0].setPosition(4.0, 4.5, 2.0, 1.0);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(1.0, 4.0, 7.5, 1.0);
	this.lights[3].setPosition(7.5, 6.0, 25.0, 1.0);

	this.lights[0].setAmbient(0.0, 0.0, 0.0, 1.0);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 0.8);
	this.lights[0].setSpecular(0.4, 0.4, 0.4, 0.2);
	this.lights[0].enable();

	this.lights[1].setAmbient(0.0, 0.0, 0.0, 1.0);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0.0, 0.0, 0.0, 1.0);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 0.2);
	this.lights[2].setConstantAttenuation(0.0);
	this.lights[2].setLinearAttenuation(0.8);
	this.lights[2].setQuadraticAttenuation(0.0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0.0, 0.0, 0.0, 1.0);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 1.0, 0.2);
	this.lights[3].setConstantAttenuation(0.0);
	this.lights[3].setLinearAttenuation(0.2);
	this.lights[3].setQuadraticAttenuation(0.0);
	this.lights[3].enable();

	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() 
{
	for (i = 0; i < this.lights.length; i++) 
	{
		this.lights[i].update();
	}
}

LightingScene.prototype.update = function(currTime)
{
	if (this.scenePaused)
	{
		return;
	}

	if (this.updateInterval != this.previousInterval)
	{
		this.previousInterval = this.updateInterval;
		this.setUpdatePeriod(1000 / this.updateInterval);
	}

	if (this.slidesLight)
	{
		this.lights[0].enable();
	}
	else
	{
		this.lights[0].disable();
	}

	if (this.boardLight)
	{
		this.lights[1].enable();
	}
	else
	{
		this.lights[1].disable();
	}

	if (this.windowLight)
	{
		this.lights[2].enable();
	}
	else
	{
		this.lights[2].disable();
	}

	if (this.pillarLight)
	{
		this.lights[3].enable();
	}
	else
	{
		this.lights[3].disable();
	}
	
	if (!this.clockPaused)
	{
		this.clock.update(currTime);
	}
	
	this.currentFrame++;

	if (this.currentFrame >= this.numberFrames && this.animationSection < 2)
	{
		this.animationSection++;
		this.currentFrame = 0;
	}

	switch (this.animationSection)
	{
		case 0:
			this.currentZ -= 21 / this.numberFrames;
			this.currentAngle += Math.PI / 12 / this.numberFrames;
			break;		
		case 1:
			this.currentY -= 8.5 / this.numberFrames;
			if (this.currentAngle > -Math.PI / 2)
				this.currentAngle -= Math.PI / 12;
			break;
		default:
			this.currentZ = 6.5;
			this.currentAngle = Math.PI;
			break;
	}
}

LightingScene.prototype.display = function() 
{
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	this.updateProjectionMatrix();
	this.loadIdentity();
	this.applyViewMatrix();
	this.updateLights();
	this.axis.display();
	this.materialDefault.apply();

	// ---- END Background, camera and axis setup
	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
	this.translate(7.5, 0, 7.5);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(15, 15, 0.2);
	this.floorAppearance.apply();
	this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
	this.translate(0, 4, 7.5);
	this.rotate(90 * degToRad, 0, 1, 0);
	this.scale(15, 8, 0.2);
	this.windowAppearance.apply();
	this.wallA.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
	this.translate(7.5, 4, 0);
	this.scale(15, 8, 0.2);
	this.wallAppearance.apply();
	this.wallB.display();
	this.popMatrix();

	if (this.drawTables)
	{
		// First Table
		this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
		this.popMatrix();
	}

	if (this.drawSlides)
	{
		// Board A
		this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
		this.popMatrix();
	}

	if (this.drawBoard)
	{
		// Board B
		this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
		this.popMatrix();
	}
	
	if (this.drawClock)
	{
		// Clock
		this.pushMatrix();
		this.translate(7.25, 7.25, 0);
		this.clock.display();
		this.popMatrix();
	}

	// Airplane
	this.pushMatrix();
	this.translate(-1.5,0,0);
	this.scale(0.5, 0.5, 0.5);
	this.rotate(Math.PI/2, 0, 1, 0);
	this.translate(-15.0, this.currentY, this.currentZ);
	this.rotate(this.currentAngle, 1, 0, 0);
	this.airplane.display();
	this.popMatrix();
	
	// Robot
	this.pushMatrix();
	this.robot.draw();
	this.robot.display();
	this.popMatrix();
	
	if (this.drawPillars)
	{
		// Left Pillar
		this.pushMatrix();
		this.scale(1, 8, 1);
		this.translate(2.5, 0, 12.5);
		this.pillarAppearance.apply();
		this.cylinder.display();
		this.popMatrix();

		// Right Pillar
		this.pushMatrix();
		this.scale(1, 8, 1);
		this.translate(12.5, 0, 12.5);
		this.pillarAppearance.apply();
		this.cylinder.display();
		this.popMatrix();
	}

	this.shader.unbind();
};