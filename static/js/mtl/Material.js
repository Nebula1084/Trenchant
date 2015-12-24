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
};

Trenchant.Material.prototype = {
    constructor : Trenchant.Material,
    setMat: function(shader){
        gl.uniform1i(shaderProgram.showSpecularHighlightsUniform, this.showSpecularHighlightsUniform);
        gl.uniform1i(shaderProgram.useLightingUniform, this.useLightingUniform);
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
            
            gl.uniform1i(shaderProgram.useTexturesUniform, this.texture != undefined);
            
            gl.activeTexture(gl.TEXTURE0);
            if (this.texture != undefined){
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
            }
            
            gl.uniform1i(shaderProgram.samplerUniform, this.samplerUniform);
            gl.uniform1f(shaderProgram.materialShininessUniform, this.materialShininessUniform);
        }
    }
};

