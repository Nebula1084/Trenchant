/* global M1 */
/* global Trenchant */
Trenchant.Material = function(){
    this.showSpecularHighlightsUniform = false;
    this.useLightingUniform = false;
    this.ambientColorUniform = new Trenchant.Vector3();
    this.pointLightingLocationUniform = new Trenchant.Vector3();
    this.pointLightingSpecularColorUniform = new Trenchant.Vector3();
    this.pointLightingDiffuseColorUniform = new Trenchant.Vector3();
    this.useTexturesUniform = "none";
    this.samplerUniform  = 0;
    this.materialShininessUniform = 0;
    this.reflectivityUniform = 0;
    this.alphaUniform = 1.0;
};

Trenchant.Material.prototype = {
    constructor : Trenchant.Material,
    setMat: function(shader){
        shader.samplerUniform = gl.getUniformLocation(shader, "uSampler");
        shader.mapCubeUniform = gl.getUniformLocation(shader, "mapCube");
        shader.materialShininessUniform = gl.getUniformLocation(shader, "uMaterialShininess");
        shader.reflectivityUniform = gl.getUniformLocation(shader, "uReflectivity");
        shader.showSpecularHighlightsUniform = gl.getUniformLocation(shader, "uShowSpecularHighlights");
        shader.useTexturesUniform = gl.getUniformLocation(shader, "uUseTextures");
        shader.useEnvUniform = gl.getUniformLocation(shader, "uUseEnv");
        shader.useLightingUniform = gl.getUniformLocation(shader, "uUseLighting");
        shader.ambientColorUniform = gl.getUniformLocation(shader, "uAmbientColor");
        shader.pointLightingLocationUniform = gl.getUniformLocation(shader, "uPointLightingLocation");
        shader.pointLightingSpecularColorUniform = gl.getUniformLocation(shader, "uPointLightingSpecularColor");
        shader.pointLightingDiffuseColorUniform = gl.getUniformLocation(shader, "uPointLightingDiffuseColor");
        shader.alphaUniform = gl.getUniformLocation(shader, "uAlapha");
        gl.uniform1i(shader.useTexturesUniform, this.texture != undefined);
        gl.uniform1i(shader.useEnvUniform, this.cubeTexture != undefined);
        if (this.alphaUniform<1.0){                        
            gl.enable(gl.BLEND);                 
            gl.enable(gl.DEPTH_TEST);
            gl.blendFunc(gl.SRC_ALPHA , gl.ONE_MINUS_SRC_ALPHA );                   
        } else {
            gl.disable(gl.BLEND);
            gl.enable(gl.DEPTH_TEST);
        }
        gl.uniform1i(shader.showSpecularHighlightsUniform, this.showSpecularHighlightsUniform);
        gl.uniform1i(shader.useLightingUniform, this.useLightingUniform);
        if (this.useLightingUniform) {
            gl.uniform3f(
                shader.ambientColorUniform,
                this.ambientColorUniform.x,
                this.ambientColorUniform.y,
                this.ambientColorUniform.z
            );
            
            gl.uniform3f(
                shader.pointLightingLocationUniform,
                this.pointLightingLocationUniform.x,
                this.pointLightingLocationUniform.y,
                this.pointLightingLocationUniform.z
            );
            
            gl.uniform3f(
                shader.pointLightingSpecularColorUniform,
                this.pointLightingSpecularColorUniform.x,
                this.pointLightingSpecularColorUniform.y,
                this.pointLightingSpecularColorUniform.z
            );
            
            gl.uniform3f(
                shader.pointLightingDiffuseColorUniform,
                this.pointLightingDiffuseColorUniform.x,
                this.pointLightingDiffuseColorUniform.y,
                this.pointLightingDiffuseColorUniform.z
            );
            
            gl.uniform1f(
                shader.alphaUniform,
                this.alphaUniform
            );                        
            gl.uniform1i(shader.samplerUniform, 0);
            gl.uniform1i(shader.mapCubeUniform, 1);
            if (this.texture != undefined){
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                
            }
            if (this.cubeTexture != undefined){
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.cubeTexture);
                
            }
                        
            gl.uniform1f(shader.materialShininessUniform, this.materialShininessUniform);
            gl.uniform1f(shader.reflectivityUniform, this.reflectivityUniform);            
        }
    },
    setTexture: function(src){
        function handleLoadedTexture(texture) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);

            gl.bindTexture(gl.TEXTURE_2D, null);
        }
        
        var texture = gl.createTexture();
        texture.image = new Image();
        
        texture.image.onload = function(){
            handleLoadedTexture(texture);
        }
        texture.image.src = src;
        this.texture=texture;
    },
    setEnvTexture: function(cube){
        var targets = [gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];
        function handleLoadedTexture(texture) {
            texture.count--;
            if (texture.count == 0){
                gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
 
                for (var i = 0; i < targets.length; i++) {
                    gl.texImage2D(targets[i], 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.cube[i]);
                }
            }
        }
        var texture = gl.createTexture();
        texture.cube = [];
        texture.count = 6;
        for (var i = 0; i < 6; i++){
            texture.cube[i] = new Image();
            texture.cube[i].onload = function(){
                handleLoadedTexture(texture);
            }
            texture.cube[i].src = cube[i];
        }
        this.cubeTexture = texture;
    }
};