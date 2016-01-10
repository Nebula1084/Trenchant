var main=function() {
  var canvas=document.getElementById("trenchant_canvas");
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

  /*========================= CAPTURE MOUSE EVENTS ========================= */

  var AMORTIZATION=0.95;
  var drag=false;
  var old_x, old_y;
  var dX=0, dY=0;

  var mouseDown=function(e) {
    drag=true;
    old_x=e.pageX, old_y=e.pageY;
    e.preventDefault();
    return false;
  };

  var mouseUp=function(e){
    drag=false;
  };

  var mouseMove=function(e) {
    if (!drag) return false;
    dX=(e.pageX-old_x)*Math.PI/canvas.width,
      dY=(e.pageY-old_y)*Math.PI/canvas.height;
    THETA+=dX;
    PHI+=dY;
    old_x=e.pageX, old_y=e.pageY;
    e.preventDefault();
  };

  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("mouseup", mouseUp, false);
  canvas.addEventListener("mouseout", mouseUp, false);
  canvas.addEventListener("mousemove", mouseMove, false);

  /*========================= GET WEBGL CONTEXT ========================= */
  var gl;
  try {
    gl = canvas.getContext("experimental-webgl", {antialias: true});
    var EXT = gl.getExtension("OES_element_index_uint") ||
      gl.getExtension("MOZ_OES_element_index_uint") ||
        gl.getExtension("WEBKIT_OES_element_index_uint");
  } catch (e) {
    alert("You are not webgl compatible :(") ;
    return false;
  }

  /*========================= SHADERS ========================= */
  /*jshint multistr: true */

  var shader_vertex_source_shadowMap="\n\
attribute vec3 position;\n\
uniform mat4 Pmatrix, Lmatrix;\n\
varying float vDepth;\n\
\n\
void main(void) {\n\
vec4 position = Pmatrix*Lmatrix*vec4(position, 1.);\n\
float zBuf=position.z/position.w; //Z-buffer between -1 and 1\n\
vDepth=0.5+zBuf*0.5; //between 0 and 1\n\
gl_Position=position;\n\
}";

  var shader_fragment_source_shadowMap="\n\
precision mediump float;\n\
varying float vDepth;\n\
\n\
void main(void) {\n\
gl_FragColor=vec4(vDepth, 0.,0.,1.);\n\
}";


  var shader_vertex_source="\n\
attribute vec3 aVertexPosition, aVertexNormal;\n\
attribute vec2 aTextureCoord;\n\
uniform mat4 Pmatrix, Vmatrix, Mmatrix, Lmatrix, PmatrixLight;\n\
varying vec2 vTextureCoord;\n\
varying vec3 vTransformedNormal, uPointLightingLocation;\n\
\n\
void main(void) {\n\
\n\
//Shadow mapping : \n\
vec4 lightPos = Lmatrix*vec4(aVertexPosition, 1.);\n\
lightPos=PmatrixLight*lightPos;\n\
vec3 lightPosDNC=lightPos.xyz/lightPos.w;\n\
uPointLightingLocation=vec3(0.5,0.5,0.5)+lightPosDNC*0.5;\n\
\n\
gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(aVertexPosition, 1.);\n\
\n\
vTransformedNormal=aVertexNormal;\n\
vTextureCoord=aTextureCoord;\n\
}";

  var shader_fragment_source="\n\
precision mediump float;\n\
uniform sampler2D uSampler, samplerShadowMap;\n\
uniform vec3 source_direction;\n\
varying vec2 vTextureCoord;\n\
varying vec3 vTransformedNormal, uPointLightingLocation;\n\
const vec3 source_ambient_color=vec3(1.,1.,1.);\n\
const vec3 source_diffuse_color=vec3(1.,1.,1.);\n\
const vec3 mat_ambient_color=vec3(0.3,0.3,0.3);\n\
const vec3 mat_diffuse_color=vec3(1.,1.,1.);\n\
const float mat_shininess=10.;\n\
\n\
void main(void) {\n\
vec2 uv_shadowMap=uPointLightingLocation.xy;\n\
vec4 shadowMapColor=texture2D(samplerShadowMap, uv_shadowMap);\n\
float zShadowMap=shadowMapColor.r;\n\
float shadowCoeff=1.-smoothstep(0.002, 0.003, uPointLightingLocation.z-zShadowMap);\n\
vec3 color=vec3(texture2D(uSampler, vTextureCoord));\n\
vec3 I_ambient=source_ambient_color*mat_ambient_color;\n\
vec3 I_diffuse=source_diffuse_color*mat_diffuse_color*max(0., dot(vTransformedNormal, source_direction));\n\
\n\
vec3 I=I_ambient+shadowCoeff*I_diffuse;\n\
gl_FragColor = vec4(I*color, 1.);\n\
}";

  var get_shader=function(source, type, typeString) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert("ERROR IN "+typeString+ " SHADER : " + gl.getShaderInfoLog(shader));
      return false;
    }
    return shader;
  };

