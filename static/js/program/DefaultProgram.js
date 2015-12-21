Trenchant.DefaultProgram = function(gl, vertexShader, fragmentShader){
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);        
    return shaderProgram; 
};