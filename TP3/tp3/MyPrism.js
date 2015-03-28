function MyPrism(scene, slices, stacks) {

    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
};

MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.initBuffers = function () {

    this.vertices = [];

    var ang = 0;
    var angIncrement = (2 * Math.PI) / this.slices;
    var stackIncrement = 1.0 / this.stacks;

    this.normals = [];

    for (var i = 0; i < this.slices; i++) {

        var x0 = Math.cos(ang);
        var y0 = Math.sin(ang);
        var xn = Math.cos(ang + angIncrement / 2);
        var yn = Math.sin(ang + angIncrement / 2);
        var x1 = Math.cos(ang + angIncrement);
        var y1 = Math.sin(ang + angIncrement);
        var z = 0;

        for (var j = 0; j <= this.stacks; j++) {

            this.vertices.push(x0, y0, z);
            this.vertices.push(x1, y1, z);
            this.normals.push(xn, yn, 0);
            this.normals.push(xn, yn, 0);

            z += stackIncrement;
        }

        ang += angIncrement;
    }

    this.indices = [];

    var vertexNumber = 2;

    for (var i = 0; i < this.slices; i++) {

        for (var j = 0; j < this.stacks; j++) {

            this.indices.push(vertexNumber, vertexNumber - 1, vertexNumber + 1);
            this.indices.push(vertexNumber - 1, vertexNumber, vertexNumber - 2);
            this.indices.push(vertexNumber + 1, vertexNumber - 1, vertexNumber);
            this.indices.push(vertexNumber, vertexNumber - 1, vertexNumber - 2);

            vertexNumber += 2;
        }

        vertexNumber += 2;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};