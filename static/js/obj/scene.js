Scene = function(){
    var loader = new Trenchant.OBJLoader();
    this.drawSequence=[                        
        "HDM_04_10_carpaint",
        "HDM_04_10_black_plastic_ms",//车灯支架
        "HDM_04_10_front_logo",      //  
        "HDM_04_10_chrome_ms",//尾气
        "HDM_04_10_clock",
        "HDM_04_10_comp", //屏幕中间
        "HDM_04_10_interior_silver_ms",  //
        "HDM_04_10_speakers_net",  //喇叭
        "HDM_04_10_mirrors",
        "HDM_04_10_interior_red_ms",   //
        "HDM_04_10_chrome",      //门把手，车前灯，银色  
        "HDM_04_10_black_plastic",  //
        "HDM_04_10_interior_dark",//方向盘，车内前后台
        "HDM_04_10_gps_screen",  //
        "HDM_04_10_rim_fl",       // 
        "HDM_04_10_taillight_chrome_ms",        //车后灯
        "HDM_04_10_gauges",   //仪表盘
        "HDM_04_10_chrome_fl",  //车前轮螺丝
        "HDM_04_10_brake_disc_shield_fl",  //
        "HDM_04_10_brake_disc_fl",  //
        "HDM_04_10_brake_caliper_fl", //
        "HDM_04_10_brake_caliper_2_fl",//
        "HDM_04_10_brake_disc_2_fl",  //
        "HDM_04_10_brake_disc_3_fl",  //
        "HDM_04_10_tire_fl",     //
        "HDM_04_10_rim_rl",   //
        "HDM_04_10_chrome_r",  //
        "HDM_04_10_brake_disc_shield_r",//
        "HDM_04_10_brake_disc_r",  //后车轮螺丝
        "HDM_04_10_brake_caliper_r", //
        "HDM_04_10_brake_caliper_2_r",//
        "HDM_04_10_brake_disc_2_r",  //
        "HDM_04_10_brake_disc_3_r",//
        "HDM_04_10_tire_rl",  //
        "HDM_04_10_chrome_glossy",   //车前灯内部
        "HDM_04_10_interior_red",  //内部小东西
        "HDM_04_10_interior_dark_ms",        //显示盖 
        "HDM_04_10_tire_fr",  //
        "HDM_04_10_tire_rr",  //
        "HDM_04_10_rim_fr",  //
        "HDM_04_10_brake_disc_shield_fr",  //
        "HDM_04_10_chrome_fr",    //右前轮胎螺丝
        "HDM_04_10_brake_disc_fr",  //
        "HDM_04_10_brake_disc_2_fr",  //
        "HDM_04_10_brake_caliper_fr",
        "HDM_04_10_brake_caliper_2_fr",  //
        "HDM_04_10_brake_disc_3_fr",  //
        "HDM_04_10_rim_rr",       //  
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
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }
        return program;
    }
    this.WardMesh = createProgram(Trenchant.Ward(gl), Trenchant.VertexShader(gl));   
    this.PhongMesh = createProgram(Trenchant.PhongShader(gl), Trenchant.VertexShader(gl));
    this.TorranceMesh = createProgram(Trenchant.Cook_Torrance(gl), Trenchant.VertexShader(gl));
    this.EnvMesh = createProgram(Trenchant.Cube_Frag(gl), Trenchant.VertexShader(gl));
    
    this.am = new Trenchant.Animate();
    this.wheel_rl = new Trenchant.Animate();
    this.wheel_rr = new Trenchant.Animate();
    this.wheel_fl = new Trenchant.Animate();
    this.wheel_fr = new Trenchant.Animate();
    

    
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
    this.carpaint.setTexture("textures/out11.jpg");       
    this.carpaint.ambientColorUniform = new Trenchant.Vector3(0.4, 0, 0);
    this.carpaint.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.carpaint.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.8, 0.09, 0.09);
    this.carpaint.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.3, 0.05, 0.05);
    this.carpaint.useTexturesUniform = "none";
    this.carpaint.samplerUniform  = 0;
    this.carpaint.reflectivityUniform  = 0.5;
    this.carpaint.materialShininessUniform = 32.0;
    var cube = [
        "textures/posx.jpg",
        "textures/negx.jpg",
        "textures/posy.jpg",
        "textures/negy.jpg",
        "textures/posz.jpg",
        "textures/negz.jpg",
    ];
    this.carpaint.setEnvTexture(cube);
    
    this.tire = new Trenchant.Material();
    this.tire.showSpecularHighlightsUniform = false;
    this.tire.useLightingUniform = true;
    this.tire.setTexture("textures/golden1.jpg");  
    this.tire.ambientColorUniform = new Trenchant.Vector3(0.2,0.19, 0.18);
    this.tire.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.tire.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.2,0.19, 0.18);
    this.tire.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.2,0.19, 0.18);   
    this.tire.useTexturesUniform = "none";
    this.tire.samplerUniform  = 0;
    this.tire.materialShininessUniform = 1;
    
    this.tire1 = new Trenchant.Material();
    this.tire1.showSpecularHighlightsUniform = false;
    this.tire1.useLightingUniform = true;
    this.tire1.setTexture("textures/silver3.jpg"); 
    this.tire1.ambientColorUniform = new Trenchant.Vector3(0.27, 0.27, 0.27);
    this.tire1.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.tire1.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.35, 0.35, 0.35);
    this.tire1.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.3, 0.3, 0.3);
    this.tire1.useTexturesUniform = "none";
    this.tire1.samplerUniform  = 0;
    this.tire1.materialShininessUniform = 1;
    
    this.tire2 = new Trenchant.Material();
    this.tire2.showSpecularHighlightsUniform = false;
    this.tire2.useLightingUniform = true;
    this.tire2.ambientColorUniform = new Trenchant.Vector3(0.07, 0.07, 0.07);
    this.tire2.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.tire2.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.15, 0.15, 0.15);
    this.tire2.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.05, 0.05, 0.05);
    this.tire2.useTexturesUniform = "none";
    this.tire2.samplerUniform  = 0;
    this.tire2.materialShininessUniform = 1;
    
    this.silver = new Trenchant.Material();
    this.silver.showSpecularHighlightsUniform = false;
    this.silver.useLightingUniform = true;
    this.silver.setTexture("textures/out11.jpg");
    this.silver.ambientColorUniform = new Trenchant.Vector3(0.2,0.2, 0.2);
    this.silver.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.silver.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.3,0.2, 0.2);
    this.silver.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.2,0.2, 0.2);
    
    this.silver1 = new Trenchant.Material();
    this.silver1.showSpecularHighlightsUniform = false;
    this.silver1.useLightingUniform = true;
    this.silver1.setTexture("textures/silver1.jpg");
    this.silver1.ambientColorUniform = new Trenchant.Vector3(0.5,0.5, 0.5);
    this.silver1.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.silver1.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.6,0.6, 0.6);
    this.silver1.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.55,0.55, 0.55);

    this.silver2 = new Trenchant.Material();
    this.silver2.showSpecularHighlightsUniform = false;
    this.silver2.useLightingUniform = true;
    this.silver2.setTexture("textures/silver3.jpg");
    this.silver2.ambientColorUniform = new Trenchant.Vector3(0.5,0.5, 0.5);
    this.silver2.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.silver2.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.6,0.6, 0.6);
    this.silver2.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.55,0.55, 0.55);
    
    this.silver3 = new Trenchant.Material();
    this.silver3.showSpecularHighlightsUniform = false;
    this.silver3.useLightingUniform = true;
    this.silver3.setTexture("textures/silver5.jpg");
    this.silver3.ambientColorUniform = new Trenchant.Vector3(0.75,0.75, 0.75);
    this.silver3.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.silver3.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.8,0.8, 0.8);
    this.silver3.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.7,0.7, 0.7);
    
    this.silver4 = new Trenchant.Material();
    this.silver4.showSpecularHighlightsUniform = false;
    this.silver4.useLightingUniform = true;
    this.silver4.setTexture("textures/silver6.jpg");
    this.silver4.ambientColorUniform = new Trenchant.Vector3(0.5,0.5, 0.5);
    this.silver4.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.silver4.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.4,0.4, 0.4);
    this.silver4.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.3,0.3, 0.3);
    
    this.plastic = new Trenchant.Material();
    this.plastic.showSpecularHighlightsUniform = true;
    this.plastic.useLightingUniform = true;
    this.plastic.setTexture("textures/red.jpg");
    this.plastic.ambientColorUniform = new Trenchant.Vector3(0.6, 0, 0);
    this.plastic.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.plastic.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.4, 0, 0);
    this.plastic.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.5, 0.1, 0.1);
    this.plastic.useTexturesUniform = "none";
    this.plastic.samplerUniform  = 0;
    this.plastic.materialShininessUniform = 32.0;
    
    this.plastic1 = new Trenchant.Material();
    this.plastic1.showSpecularHighlightsUniform = true;
    this.plastic1.useLightingUniform = true;
  //  this.plastic1.setTexture("textures/black.jpg");
    this.plastic1.ambientColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.plastic1.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.plastic1.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.plastic1.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.plastic1.useTexturesUniform = "none";
    this.plastic1.samplerUniform  = 0;
    this.plastic1.materialShininessUniform = 32.0;
    
    this.plastic2 = new Trenchant.Material();
    this.plastic2.showSpecularHighlightsUniform = true;
    this.plastic2.useLightingUniform = true;
  //  this.plastic2.setTexture("textures/blue11.jpg");
    this.plastic2.ambientColorUniform = new Trenchant.Vector3(0.1, 0.1, 0.1);
    this.plastic2.pointLightingLocationUniform = new Trenchant.Vector3(0, 90.0, 20.0);
    this.plastic2.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.15, 0.15, 0.15);
    this.plastic2.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.05, 0.05, 0.05);
    this.plastic2.useTexturesUniform = "none";
    this.plastic2.samplerUniform  = 0;
    this.plastic2.materialShininessUniform = 32.0;
    
    this.M3 = new Trenchant.Material();
    this.M3.showSpecularHighlightsUniform = false;
    this.M3.useLightingUniform = true;
    this.M3.ambientColorUniform = new Trenchant.Vector3(0.04, 0.04, 0.04);
    this.M3.pointLightingLocationUniform = new Trenchant.Vector3(-10, 4.0, -20.0);        
    this.M3.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.09, 0.09, 0.09);
    this.M3.useTexturesUniform = "none";
    this.M3.samplerUniform  = 0;
    this.M3.materialShininessUniform = 32.0;
    
    this.dark = new Trenchant.Material();
    this.dark.showSpecularHighlightsUniform = false;
    this.dark.useLightingUniform = true;
    this.dark.setTexture("textures/sit.jpg");
    this.dark.ambientColorUniform = new Trenchant.Vector3(0.0, 0, 0);
    this.dark.pointLightingLocationUniform = new Trenchant.Vector3(-10, 4.0, -20.0);        
    this.dark.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0, 0, 0);
    this.dark.useTexturesUniform = "none";
    this.dark.samplerUniform  = 0;
    this.dark.materialShininessUniform = 32.0;
    
    this.sit = new Trenchant.Material();
    this.sit.showSpecularHighlightsUniform = false;
    this.sit.useLightingUniform = true;
    this.sit.setTexture("textures/sit4.jpg");
    // this.sit.ambientColorUniform = new Trenchant.Vector3(0.1196078, 0.045098, 0.0098);
    // this.sit.pointLightingLocationUniform = new Trenchant.Vector3(-10, 4.0, -20.0);        
    // this.sit.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.2196078, 0.145098, 0.1098);    
    this.sit.ambientColorUniform = new Trenchant.Vector3(0.3, 0.3, 0.3);
    this.sit.pointLightingLocationUniform = new Trenchant.Vector3(-10, 4.0, -20.0);        
    this.sit.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.4, 0.4, 0.4);   
    this.sit.useTexturesUniform = "none";
    this.sit.samplerUniform  = 0;
    this.sit.materialShininessUniform = 32.0;
    
    
    this.M0 = new Trenchant.Material();
    this.M0.showSpecularHighlightsUniform = false;
    this.M0.useLightingUniform = true;
    this.M0.ambientColorUniform = new Trenchant.Vector3(0, 0, 1);
    this.M0.pointLightingLocationUniform = new Trenchant.Vector3(-10, 4.0, -20.0);        
    this.M0.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0, 0, 1);
    this.M0.useTexturesUniform = "none";
    this.M0.samplerUniform  = 0;
    this.M0.materialShininessUniform = 32.0;
    
    this.glass = new Trenchant.Material();
    this.glass.showSpecularHighlightsUniform = true;
    this.glass.useLightingUniform = true;
    this.glass.ambientColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.glass.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.glass.pointLightingSpecularColorUniform = new Trenchant.Vector3(1, 1, 1);
    this.glass.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.glass.useTexturesUniform = "none";
    this.glass.samplerUniform  = 0;
    this.glass.materialShininessUniform = 38;
    this.glass.alphaUniform = 0.9;
    this.glass.reflectivityUniform  = 0.9;
    this.glass.setEnvTexture(cube);
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