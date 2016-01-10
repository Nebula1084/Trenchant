shader_fragment_source = function(gl){
    var str = "\n\
precision mediump float;\n\
uniform sampler2D sampler, samplerShadowMap;\n\
uniform vec3 source_direction;\n\
varying vec2 vUV;\n\
varying vec3 vNormal, vLightPos;\n\
const vec3 source_ambient_color=vec3(1.,1.,1.);\n\
const vec3 source_diffuse_color=vec3(1.,1.,1.);\n\
const vec3 mat_ambient_color=vec3(0.3,0.3,0.3);\n\
const vec3 mat_diffuse_color=vec3(1.,1.,1.);\n\
const float mat_shininess=10.;\n\
\n\
void main(void) {\n\
vec2 uv_shadowMap=vLightPos.xy;\n\
vec4 shadowMapColor=texture2D(samplerShadowMap, uv_shadowMap);\n\
float zShadowMap=shadowMapColor.r;\n\
float shadowCoeff=1.-smoothstep(0.002, 0.003, vLightPos.z-zShadowMap);\n\
vec3 color=vec3(texture2D(sampler, vUV));\n\
vec3 I_ambient=source_ambient_color*mat_ambient_color;\n\
vec3 I_diffuse=source_diffuse_color*mat_diffuse_color*max(0., dot(vNormal, source_direction));\n\
\n\
vec3 I=I_ambient+shadowCoeff*I_diffuse;\n\
gl_FragColor = vec4(I*color, 1.);\n\
}";
    
    var shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    
    return shader;
};