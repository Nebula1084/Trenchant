shader_vertex_source_shadowMap = function(gl){
    var str="\n\
attribute vec3 position;\n\
uniform mat4 Pmatrix, Lmatrix, mvMatrix;\n\
varying float vDepth;\n\
\n\
void main(void) {\n\
vec4 position = Pmatrix*mvMatrix*Lmatrix*vec4(position, 1.);\n\
float zBuf=position.z/position.w; //Z-buffer between -1 and 1\n\
vDepth=0.5+zBuf*0.5; //between 0 and 1\n\
gl_Position=position;\n\
}";
    
    var shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    
    return shader;
};