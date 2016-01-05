/* global mat4 */
/* global mat3 */
Trenchant.Car = function(){
    var loader = new Trenchant.OBJLoader();
    this.drawSequence=[
        "HDM_04_10_glass",
        "HDM_04_10_glass_orange",
        "HDM_04_10_glass_ms",
        "HDM_04_10_glass_black",
        "HDM_04_10_glass_red_ms",
        "HDM_04_10_taillight_glass",
        "HDM_04_10_carpaint",
        "HDM_04_10_black_plastic_ms",
        "HDM_04_10_front_logo",
        "HDM_04_10_register_plate",            
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
        "HDM_04_10_rim_rr"
    ]
    this.WardMesh = gl.createProgram();    
    gl.attachShader(this.WardMesh, Trenchant.Ward(gl));
    gl.attachShader(this.WardMesh, Trenchant.VertexShader(gl));
    gl.linkProgram(this.WardMesh);
    
    this.PhongMesh = gl.createProgram();    
    gl.attachShader(this.PhongMesh, Trenchant.PhongShader(gl));
    gl.attachShader(this.PhongMesh, Trenchant.VertexShader(gl));
    gl.linkProgram(this.PhongMesh);
    
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
    
    
    this.M2 = new Trenchant.Material();

    this.M2.showSpecularHighlightsUniform = true;
    this.M2.useLightingUniform = true;
    this.M2.ambientColorUniform = new Trenchant.Vector3(0.0, 0.0, 0.0);
    this.M2.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.M2.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.5, 0.5, 0.5);
    this.M2.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.M2.useTexturesUniform = "none";
    this.M2.samplerUniform  = 0;
    this.M2.materialShininessUniform = 32.0;
    
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
    this.M4.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.M4.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.0, 0.0, 0.0);
    this.M4.useTexturesUniform = "none";
    this.M4.samplerUniform  = 0;
    this.M4.materialShininessUniform = 32.0;
    this.M4.alphaUniform = 0.9;
    var scope = this;
        
    loader.load("obj/car.obj", function(objects){
        scope.object3d=new Trenchant.Object3D(objects);        
        scope.object3d.drawSequence=scope.drawSequence;
        
        for (var key in scope.object3d.obj_dict){
            scope.object3d.obj_dict[key].shaderProgram=scope.WardMesh;
            scope.object3d.obj_dict[key].material = scope.M1;
            console.log("part: "+key);
        }
        scope.object3d.obj_dict["HDM_04_10_carpaint"].material = scope.M2;
        
        scope.object3d.obj_dict["HDM_04_10_glass"].material = scope.M4;
        scope.object3d.obj_dict["HDM_04_10_glass_orange"].material = scope.M4;
        scope.object3d.obj_dict["HDM_04_10_glass_ms"].material = scope.M4;
        scope.object3d.obj_dict["HDM_04_10_glass_black"].material = scope.M4;
        scope.object3d.obj_dict["HDM_04_10_glass_red_ms"].material = scope.M4;
        scope.object3d.obj_dict["HDM_04_10_taillight_glass"].material = scope.M4;
        
        scope.object3d.obj_dict["HDM_04_10_tire_fl"].material = scope.M3;
        //scope.object3d.obj_dict["HDM_04_10_tire_fl"].shaderProgram = scope.PhongMesh;
        scope.object3d.obj_dict["HDM_04_10_tire_fr"].material = scope.M3;
        scope.object3d.obj_dict["HDM_04_10_tire_rr"].material = scope.M3;
        scope.object3d.obj_dict["HDM_04_10_tire_rl"].material = scope.M3;
    });
};

Trenchant.Car.prototype = {
    constructor: Trenchant.Car,
    animate: function(pMatrix, mvMatrix){
        gl.uniformMatrix4fv(this.WardMesh.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(this.WardMesh.mvMatrixUniform, false, mvMatrix);

        var normalMatrix = mat3.create();
        mat4.toInverseMat3(mvMatrix, normalMatrix);
        mat3.transpose(normalMatrix);
        gl.uniformMatrix3fv(this.WardMesh.nMatrixUniform, false, normalMatrix);
    },
    draw: function(){
        this.object3d.draw();
    }
};