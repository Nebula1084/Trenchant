/* global Trenchant */
Trenchant.Ward = function(gl){
    var str = "\
			precision mediump float;\
		\
			varying vec2 vTextureCoord;\
			varying vec3 vTransformedNormal;\
			varying vec4 vPosition;\
            varying vec3 vEyevec;\
		\
			uniform float uMaterialShininess;\
            uniform float uReflectivity;\
		\
			uniform bool uShowSpecularHighlights;\
			uniform bool uUseLighting;\
			uniform bool uUseTextures;\
            uniform bool uUseEnv;\
		\
			uniform vec3 uAmbientColor;\
            uniform float uAlapha;\
		\
			uniform vec3 uPointLightingLocation;\
			uniform vec3 uPointLightingSpecularColor;\
			uniform vec3 uPointLightingDiffuseColor;\
		\
			uniform sampler2D uSampler;\
            uniform samplerCube mapCube;\
		\
		\
			void main(void) {\
				vec3 lightWeighting;\
                float cook;\
                float diff;\
				if (!uUseLighting) {\
					lightWeighting = vec3(1.0, 1.0, 1.0);\
				} else {\
                    vec3 L = normalize(-uPointLightingLocation + vPosition.xyz);\
                    vec3 N = normalize(-vTransformedNormal);\
                    vec3 E = normalize(vEyevec-vPosition.xyz);\
                    vec3 H = normalize(L + E);\
        \
                    float NH = dot(N, H);\
                    float NL = dot(N, L);\
                    float EH = dot(E, H);\
                    float NE = dot(N, E);\
                    float omega = 0.5;\
                    float gamma = acos(NH);\
                    \
					float diffuseLightWeighting = max(dot(N, L), 0.0);\
                    float ward=0.0;\
                    if(NE!=0.0 && gamma!=0.0)\
                        ward=exp(-pow(tan(gamma)/omega, 2.0))*sqrt(NL/NE)/4.0/pow(gamma,2.0);\
                    float specularLightWeighting = max(ward, 0.0);\
					lightWeighting = uAmbientColor\
                        + uPointLightingSpecularColor * specularLightWeighting\
						+ uPointLightingDiffuseColor * diffuseLightWeighting;\
                    \
				}\
		\
				vec4 fragmentColor;\
				if (uUseTextures) {\
					fragmentColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\
				} else {\
					fragmentColor = vec4(1.0, 1.0, 1.0, 1.0);\
				}\
                vec4 envColor;\
                float reflectivity;\
                if (uUseEnv) {\
                    reflectivity = uReflectivity;\
                    envColor = textureCube(mapCube, reflect(normalize(-vEyevec), normalize(vTransformedNormal)));\
                    fragmentColor = (1.0-reflectivity) * fragmentColor + reflectivity * envColor;\
                }\
				gl_FragColor = vec4(fragmentColor.rgb * lightWeighting, uAlapha);\
			}\
    ";
    
    var shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    
    return shader;
};