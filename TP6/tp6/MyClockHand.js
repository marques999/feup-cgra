function MyClockHand(scene, size) 
{
	CGFobject.call(this, scene);

	this.angle = 0.0;
	this.size = size || 0.5;
	this.cylinder = new MyCylinder(this.scene, 4, 1);
	this.cylinder.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.display = function() 
{
	this.scene.pushMatrix();
	this.scene.rotate((90 - this.angle) * degToRad, 0, 0, 1);
	this.scene.rotate(Math.PI / 4, 0, 1, 0);
	this.scene.scale(0.015, this.size, 0.015);
	this.cylinder.display();
	this.scene.popMatrix();
};

MyClockHand.prototype.setAngle = function(a) 
{
	this.angle = a;
};

MyClockHand.prototype.incrementAngle = function(a)
{
	this.angle += a;
}