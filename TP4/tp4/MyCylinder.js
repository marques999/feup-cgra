function MyCylinder(scene, slices, stacks) {

    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function () {

    this.vertices = [];
    this.normals = [];

    var theta = 0;
    var thetaIncrement = (2 * Math.PI) / this.slices;
    var stackIncrement = 1.0 / this.stacks;

    for (var i = 0; i <= this.slices; i++) {

        var x = Math.cos(theta);
        var y = Math.sin(theta);
        var z = 0;

        for (var j = 0; j <= this.stacks; j++) {

            this.vertices.push(x, y, z);
            this.normals.push(x, y, 0);

            z += stackIncrement;
        }

        theta += thetaIncrement;
    }

    this.indices = [];

    var vertexNumber = 1;

    for (var i = 0; i < this.slices; i++) {

        for (var j = 0; j < this.stacks; j++) {

            this.indices.push(vertexNumber, vertexNumber + this.stacks, vertexNumber + this.stacks + 1);
            this.indices.push(vertexNumber + this.stacks, vertexNumber, vertexNumber - 1);
            this.indices.push(vertexNumber + this.stacks + 1, vertexNumber + this.stacks, vertexNumber);
            this.indices.push(vertexNumber, vertexNumber + this.stacks, vertexNumber - 1);

            vertexNumber++;
        }

        vertexNumber++;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};