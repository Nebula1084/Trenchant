/* global mat4 */
/* global mat3 */
Trenchant.Animate = function(){
    
};

Trenchant.Animate.prototype = {
    constructor: Trenchant.Animate,
    animate: function(shader){
        shader.pMatrixUniform = gl.getUniformLocation(shader, "uPMatrix");
        shader.mvMatrixUniform = gl.getUniformLocation(shader, "uMVMatrix");
        shader.nMatrixUniform = gl.getUniformLocation(shader, "uNMatrix");
        
        gl.uniformMatrix4fv(shader.pMatrixUniform, false, this.pMatrix);
        gl.uniformMatrix4fv(shader.mvMatrixUniform, false, this.mvMatrix);
        var normalMatrix = mat3.create();
        mat4.toInverseMat3(this.mvMatrix, normalMatrix);
        mat3.transpose(normalMatrix);
        gl.uniformMatrix3fv(shader.nMatrixUniform, false, normalMatrix);
    }
};