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
	this.gl.enable(this.gl.BLEND);
	this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

	this.clockPaused = false;
	this.scenePaused = false;
	this.armAmplitude = Math.PI / 3;
	this.previousAmplitude = 0.0;
	this.previousScale = 0.0;
	this.robotScale = 1.0;
	this.drawBall = true;
	this.drawBoard = true;
	this.drawChairs = true;
	this.drawClock = true;
	this.drawColumns = true;
	this.drawLandscape = true;
	this.drawRobot = true;
	this.drawSlides = true;
	this.drawTables = true;
	this.updateInterval = 60;
	this.previousInterval = 60;

	this.backgroundLight = true;
	this.boardLight = true;
	this.slidesLight = true;
	this.windowLight = true;

	this.robotAppearanceList = {};
	this.robotAppearanceList["Android"] = 0;
	this.robotAppearanceList["R2-D2"] = 1;
	this.robotAppearanceList["Cyanogenmod"] = 2;
	this.robotAppearanceFiles = {};
	this.robotAppearanceFiles[0] = "../resources/images/robot_android.png";
	this.robotAppearanceFiles[1] = "../resources/images/robot_r2d2.png";
	this.robotAppearanceFiles[2] = "../resources/images/robot_cyanogen.png";
	this.currentRobot = 0;
	this.previousRobot = -1;
	this.followRobot = false;

	this.axis = new CGFaxis(this);
	this.ball = new MySphere(this, 16, 16);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25, 0.0, 1.0);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0.0, 1.0, 0.0, 1.0);
	this.chair = new MyChair(this);
	this.clock = new MyClock(this);
	this.cylinder = new MyCylinder(this, 32, 64);
	this.floor = new MyQuad(this, 0.0, 6.0, 0.0, 4.0);
	this.robot = new MyRobot(this);
	this.table = new MyTable(this);
	this.impostor = new MyCircle(this, 12, 0.0, 1.0, 0.0, 1.0);
	this.wallA = new MyImpostor(this);
	this.wallB = new MyQuad(this, 0.0, 2.0, 0.0, 2.0);
	this.materialDefault = new CGFappearance(this);

	this.ballAppearance = new CGFappearance(this);
	this.ballAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.ballAppearance.setDiffuse(0.8, 0.8, 0.8, 0.8);
	this.ballAppearance.setSpecular(0.2, 0.2, 0.2, 0.2);
	this.ballAppearance.loadTexture("../resources/images/soccer.png");
	this.ballAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.boardAppearance.setDiffuse(0.6, 0.6, 0.6, 0.6);
	this.boardAppearance.setSpecular(1.0, 1.0, 1.0, 0.8);
	this.boardAppearance.setShininess(60);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	this.columnAppearance = new CGFappearance(this);
	this.columnAppearance.setAmbient(0.4, 0.4, 0.4, 0.6);
	this.columnAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.columnAppearance.setSpecular(0.4, 0.4, 0.4, 0.6);
	this.columnAppearance.loadTexture("../resources/images/column.png");
	this.columnAppearance.setTextureWrap("REPEAT", "REPEAT");

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.4, 0.4, 0.4, 0.5);
	this.floorAppearance.setDiffuse(0.6, 0.6, 0.6, 0.5);
	this.floorAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.floorAppearance.setTextureWrap("REPEAT", "REPEAT");

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.slidesAppearance.setDiffuse(0.8, 0.8, 0.8, 0.8);
	this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 0.2);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	this.wallAppearance = new CGFappearance(this);
	this.wallAppearance.setAmbient(0.4, 0.4, 0.4, 0.6);
	this.wallAppearance.setDiffuse(0.8, 0.8, 0.8, 0.8);
	this.wallAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.wallAppearance.loadTexture("../resources/images/wall.png");
	this.wallAppearance.setTextureWrap("REPEAT", "REPEAT");

	this.landscapeAppearance = new CGFappearance(this);
	this.landscapeAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.landscapeAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.landscapeAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
	this.landscapeAppearance.loadTexture("../resources/images/bliss.png");
	this.landscapeAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

	this.setUpdatePeriod(1000.0 / this.updateInterval);
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

LightingScene.prototype.defaultView = function()
{
	this.camera.setPosition(vec3.fromValues(30, 30, 30));
	this.camera.setTarget(vec3.fromValues(0, 0, 0));
}

LightingScene.prototype.frontView = function()
{
	this.camera.setPosition(vec3.fromValues(7.5, 7.0, 25.0));
	this.camera.setTarget(vec3.fromValues(7.5, 2.0, 0.0));
}

LightingScene.prototype.topView = function()
{
	this.camera.setPosition(vec3.fromValues(7.5, 50.0, 15.0));
	this.camera.setTarget(vec3.fromValues(7.5, 0.0, 7.5));
}