//BUILD SHADOW MAP SHADER PROGRAM
var shader_vertex_shadowMap=get_shader(shader_vertex_source_shadowMap,
                                       gl.VERTEX_SHADER, "VERTEX SHADOW");
var shader_fragment_shadowMap=get_shader(shader_fragment_source_shadowMap,
                                         gl.FRAGMENT_SHADER, "FRAGMENT SHADOW");

var SHADER_PROGRAM_SHADOW=gl.createProgram();
gl.attachShader(SHADER_PROGRAM_SHADOW, shader_vertex_shadowMap);
gl.attachShader(SHADER_PROGRAM_SHADOW, shader_fragment_shadowMap);

gl.linkProgram(SHADER_PROGRAM_SHADOW);
var _PmatrixShadow = gl.getUniformLocation(SHADER_PROGRAM_SHADOW, "Pmatrix");
var _LmatrixShadow = gl.getUniformLocation(SHADER_PROGRAM_SHADOW, "Lmatrix");
var _positionShadow = gl.getAttribLocation(SHADER_PROGRAM_SHADOW, "position");


//BUILD DEFAULT RENDERING SHP
var shader_vertex=get_shader(shader_vertex_source,
                             gl.VERTEX_SHADER, "VERTEX");
var shader_fragment=get_shader(shader_fragment_source,
                               gl.FRAGMENT_SHADER, "FRAGMENT");

var SHADER_PROGRAM=gl.createProgram();
gl.attachShader(SHADER_PROGRAM, shader_vertex);
gl.attachShader(SHADER_PROGRAM, shader_fragment);

gl.linkProgram(SHADER_PROGRAM);

var _Pmatrix = gl.getUniformLocation(SHADER_PROGRAM, "Pmatrix");
var _Vmatrix = gl.getUniformLocation(SHADER_PROGRAM, "Vmatrix");
var _Mmatrix = gl.getUniformLocation(SHADER_PROGRAM, "Mmatrix");
var _Lmatrix = gl.getUniformLocation(SHADER_PROGRAM, "Lmatrix");
var _PmatrixLight = gl.getUniformLocation(SHADER_PROGRAM, "PmatrixLight");
var _lightDirection = gl.getUniformLocation(SHADER_PROGRAM, "source_direction");
var _sampler = gl.getUniformLocation(SHADER_PROGRAM, "uSampler");
var _samplerShadowMap = gl.getUniformLocation(SHADER_PROGRAM,
                                              "samplerShadowMap");

var _uv = gl.getAttribLocation(SHADER_PROGRAM, "aTextureCoord");
var _position = gl.getAttribLocation(SHADER_PROGRAM, "aVertexPosition");
var _normal = gl.getAttribLocation(SHADER_PROGRAM, "aVertexNormal");

