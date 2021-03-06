/* global gl */
/* global Trenchant */
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
        gl.useProgram(this.shaderProgram);

        this.material.setMat(this.shaderProgram);
        this.animation.animate(this.shaderProgram);
        
        this.shaderProgram.eyeUniform = gl.getUniformLocation(this.shaderProgram, "uEye");
        gl.uniform3f(
            this.shaderProgram.eyeUniform,
            Trenchant.eyePos[0],
            Trenchant.eyePos[1],
            Trenchant.eyePos[2]
        );

        this.shaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

        this.shaderProgram.vertexNormalAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);

        this.shaderProgram.textureCoordAttribute = gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);        

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
        gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, this.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        //console.log(this.name + " " + this.vertexNormalBuffer.numItems);
        gl.drawArrays(gl.TRIANGLES, 0, this.vertexNormalBuffer.numItems); 
	},
	drawShadow: function() {
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(_positionShadow, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

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
        if (this.drawSequence==undefined){
            for (var key in this.obj_dict){
                this.obj_dict[key].draw();
            }
        } else {
            for (var key in this.drawSequence){
                this.obj_dict[this.drawSequence[key]].draw();
            }   
        }        
	},
	drawShadow: function() {
		if (this.drawSequence==undefined){
            for (var key in this.obj_dict){
                this.obj_dict[key].drawShadow();
            }
        } else {
            for (var key in this.drawSequence){
                this.obj_dict[this.drawSequence[key]].drawShadow();
            }   
        }    
	}
};

Trenchant.Part = function(geometry){
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
	
	this.vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(geometry.indices), gl.STATIC_DRAW);
    this.vertexIndexBuffer.itemSize = 1;
    this.vertexIndexBuffer.numItems = geometry.indices.length;
};

Trenchant.Part.prototype = {
	constructor: Trenchant.Object,
	draw: function(){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
        gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, this.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
                
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);  		      
        gl.drawElements(gl.TRIANGLES, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	}
};