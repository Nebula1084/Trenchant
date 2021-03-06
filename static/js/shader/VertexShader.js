Trenchant.VertexShader = function(gl){
    var str = "\
            attribute vec3 aVertexPosition;\
			attribute vec3 aVertexNormal;\
			attribute vec2 aTextureCoord;\
		\
			uniform mat4 uMVMatrix;\
			uniform mat4 uPMatrix;\
			uniform mat3 uNMatrix;\
            uniform vec3 uEye;\
		\
			varying vec2 vTextureCoord;\
			varying vec3 vTransformedNormal;\
			varying vec4 vPosition;\
            varying vec3 vEyevec;\
		\
		\
			void main(void) {\
				vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);\
				gl_Position = uPMatrix * vPosition;\
                vEyevec = -uEye;\
				vTextureCoord = aTextureCoord;\
				vTransformedNormal = uNMatrix * aVertexNormal;\
			}\
    ";
    
    var shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    
    return shader;
};