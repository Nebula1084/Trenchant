/* global Trenchant */
Trenchant = function(){
};

Trenchant.Object = function(object){
	var geometry = object.geometry;
        
	this.vertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.normals), gl.STATIC_DRAW);
	this.vertexNormalBuffer.itemSize = 3;
	this.vertexNormalBuffer.numItems = geometry.normals.length / 3;

	this.vertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.uvs), gl.STATIC_DRAW);
	this.vertexTextureCoordBuffer.itemSize = 2;
	this.vertexTextureCoordBuffer.numItems = geometry.uvs.length / 2;

	this.vertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.vertices), gl.STATIC_DRAW);
	this.vertexPositionBuffer.itemSize = 3;
	this.vertexPositionBuffer.numItems = geometry.vertices.length / 3;       
};

Trenchant.Object.prototype = {
	constructor: Trenchant.Object,
	draw: function(){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
        gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, this.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
                
        gl.drawArrays(gl.TRIANGLES, 0, this.vertexNormalBuffer.numItems); 
	}
};


Trenchant.Object3D = function(objects){
	this.obj_dict = [];
	for (var i = 0, l = objects.length; i < l; i ++){
		if (objects[i].name == "") continue;
		this.obj_dict[objects[i].name]=new Trenchant.Object(objects[i]);
	}
};

Trenchant.Object3D.prototype = {
	constructor: Trenchant.Object3D,
	draw: function(){
		for (var key in this.obj_dict){
			this.obj_dict[key].draw();
		}
	}
};