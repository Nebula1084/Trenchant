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
    this.alphaUniform = 1.0;
};

Trenchant.Material.prototype = {
    constructor : Trenchant.Material,
    setMat: function(shader){
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
            
            gl.uniform1i(shader.useTexturesUniform, this.texture != undefined);
            
            gl.activeTexture(gl.TEXTURE0);
            if (this.texture != undefined){
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
            }
            
            gl.uniform1i(shader.samplerUniform, this.samplerUniform);
            gl.uniform1f(shader.materialShininessUniform, this.materialShininessUniform);
            
            shader.samplerUniform = gl.getUniformLocation(shader, "uSampler");
            shader.materialShininessUniform = gl.getUniformLocation(shader, "uMaterialShininess");
            shader.showSpecularHighlightsUniform = gl.getUniformLocation(shader, "uShowSpecularHighlights");
            shader.useTexturesUniform = gl.getUniformLocation(shader, "uUseTextures");
            shader.useLightingUniform = gl.getUniformLocation(shader, "uUseLighting");
            shader.ambientColorUniform = gl.getUniformLocation(shader, "uAmbientColor");
            shader.pointLightingLocationUniform = gl.getUniformLocation(shader, "uPointLightingLocation");
            shader.pointLightingSpecularColorUniform = gl.getUniformLocation(shader, "uPointLightingSpecularColor");
            shader.pointLightingDiffuseColorUniform = gl.getUniformLocation(shader, "uPointLightingDiffuseColor");
            shader.alphaUniform = gl.getUniformLocation(shader, "uAlapha");
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
    }
};