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
        
        this.material.setMat(this.shaderProgram);

        gl.useProgram(this.shaderProgram);

        this.shaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

        this.shaderProgram.vertexNormalAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);

        this.shaderProgram.textureCoordAttribute = gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);

        this.shaderProgram.pMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uPMatrix");
        this.shaderProgram.mvMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
        this.shaderProgram.nMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uNMatrix");
        this.shaderProgram.samplerUniform = gl.getUniformLocation(this.shaderProgram, "uSampler");
        this.shaderProgram.materialShininessUniform = gl.getUniformLocation(this.shaderProgram, "uMaterialShininess");
        this.shaderProgram.showSpecularHighlightsUniform = gl.getUniformLocation(this.shaderProgram, "uShowSpecularHighlights");
        this.shaderProgram.useTexturesUniform = gl.getUniformLocation(this.shaderProgram, "uUseTextures");
        this.shaderProgram.useLightingUniform = gl.getUniformLocation(this.shaderProgram, "uUseLighting");
        this.shaderProgram.ambientColorUniform = gl.getUniformLocation(this.shaderProgram, "uAmbientColor");
        this.shaderProgram.pointLightingLocationUniform = gl.getUniformLocation(this.shaderProgram, "uPointLightingLocation");
        this.shaderProgram.pointLightingSpecularColorUniform = gl.getUniformLocation(this.shaderProgram, "uPointLightingSpecularColor");
        this.shaderProgram.pointLightingDiffuseColorUniform = gl.getUniformLocation(this.shaderProgram, "uPointLightingDiffuseColor");

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