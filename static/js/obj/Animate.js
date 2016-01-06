Trenchant.Animate = function(){
    
};

Trenchant.Animate.prototype = {
    constructor: Trenchant.Animate,
    animate: function(shader){
        gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
        gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);
        var normalMatrix = mat3.create();
        mat4.toInverseMat3(this.mvMatrix, normalMatrix);
        mat3.transpose(normalMatrix);
        gl.uniformMatrix3fv(shader.nMatrixUniform, false, normalMatrix);
    }
};