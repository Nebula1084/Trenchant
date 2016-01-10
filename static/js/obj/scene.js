Scene = function(){
    var loader = new Trenchant.OBJLoader();
       
    function createProgram(frag, vetx){
        var program = gl.createProgram();
        gl.attachShader(program, frag);
        gl.attachShader(program, vetx);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
        return program;
    }
    this.WardMesh = createProgram(Trenchant.Ward(gl), Trenchant.VertexShader(gl));   
    this.PhongMesh = createProgram(Trenchant.PhongShader(gl), Trenchant.VertexShader(gl));
    this.TorranceMesh = createProgram(Trenchant.Cook_Torrance(gl), Trenchant.VertexShader(gl));
    
    this.am = new Trenchant.Animate();

    this.M1 = new Trenchant.Material();
    this.M1.showSpecularHighlightsUniform = true;
    this.M1.useLightingUniform = true;
    this.M1.ambientColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.M1.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.M1.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.8, 0.8, 0.1);
    this.M1.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.8, 0.8, 0.8);
    this.M1.useTexturesUniform = "none";
    this.M1.samplerUniform  = 0;
    this.M1.materialShininessUniform = 32.0;

    var scope = this;
        
    loader.load("obj/bridge.obj", function(objects){
        scope.object3d=new Trenchant.Object3D(objects);        
        scope.object3d.drawSequence=scope.drawSequence;
        
        for (var key in scope.object3d.obj_dict){
            scope.object3d.obj_dict[key].shaderProgram=scope.WardMesh;
            scope.object3d.obj_dict[key].material = scope.M1;
            scope.object3d.obj_dict[key].animation = scope.am;
            console.log("part: "+key);
        }
        return;              
    });
};

Scene.prototype = {
    constructor: Scene,
    setBodyAnimate: function(pMatrix, mvMatrix){
        this.am.pMatrix = pMatrix;
        this.am.mvMatrix = mvMatrix;
    },
    draw: function(){
        this.object3d.draw();
    },
    drawShadow: function() {
        this.object3d.drawShadow();
    }
};