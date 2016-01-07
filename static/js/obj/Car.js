/* global gl */
/* global Trenchant */
/* global mat4 */
/* global mat3 */
Trenchant.Car = function(){
    var loader = new Trenchant.OBJLoader();
    this.drawSequence=[                        
        "HDM_04_10_carpaint",
        "HDM_04_10_black_plastic_ms",
        "HDM_04_10_front_logo",        
        "HDM_04_10_chrome_ms",
        "HDM_04_10_clock",
        "HDM_04_10_comp",
        "HDM_04_10_interior_silver_ms",
        "HDM_04_10_speakers_net",
        "HDM_04_10_mirrors",
        "HDM_04_10_interior_red_ms",
        "HDM_04_10_chrome",        
        "HDM_04_10_black_plastic",
        "HDM_04_10_interior_dark",
        "HDM_04_10_gps_screen",
        "HDM_04_10_rim_fl",        
        "HDM_04_10_taillight_chrome_ms",        
        "HDM_04_10_gauges",
        "HDM_04_10_chrome_fl",
        "HDM_04_10_brake_disc_shield_fl",
        "HDM_04_10_brake_disc_fl",
        "HDM_04_10_brake_caliper_fl",
        "HDM_04_10_brake_caliper_2_fl",
        "HDM_04_10_brake_disc_2_fl",
        "HDM_04_10_brake_disc_3_fl",
        "HDM_04_10_tire_fl",
        "HDM_04_10_rim_rl",
        "HDM_04_10_chrome_r",
        "HDM_04_10_brake_disc_shield_r",
        "HDM_04_10_brake_disc_r",
        "HDM_04_10_brake_caliper_r",
        "HDM_04_10_brake_caliper_2_r",
        "HDM_04_10_brake_disc_2_r",
        "HDM_04_10_brake_disc_3_r",
        "HDM_04_10_tire_rl",
        "HDM_04_10_chrome_glossy",
        "HDM_04_10_interior_red",
        "HDM_04_10_interior_dark_ms",        
        "HDM_04_10_tire_fr",
        "HDM_04_10_tire_rr",
        "HDM_04_10_rim_fr",
        "HDM_04_10_brake_disc_shield_fr",
        "HDM_04_10_chrome_fr",
        "HDM_04_10_brake_disc_fr",
        "HDM_04_10_brake_disc_2_fr",
        "HDM_04_10_brake_caliper_fr",
        "HDM_04_10_brake_caliper_2_fr",
        "HDM_04_10_brake_disc_3_fr",
        "HDM_04_10_rim_rr",        
        "HDM_04_10_glass",
        "HDM_04_10_glass_orange",
        "HDM_04_10_glass_ms",
        "HDM_04_10_glass_black",
        "HDM_04_10_glass_red_ms",
        "HDM_04_10_register_plate",
        "HDM_04_10_taillight_glass"
    ]
    
    function createProgram(frag, vetx){
        var program = gl.createProgram();
        gl.attachShader(program, frag);
        gl.attachShader(program, vetx);
        gl.linkProgram(program);
        return program;
    }
    this.WardMesh = createProgram(Trenchant.Ward(gl), Trenchant.VertexShader(gl));   
    this.PhongMesh = createProgram(Trenchant.PhongShader(gl), Trenchant.VertexShader(gl));
    this.TorranceMesh = createProgram(Trenchant.Cook_Torrance(gl), Trenchant.VertexShader(gl));
    
    this.am = new Trenchant.Animate();
    
    if (!gl.getProgramParameter(this.WardMesh, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
    }
    
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
    
    
    this.carpaint = new Trenchant.Material();

    this.carpaint.showSpecularHighlightsUniform = true;
    this.carpaint.useLightingUniform = true;
    this.carpaint.ambientColorUniform = new Trenchant.Vector3(0.3, 0.3, 0.3);
    this.carpaint.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.carpaint.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.8, 0.8, 0.8);
    this.carpaint.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.7, 0.7, 0.7);
    this.carpaint.useTexturesUniform = "none";
    this.carpaint.samplerUniform  = 0;
    this.carpaint.materialShininessUniform = 32.0;
    // this.carpaint.setTexture("textures/negx.jpg");
    var cube = [
        "textures/posx.jpg",
        "textures/negx.jpg",
        "textures/posy.jpg",
        "textures/negy.jpg",
        "textures/posz.jpg",
        "textures/negz.jpg"
    ];
    this.carpaint.setEnvTexture(cube);
    
    this.plastic = new Trenchant.Material();

    this.plastic.showSpecularHighlightsUniform = true;
    this.plastic.useLightingUniform = true;
    this.plastic.ambientColorUniform = new Trenchant.Vector3(0.1, 0.1, 0.1);
    this.plastic.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.plastic.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.8, 0.8, 0.8);
    this.plastic.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.1, 0.1, 0.1);
    this.plastic.useTexturesUniform = "none";
    this.plastic.samplerUniform  = 0;
    this.plastic.materialShininessUniform = 32.0;
    
    this.M3 = new Trenchant.Material();

    this.M3.showSpecularHighlightsUniform = false;
    this.M3.useLightingUniform = true;
    this.M3.ambientColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.M3.pointLightingLocationUniform = new Trenchant.Vector3(-10, 4.0, -20.0);        
    this.M3.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.0, 0.0, 0.0);
    this.M3.useTexturesUniform = "none";
    this.M3.samplerUniform  = 0;
    this.M3.materialShininessUniform = 32.0;
    
    this.M4 = new Trenchant.Material();

    this.M4.showSpecularHighlightsUniform = true;
    this.M4.useLightingUniform = true;
    this.M4.ambientColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.M4.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.M4.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.8, 0.8, 0.8);
    this.M4.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.8, 0.8, 0.8);
    this.M4.useTexturesUniform = "none";
    this.M4.samplerUniform  = 0;
    this.M4.materialShininessUniform = 32.0;
    this.M4.alphaUniform = 0.5;
    var scope = this;
        
    loader.load("obj/car.obj", function(objects){
        scope.object3d=new Trenchant.Object3D(objects);        
        scope.object3d.drawSequence=scope.drawSequence;
        
        for (var key in scope.object3d.obj_dict){
            scope.object3d.obj_dict[key].shaderProgram=scope.WardMesh;
            scope.object3d.obj_dict[key].material = scope.M1;
            scope.object3d.obj_dict[key].animation = scope.am;
            console.log("part: "+key);
        }
        scope.object3d.obj_dict["HDM_04_10_carpaint"].material = scope.carpaint;
        
        scope.object3d.obj_dict["HDM_04_10_glass"].material = scope.M4;
        scope.object3d.obj_dict["HDM_04_10_glass_orange"].material = scope.M4;
        scope.object3d.obj_dict["HDM_04_10_glass_ms"].material = scope.M4;
        scope.object3d.obj_dict["HDM_04_10_glass_black"].material = scope.M4;
        scope.object3d.obj_dict["HDM_04_10_glass_red_ms"].material = scope.M4;
        scope.object3d.obj_dict["HDM_04_10_taillight_glass"].material = scope.M4;
        scope.object3d.obj_dict["HDM_04_10_register_plate"].material = scope.M4;        
        scope.object3d.obj_dict["HDM_04_10_tire_fl"].material = scope.M3;
        //scope.object3d.obj_dict["HDM_04_10_tire_fl"].shaderProgram = scope.PhongMesh;
        scope.object3d.obj_dict["HDM_04_10_tire_fr"].material = scope.M3;
        scope.object3d.obj_dict["HDM_04_10_tire_rr"].material = scope.M3;
        scope.object3d.obj_dict["HDM_04_10_tire_rl"].material = scope.M3;
        
        scope.object3d.obj_dict["HDM_04_10_black_plastic_ms"].shaderProgram = scope.TorranceMesh;
        scope.object3d.obj_dict["HDM_04_10_black_plastic_ms"].material = scope.plastic;
        scope.object3d.obj_dict["HDM_04_10_black_plastic"].shaderProgram = scope.TorranceMesh;
        scope.object3d.obj_dict["HDM_04_10_black_plastic"].material = scope.plastic;                
    });
};

Trenchant.Car.prototype = {
    constructor: Trenchant.Car,
    setAnimate: function(pMatrix, mvMatrix){
        this.am.pMatrix = pMatrix;
        this.am.mvMatrix = mvMatrix;
    },
    draw: function(){
        this.object3d.draw();
    }
};