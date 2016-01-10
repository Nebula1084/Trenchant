shader_vertex_source = function(gl){
    var str = "\n\
attribute vec3 position, normal;\n\
attribute vec2 uv;\n\
uniform mat4 Pmatrix, MVmatrix, Lmatrix, PmatrixLight;\n\
varying vec2 vUV;\n\
varying vec3 vNormal, vLightPos;\n\
\n\
void main(void) {\n\
\n\
//Shadow mapping : \n\
vec4 lightPos = Lmatrix*vec4(position, 1.);\n\
lightPos=PmatrixLight*lightPos;\n\
vec3 lightPosDNC=lightPos.xyz/lightPos.w;\n\
vLightPos=vec3(0.5,0.5,0.5)+lightPosDNC*0.5;\n\
\n\
gl_Position = Pmatrix*MVmatrix*vec4(position, 1.);\n\
\n\
vNormal=normal;\n\
vUV=uv;\n\
}";
    
    var shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    
    return shader;
};