LightingScene.prototype.initLights = function()
{
	this.setGlobalAmbientLight(0.0, 0.0, 0.0, 1.0);
	this.shader.bind();

	this.lights[0].setPosition(4.0, 4.5, 2.0, 1.0);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(1.0, 4.0, 7.5, 1.0);
	this.lights[3].setPosition(7.5, 6.0, 25.0, 1.0);

	// luz do projetor
	this.lights[0].setAmbient(0.1, 0.1, 0.1, 1.0);
	this.lights[0].setDiffuse(0.8, 0.8, 0.8, 1.0);
	this.lights[0].setSpecular(0.4, 0.4, 0.4, 0.2);
	this.lights[0].setLinearAttenuation(0.3);
	this.lights[0].enable();

	// luz do quadro
	this.lights[1].setAmbient(0.1, 0.1, 0.1, 1.0);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 0.8);
	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	// luz da janela
	this.lights[2].setAmbient(0.0, 0.0, 0.0, 1.0);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 0.2);
	this.lights[2].setConstantAttenuation(0.0);
	this.lights[2].setLinearAttenuation(0.4);
	this.lights[2].setQuadraticAttenuation(0.0);
	this.lights[2].enable();

	// luz de fundo
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
	if (this.currentRobot != this.previousRobot)
	{
		this.robot.setTexture(this.robotAppearanceFiles[this.currentRobot]);
		this.previousRobot = this.currentRobot;
	}

	if (this.armAmplitude != this.previousAmplitude)
	{
		this.robot.setAmplitude(this.armAmplitude);
		this.previousAmplitude = this.armAmplitude;
	}

	if (this.robotScale != this.previousScale)
	{
		this.robot.setScale(this.robotScale);
		this.previousScale = this.robotScale;
	}

	if (this.updateInterval != this.previousInterval)
	{
		this.previousInterval = this.updateInterval;
		this.setUpdatePeriod(1000 / this.updateInterval);
	}

	if (this.scenePaused)
	{
		return;
	}

	this.robot.update();

	if (this.followRobot)
	{
		this.camera.setPosition(this.robot.getPosition());
		this.camera.setTarget(this.robot.getDirection());
	}

	if (!this.clockPaused)
	{
		this.clock.update(currTime);
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

	if (this.backgroundLight)
	{
		this.lights[3].enable();
	}
	else
	{
		this.lights[3].disable();
	}
}

LightingScene.prototype.display = function()
{
	this.shader.bind();
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	this.updateProjectionMatrix();
	this.loadIdentity();
	this.applyViewMatrix();
	this.updateLights();
	this.axis.display();
	this.materialDefault.apply();

	// Floor
	this.pushMatrix();
	this.translate(7.5, 0.0, 7.5);
	this.rotate(Math.PI / 2, -1, 0, 0);
	this.scale(15.0, 15.0, 0.2);
	this.floorAppearance.apply();
	this.floor.display();
	this.popMatrix();

	if (this.drawLandscape)
	{
		// Landscape Impostor
		this.pushMatrix();
		this.translate(-9.0, 4.0, 7.5);
		this.rotate(Math.PI / 2, 0, 1, 0);
		this.scale(15.0, 8.0, 0.2);
		this.landscapeAppearance.apply();
		this.impostor.display();
		this.popMatrix();
	}

	// Plane Wall
	this.pushMatrix();
	this.translate(7.5, 4.0, 0.0);
	this.scale(15.0, 8.0, 0.2);
	this.wallAppearance.apply();
	this.wallB.display();
	this.popMatrix();

	if (this.drawBall)
	{
		// Soccer Ball
		this.pushMatrix();
		this.scale(0.6, 0.6, 0.6);
		this.translate(6.0, 7.3, 13.0);
		this.rotate(Math.PI / 2, -1, 0, 0);
		this.rotate(Math.PI / 6, 0, 0, -1);
		this.rotate(3 * Math.PI / 4, 0, -1, 0);
		this.ballAppearance.apply();
		this.ball.display();
		this.popMatrix();
	}

	if (this.drawChairs)
	{
		// Left Chair #1
		this.pushMatrix();
		this.translate(5.0, 0.0, 9.85);
		this.rotate(Math.PI, 0, 1, 0);
		this.chair.display();
		this.popMatrix();

		// Left Chair #2
		this.pushMatrix();
		this.translate(5.0, 0.0, 5.85);
		this.chair.display();
		this.popMatrix();

		// Right Chair
		this.pushMatrix();
		this.translate(12.5, 6.35, 8.0);
		this.rotate(Math.PI / 1.3, 1, 0, -1);
		this.chair.display();
		this.popMatrix();
	}

	if (this.drawTables)
	{
		// Left Table
		this.pushMatrix();
		this.translate(5.0, 0.0, 8.0);
		this.table.display();
		this.popMatrix();

		// Right Table
		this.pushMatrix();
		this.translate(12.0, 0.0, 8.0);
		this.table.display();
		this.popMatrix();
	}

	if (this.drawSlides)
	{
		// Slides Board
		this.pushMatrix();
		this.translate(4.0, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1.0);
		this.slidesAppearance.apply();
		this.boardA.display();
		this.popMatrix();
	}

	if (this.drawBoard)
	{
		// White Board
		this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1.0);
		this.boardAppearance.apply();
		this.boardB.display();
		this.popMatrix();
	}

	if (this.drawClock)
	{
		// Clock
		this.pushMatrix();
		this.translate(7.25, 7.25, 0.0);
		this.clock.display();
		this.popMatrix();
	}

	if (this.drawRobot)
	{
		// Robot
		this.pushMatrix();
		this.robot.display();
		this.popMatrix();
	}

	if (this.drawColumns)
	{
		// Left Column
		this.pushMatrix();
		this.scale(1.0, 8.0, 1.0);
		this.translate(2.5, 0.0, 12.5);
		this.columnAppearance.apply();
		this.cylinder.display();
		this.popMatrix();

		// Right Column
		this.pushMatrix();
		this.scale(1.0, 8.0, 1.0);
		this.translate(12.5, 0.0, 12.5);
		this.columnAppearance.apply();
		this.cylinder.display();
		this.popMatrix();
	}

	// Left Wall
	this.pushMatrix();
	this.wallA.display();
	this.popMatrix();
	this.shader.unbind();
};