/* global Trenchant */
Trenchant.Torrance_Sparrow = function(gl){
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
                float cook;\
                float diff;\
                float Kn = 3.0;\
                float Kc = 0.2;\
                float Km = 0.3;\
                float Kr = 0.9;\
				if (!uUseLighting) {\
					lightWeighting = vec3(1.0, 1.0, 1.0);\
				} else {\
                    vec3 L = normalize(uPointLightingLocation - vPosition.xyz);\
                    vec3 N = normalize(vTransformedNormal);\
                    vec3 E = normalize(vPosition.xyz);\
                    vec3 H = normalize(L + E);\
        \
                    float NH = dot(N, H);\
                    float NL = dot(N, L);\
                    float EH = dot(E, H);\
                    float NE = dot(N, E);\
                    float G = min(1.0, 2.0*NH*NE/EH);\
                    G = min(G, 2.0*NH*NL/EH);\
                    \
                    float c = EH;\
                    float g = sqrt(Kn*Kn + c*c -1.0);\
                    float f1=g-c/g+c;\
                    float f2=(c*(g+c)-1.0)/(c*(g-c)+1.0);\
                    float F = Kr+(1.0-Kr)*pow((1.0-NL), 5.0);\
                    float alpha=acos(NH);\
                    float D = Kc*exp(-pow(alpha/Km, 2.0));\
					float diffuseLightWeighting = max(dot(N, L), 0.0);\
                    float specularLightWeighting = F*D*G/NE;\
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
				gl_FragColor = vec4(fragmentColor.rgb * lightWeighting, fragmentColor.a);\
			}\
    ";
    
    var shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, str);
    gl.compileShader(shader);
    
    return shader;
};