gl.useProgram(SHADER_PROGRAM);
gl.uniform1i(_sampler, 0);
gl.uniform1i(_samplerShadowMap, 1);
var LIGHTDIR=[0.58,0.58,-0.58];
gl.uniform3fv(_lightDirection, LIGHTDIR);


  /*========================= THE DRAGON ========================= */

  var CUBE_VERTEX=false, CUBE_FACES=false, CUBE_NPOINTS=0;

  LIBS.get_json("textures/dragon.json", function(dragon){
    //vertices
    CUBE_VERTEX= gl.createBuffer ();
    gl.bindBuffer(gl.ARRAY_BUFFER, CUBE_VERTEX);
    gl.bufferData(gl.ARRAY_BUFFER,
                  new Float32Array(dragon.vertices),
      gl.STATIC_DRAW);

    //faces
    CUBE_FACES=gl.createBuffer ();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                  new Uint32Array(dragon.indices),
      gl.STATIC_DRAW);

    CUBE_NPOINTS=dragon.indices.length;

    animate(0);

  });

  /*========================= THE FLOOR ========================= */

  var floor_vertices=[
    -10,0,-10,   0,1,0,   0,0, //1st point position,normal and UV
    -10,0, 10,   0,1,0,   0,1, //2nd point
    10,0, 10,   0,1,0,   1,1,
    10,0,-10,   0,1,0,   1,0
  ];

  var FLOOR_VERTEX= gl.createBuffer ();
  gl.bindBuffer(gl.ARRAY_BUFFER, FLOOR_VERTEX);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(floor_vertices), gl.STATIC_DRAW);

  var FLOOR_INDICES=gl.createBuffer ();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, FLOOR_INDICES);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array([0,1,2, 0,2,3]),gl.STATIC_DRAW);


  /*========================= MATRIX ========================= */

  var PROJMATRIX=LIBS.get_projection(40, canvas.width/canvas.height, 1, 100);
  var MOVEMATRIX=LIBS.get_I4();
  var VIEWMATRIX=LIBS.get_I4();

  LIBS.translateZ(VIEWMATRIX, -20);
  LIBS.translateY(VIEWMATRIX, -4);
  var THETA=0,
      PHI=0;

  var PROJMATRIX_SHADOW=LIBS.get_projection_ortho(20, 1, 5, 28);
  var LIGHTMATRIX=LIBS.lookAtDir(LIGHTDIR, [0,1,0], [0,0,0]);


  /*========================= TEXTURES ========================= */
  var get_texture=function(image_URL){

    var image=new Image();

    image.src=image_URL;
    image.webglTexture=false;

    image.onload=function(e) {
      var texture=gl.createTexture();
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,
                       gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);
      image.webglTexture=texture;
    };

    return image;
  };

  var cube_texture=get_texture("textures/dragon.png");
  var floor_texture=get_texture("textures/granit.jpg");

  /*======================= RENDER TO TEXTURE ======================= */

  var fb=gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

  var rb=gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, rb);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16 , 512, 512);

  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT,
                             gl.RENDERBUFFER, rb);

  var texture_rtt=gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture_rtt);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 512, 512,
                0, gl.RGBA, gl.UNSIGNED_BYTE, null);

  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                          gl.TEXTURE_2D, texture_rtt, 0);

  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);


  /*========================= DRAWING ========================= */
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clearDepth(1.0);

  var time_old=0;
  var animate=function(time) {
    var dt=time-time_old;
    if (!drag) {
      dX*=AMORTIZATION, dY*=AMORTIZATION;
      THETA+=dX, PHI+=dY;
    }
    LIBS.set_I4(MOVEMATRIX);
    LIBS.rotateY(MOVEMATRIX, THETA);
    LIBS.rotateX(MOVEMATRIX, PHI);
    time_old=time;


    //===================== RENDER THE SHADOW MAP ==========================
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.useProgram(SHADER_PROGRAM_SHADOW);
    gl.enableVertexAttribArray(_positionShadow);

    gl.viewport(0.0, 0.0, 512,512);
    gl.clearColor(1.0, 0.0, 0.0, 1.0); //red -> Z=Zfar on the shadow map
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(_PmatrixShadow, false, PROJMATRIX_SHADOW);
    gl.uniformMatrix4fv(_LmatrixShadow, false, LIGHTMATRIX);

    //DRAW THE DRAGON
    gl.bindBuffer(gl.ARRAY_BUFFER, CUBE_VERTEX);
    gl.vertexAttribPointer(_positionShadow, 3, gl.FLOAT, false,4*(3+3+2),0) ;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
    gl.drawElements(gl.TRIANGLES, CUBE_NPOINTS, gl.UNSIGNED_INT, 0);

    //DRAW THE FLOOR
    gl.bindBuffer(gl.ARRAY_BUFFER, FLOOR_VERTEX);
    gl.vertexAttribPointer(_positionShadow, 3, gl.FLOAT, false,4*(3+3+2),0) ;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, FLOOR_INDICES);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

    gl.disableVertexAttribArray(_positionShadow);


    //==================== RENDER THE SCENE ===========================
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);


    gl.useProgram(SHADER_PROGRAM);


    gl.enableVertexAttribArray(_uv);
    gl.enableVertexAttribArray(_position);
    gl.enableVertexAttribArray(_normal);

    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
    gl.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
    gl.uniformMatrix4fv(_Mmatrix, false, MOVEMATRIX);
    gl.uniformMatrix4fv(_PmatrixLight, false, PROJMATRIX_SHADOW);
    gl.uniformMatrix4fv(_Lmatrix, false, LIGHTMATRIX);

    //DRAW THE DRAGON
    if (cube_texture.webglTexture) {
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texture_rtt);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, cube_texture.webglTexture);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, CUBE_VERTEX);
    gl.vertexAttribPointer(_position, 3, gl.FLOAT, false,4*(3+3+2),0) ;
    gl.vertexAttribPointer(_normal, 3, gl.FLOAT, false,4*(3+3+2),3*4) ;
    gl.vertexAttribPointer(_uv, 2, gl.FLOAT, false,4*(3+3+2),(3+3)*4) ;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
    gl.drawElements(gl.TRIANGLES, CUBE_NPOINTS, gl.UNSIGNED_INT, 0);

    //DRAW THE FLOOR
    if (floor_texture.webglTexture) {
      gl.bindTexture(gl.TEXTURE_2D, floor_texture.webglTexture);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, FLOOR_VERTEX);
    gl.vertexAttribPointer(_position, 3, gl.FLOAT, false,4*(3+3+2),0) ;
    gl.vertexAttribPointer(_normal, 3, gl.FLOAT, false,4*(3+3+2),3*4) ;
    gl.vertexAttribPointer(_uv, 2, gl.FLOAT, false,4*(3+3+2),(3+3)*4) ;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, FLOOR_INDICES);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

    gl.disableVertexAttribArray(_uv);
    gl.disableVertexAttribArray(_position);
    gl.disableVertexAttribArray(_normal);

    gl.flush();
    window.requestAnimationFrame(animate);
  };
};
