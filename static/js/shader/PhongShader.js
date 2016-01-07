Trenchant.PhongShader = function(gl){
    var str = "\
			precision mediump float;\
		\
			varying vec2 vTextureCoord;\
			varying vec3 vTransformedNormal;\
			varying vec4 vPosition;\
		\
			uniform float uMaterialShininess;\
		\
			uniform bool uShowSpecularHighlights;\
			uniform bool uUseLighting;\
			uniform bool uUseTextures;\
		\
			uniform vec3 uAmbientColor;\
            uniform float uAlapha;\
		\
			uniform vec3 uPointLightingLocation;\
			uniform vec3 uPointLightingSpecularColor;\
			uniform vec3 uPointLightingDiffuseColor;\
		\
			uniform sampler2D uSampler;\
		\
		\
			void main(void) {\
				vec3 lightWeighting;\
				if (!uUseLighting) {\
					lightWeighting = vec3(1.0, 1.0, 1.0);\
				} else {\
					vec3 lightDirection = normalize(uPointLightingLocation - vPosition.xyz);\
					vec3 normal = normalize(vTransformedNormal);\
		\
					float specularLightWeighting = 0.0;\
					if (uShowSpecularHighlights) {\
						vec3 eyeDirection = normalize(-vPosition.xyz);\
						vec3 reflectionDirection = reflect(-lightDirection, normal);\
		\
						specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), uMaterialShininess);\
					}\
		\
					float diffuseLightWeighting = max(dot(normal, lightDirection), 0.0);\
					lightWeighting = uAmbientColor\
						+ uPointLightingSpecularColor * specularLightWeighting\
						+ uPointLightingDiffuseColor * diffuseLightWeighting;\
				}\
		\
				vec4 fragmentColor;\
				if (uUseTextures) {\
					fragmentColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\
				} else {\
					fragmentColor = vec4(1.0, 1.0, 1.0, 1.0);\
				}\
				gl_FragColor = vec4(fragmentColor.rgb * lightWeighting, uAlapha);\
			}\
    ";
    
    var shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    
    return shader;
};