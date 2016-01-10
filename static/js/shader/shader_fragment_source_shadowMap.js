shader_fragment_source_shadowMap = function(gl){
    var str="\n\
precision mediump float;\n\
varying float vDepth;\n\
\n\
void main(void) {\n\
gl_FragColor=vec4(vDepth, 0.,0.,1.);\n\
}";
    
    var shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    
    return shader;
};