/* global gl */
/* global Trenchant */
/* global mat4 */
/* global mat3 */
Trenchant.Car = function(){
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
        "HDM_04_10_glass",     //车窗大玻璃
        "HDM_04_10_glass_orange",    //小玻璃，忽略
        "HDM_04_10_glass_ms",      //车前灯玻璃
        "HDM_04_10_glass_black",     //车玻璃边线
        "HDM_04_10_glass_red_ms",    //车后灯玻璃
        "HDM_04_10_register_plate",   //车牌
        "HDM_04_10_taillight_glass"   //后车灯玻璃
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

    this.am = new Trenchant.Animate();
    this.wheel_rl = new Trenchant.Animate();
    this.wheel_rr = new Trenchant.Animate();
    this.wheel_fl = new Trenchant.Animate();
    this.wheel_fr = new Trenchant.Animate();


    var lightingLocation = new Trenchant.Vector3(90, 90.0, 200.0);


    this.M1 = new Trenchant.Material();
    this.M1.showSpecularHighlightsUniform = true;
    this.M1.useLightingUniform = true;
    this.M1.ambientColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.M1.pointLightingLocationUniform = lightingLocation // new Trenchant.Vector3(90, 90.0, -20.0);
    this.M1.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.8, 0.8, 0.1);
    this.M1.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.8, 0.8, 0.8);
    this.M1.useTexturesUniform = "none";
    this.M1.samplerUniform  = 0;
    this.M1.materialShininessUniform = 32.0;


    this.carpaint = new Trenchant.Material();
    this.carpaint.showSpecularHighlightsUniform = true;
    this.carpaint.useLightingUniform = true;
    this.carpaint.setTexture("textures/red11.jpg");
    this.carpaint.ambientColorUniform = new Trenchant.Vector3(0.4, 0.4, 0.4);
    this.carpaint.pointLightingLocationUniform = new Trenchant.Vector3(0, 9000.0, 2000.0);
    this.carpaint.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.6, 0.6, 0.6);
    this.carpaint.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.5, 0.5, 0.5);
    this.carpaint.useTexturesUniform = "none";
    this.carpaint.samplerUniform  = 0;
    this.carpaint.reflectivityUniform  = 0.3;
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
    this.tire.pointLightingLocationUniform = lightingLocation  //new Trenchant.Vector3(0, 90.0, 20.0);
    this.tire.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.2,0.19, 0.18);
    this.tire.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.2,0.19, 0.18);
    this.tire.useTexturesUniform = "none";
    this.tire.samplerUniform  = 0;
    this.tire.materialShininessUniform = 1;

    this.tire1 = new Trenchant.Material();
    this.tire1.showSpecularHighlightsUniform = false;
    this.tire1.useLightingUniform = true;
    this.tire1.setTexture("textures/silver6.jpg");
    this.tire1.ambientColorUniform = new Trenchant.Vector3(0.27, 0.27, 0.27);
    this.tire1.pointLightingLocationUniform = lightingLocation   //new Trenchant.Vector3(0, 90.0, 20.0);
    this.tire1.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.35, 0.35, 0.35);
    this.tire1.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.tire1.useTexturesUniform = "none";
    this.tire1.samplerUniform  = 0;
    this.tire1.materialShininessUniform = 1;

    this.tire2 = new Trenchant.Material();
    this.tire2.showSpecularHighlightsUniform = false;
    this.tire2.useLightingUniform = true;
    this.tire2.ambientColorUniform = new Trenchant.Vector3(0.07, 0.07, 0.07);
    this.tire2.pointLightingLocationUniform = lightingLocation   //new Trenchant.Vector3(0, 90.0, 20.0);
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
    this.silver.pointLightingLocationUniform = lightingLocation   //new Trenchant.Vector3(0, 90.0, 20.0);
    this.silver.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.3,0.2, 0.2);
    this.silver.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.2,0.2, 0.2);

    this.silver1 = new Trenchant.Material();
    this.silver1.showSpecularHighlightsUniform = false;
    this.silver1.useLightingUniform = true;
    this.silver1.setTexture("textures/silver1.jpg");
    this.silver1.ambientColorUniform = new Trenchant.Vector3(0.5,0.5, 0.5);
    this.silver1.pointLightingLocationUniform = lightingLocation   //new Trenchant.Vector3(0, 90.0, 20.0);
    this.silver1.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.6,0.6, 0.6);
    this.silver1.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.55,0.55, 0.55);

    this.silver2 = new Trenchant.Material();
    this.silver2.showSpecularHighlightsUniform = false;
    this.silver2.useLightingUniform = true;
    this.silver2.setTexture("textures/silver3.jpg");
    this.silver2.ambientColorUniform = new Trenchant.Vector3(0.5,0.5, 0.5);
    this.silver2.pointLightingLocationUniform =  lightingLocation   //new Trenchant.Vector3(0, 90.0, 20.0);
    this.silver2.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.6,0.6, 0.6);
    this.silver2.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.55,0.55, 0.55);

    this.silver3 = new Trenchant.Material();
    this.silver3.showSpecularHighlightsUniform = false;
    this.silver3.useLightingUniform = true;
    this.silver3.setTexture("textures/silver5.jpg");
    this.silver3.ambientColorUniform = new Trenchant.Vector3(0.75,0.75, 0.75);
    this.silver3.pointLightingLocationUniform = lightingLocation   //new Trenchant.Vector3(0, 90.0, 20.0);
    this.silver3.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.8,0.8, 0.8);
    this.silver3.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.7,0.7, 0.7);

    this.silver4 = new Trenchant.Material();
    this.silver4.showSpecularHighlightsUniform = false;
    this.silver4.useLightingUniform = true;
    this.silver4.setTexture("textures/silver6.jpg");
    this.silver4.ambientColorUniform = new Trenchant.Vector3(0.5,0.5, 0.5);
    this.silver4.pointLightingLocationUniform =  lightingLocation   //new Trenchant.Vector3(0, 90.0, 20.0);
    this.silver4.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.4,0.4, 0.4);
    this.silver4.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.3,0.3, 0.3);

    this.plastic = new Trenchant.Material();
    this.plastic.showSpecularHighlightsUniform = true;
    this.plastic.useLightingUniform = true;
    this.plastic.setTexture("textures/red.jpg");
    this.plastic.ambientColorUniform = new Trenchant.Vector3(0.6, 0, 0);
    this.plastic.pointLightingLocationUniform = lightingLocation  //new Trenchant.Vector3(0, 90.0, 20.0);
    this.plastic.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.4, 0, 0);
    this.plastic.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.5, 0.1, 0.1);
    this.plastic.useTexturesUniform = "none";
    this.plastic.samplerUniform  = 0;
    this.plastic.materialShininessUniform = 32.0;

    this.plastic1 = new Trenchant.Material();
    this.plastic1.showSpecularHighlightsUniform = true;
    this.plastic1.useLightingUniform = true;
    this.plastic1.ambientColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.plastic1.pointLightingLocationUniform = lightingLocation   //new Trenchant.Vector3(0, 90.0, 20.0);
    this.plastic1.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.plastic1.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.plastic1.useTexturesUniform = "none";
    this.plastic1.samplerUniform  = 0;
    this.plastic1.materialShininessUniform = 32.0;

    this.plastic2 = new Trenchant.Material();
    this.plastic2.showSpecularHighlightsUniform = true;
    this.plastic2.useLightingUniform = true;
    this.plastic2.ambientColorUniform = new Trenchant.Vector3(0.1, 0.1, 0.1);
    this.plastic2.pointLightingLocationUniform = lightingLocation   //new Trenchant.Vector3(0, 90.0, 20.0);
    this.plastic2.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.15, 0.15, 0.15);
    this.plastic2.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.05, 0.05, 0.05);
    this.plastic2.useTexturesUniform = "none";
    this.plastic2.samplerUniform  = 0;
    this.plastic2.materialShininessUniform = 32.0;

    this.M3 = new Trenchant.Material();
    this.M3.showSpecularHighlightsUniform = false;
    this.M3.useLightingUniform = true;
    this.M3.ambientColorUniform = new Trenchant.Vector3(0.04, 0.04, 0.04);
    this.M3.pointLightingLocationUniform = lightingLocation  //new Trenchant.Vector3(-10, 4.0, -20.0);
    this.M3.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.09, 0.09, 0.09);
    this.M3.useTexturesUniform = "none";
    this.M3.samplerUniform  = 0;
    this.M3.materialShininessUniform = 32.0;

    this.dark = new Trenchant.Material();
    this.dark.showSpecularHighlightsUniform = false;
    this.dark.useLightingUniform = true;
    this.dark.setTexture("textures/sit.jpg");
    this.dark.ambientColorUniform = new Trenchant.Vector3(0.3, 0.3, 0.3);
    this.dark.pointLightingLocationUniform = lightingLocation  //new Trenchant.Vector3(-10, 4.0, -20.0);
    this.dark.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.4, 0.4, 0.4);
    this.dark.useTexturesUniform = "none";
    this.dark.samplerUniform  = 0;
    this.dark.materialShininessUniform = 32.0;

    this.sit = new Trenchant.Material();
    this.sit.showSpecularHighlightsUniform = false;
    this.sit.useLightingUniform = true;
    this.sit.setTexture("textures/sit4.jpg");
    this.sit.ambientColorUniform = new Trenchant.Vector3(0.3, 0.3, 0.3);
    this.sit.pointLightingLocationUniform = lightingLocation  //new Trenchant.Vector3(-10, 4.0, -20.0);
    this.sit.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.4, 0.4, 0.4);
    this.sit.useTexturesUniform = "none";
    this.sit.samplerUniform  = 0;
    this.sit.materialShininessUniform = 32.0;


    this.M0 = new Trenchant.Material();
    this.M0.showSpecularHighlightsUniform = false;
    this.M0.useLightingUniform = true;
    this.M0.ambientColorUniform = new Trenchant.Vector3(0, 0, 1);
    this.M0.pointLightingLocationUniform = lightingLocation  //new Trenchant.Vector3(-10, 4.0, -20.0);
    this.M0.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0, 0, 1);
    this.M0.useTexturesUniform = "none";
    this.M0.samplerUniform  = 0;
    this.M0.materialShininessUniform = 32.0;

    this.glass = new Trenchant.Material();
    this.glass.showSpecularHighlightsUniform = true;
    this.glass.useLightingUniform = true;
    this.glass.ambientColorUniform = new Trenchant.Vector3(0.6, 0.6, 0.6);
    this.glass.pointLightingLocationUniform = lightingLocation   //new Trenchant.Vector3(90, 90.0, -20.0);
    this.glass.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.8, 0.8, 0.8);
    this.glass.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.7, 0.7, 0.7);
    this.glass.useTexturesUniform = "none";
    this.glass.samplerUniform  = 0;
    this.glass.materialShininessUniform = 38;
    this.glass.alphaUniform = 0.5;
    this.glass.reflectivityUniform  = 0.9;
    this.glass.setEnvTexture(cube);

    this.glass1 = new Trenchant.Material();
    this.glass1.showSpecularHighlightsUniform = true;
    this.glass1.useLightingUniform = true;
    this.glass1.ambientColorUniform = new Trenchant.Vector3(0.5, 0.5, 0.5);
    this.glass1.pointLightingLocationUniform =  lightingLocation  //new Trenchant.Vector3(90, 90.0, -20.0);
    this.glass1.pointLightingSpecularColorUniform = new Trenchant.Vector3(1, 1, 1);
    this.glass1.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.2, 0.2, 0.2);
    this.glass1.useTexturesUniform = "none";
    this.glass1.samplerUniform  = 0;
    this.glass1.materialShininessUniform = 38;
    this.glass1.alphaUniform = 0.2;

    this.glass2 = new Trenchant.Material();
    this.glass2.showSpecularHighlightsUniform = true;
    this.glass2.useLightingUniform = true;
    this.glass2.ambientColorUniform = new Trenchant.Vector3(0.8, 0.8, 0.8);
    this.glass2.pointLightingLocationUniform =  lightingLocation  //new Trenchant.Vector3(90, 90.0, -20.0);
    this.glass2.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.85, 0.85, 0.85);
    this.glass2.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.7, 0.7, 0.7);
    this.glass2.useTexturesUniform = "none";
    this.glass2.samplerUniform  = 0;
    this.glass2.materialShininessUniform = 38;
    this.glass2.alphaUniform = 0.9;
    this.glass2.reflectivityUniform  = 1.0;
    this.glass2.setEnvTexture(cube);


    this.glass3 = new Trenchant.Material();
    this.glass3.showSpecularHighlightsUniform = true;
    this.glass3.useLightingUniform = true;
    this.glass3.ambientColorUniform = new Trenchant.Vector3(0.5, 0, 0);
    this.glass3.pointLightingLocationUniform = lightingLocation  //new Trenchant.Vector3(90, 90.0, -20.0);
    this.glass3.pointLightingSpecularColorUniform = new Trenchant.Vector3(1, 1, 1);
    this.glass3.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.2, 0, 0);
    this.glass3.useTexturesUniform = "none";
    this.glass3.samplerUniform  = 0;
    this.glass3.materialShininessUniform = 38;
    this.glass3.alphaUniform = 0.2;

    var scope = this;

    loader.load("obj/car3.obj", function(objects){
        scope.object3d=new Trenchant.Object3D(objects);
        scope.object3d.drawSequence=scope.drawSequence;

        for (var key in scope.object3d.obj_dict){
            scope.object3d.obj_dict[key].shaderProgram=scope.WardMesh;
            scope.object3d.obj_dict[key].material = scope.M1;
            scope.object3d.obj_dict[key].animation = scope.am;
            console.log("part: "+key);
        }

        scope.object3d.obj_dict["HDM_04_10_tire_fl"].animation = scope.wheel_fl;
        scope.object3d.obj_dict["HDM_04_10_tire_fr"].animation = scope.wheel_fr;
        scope.object3d.obj_dict["HDM_04_10_tire_rr"].animation = scope.wheel_rr;
        scope.object3d.obj_dict["HDM_04_10_tire_rl"].animation = scope.wheel_rl;

        scope.object3d.obj_dict["HDM_04_10_rim_rl"].animation = scope.wheel_rl;
        scope.object3d.obj_dict["HDM_04_10_rim_rr"].animation = scope.wheel_rr;
        scope.object3d.obj_dict["HDM_04_10_rim_fl"].animation = scope.wheel_fl;
        scope.object3d.obj_dict["HDM_04_10_rim_fr"].animation = scope.wheel_fr;

       scope.object3d.obj_dict["HDM_04_10_chrome_ms"].material = scope.silver4;
       scope.object3d.obj_dict["HDM_04_10_brake_disc_3_fr"].material = scope.tire1;
       scope.object3d.obj_dict["HDM_04_10_brake_caliper_2_fr"].material = scope.tire;
       scope.object3d.obj_dict["HDM_04_10_chrome_fr"].material = scope.tire;
       scope.object3d.obj_dict["HDM_04_10_brake_disc_2_r"].material = scope.tire1;
       scope.object3d.obj_dict["HDM_04_10_brake_disc_3_r"].material = scope.tire1;
       scope.object3d.obj_dict["HDM_04_10_chrome_fl"].material = scope.tire;
       scope.object3d.obj_dict["HDM_04_10_chrome_r"].material = scope.tire;
       scope.object3d.obj_dict["HDM_04_10_brake_caliper_fr"].material = scope.carpaint;
       scope.object3d.obj_dict["HDM_04_10_brake_caliper_fl"].material = scope.carpaint;
       scope.object3d.obj_dict["HDM_04_10_brake_caliper_2_fl"].material = scope.carpaint;
       scope.object3d.obj_dict["HDM_04_10_brake_caliper_r"].material = scope.carpaint;   //后轮胎左右阀

       scope.object3d.obj_dict["HDM_04_10_brake_caliper_2_r"].material = scope.carpaint;
       scope.object3d.obj_dict["HDM_04_10_brake_disc_shield_fl"].material = scope.tire1;
       scope.object3d.obj_dict["HDM_04_10_brake_disc_shield_fr"].material = scope.tire1;
       scope.object3d.obj_dict["HDM_04_10_brake_disc_shield_r"].material = scope.tire1;
       scope.object3d.obj_dict["HDM_04_10_gps_screen"].material = scope.dark;
       scope.object3d.obj_dict["HDM_04_10_front_logo"].material = scope.silver3;
       scope.object3d.obj_dict["HDM_04_10_speakers_net"].material = scope.silver2;
       scope.object3d.obj_dict["HDM_04_10_interior_silver_ms"].material = scope.silver;
       scope.object3d.obj_dict["HDM_04_10_gauges"].shaderProgram = scope.TorranceMesh;
       scope.object3d.obj_dict["HDM_04_10_gauges"].material = scope.plastic2;
       scope.object3d.obj_dict["HDM_04_10_taillight_chrome_ms"].shaderProgram = scope.TorranceMesh;
       scope.object3d.obj_dict["HDM_04_10_taillight_chrome_ms"].material = scope.plastic;
       scope.object3d.obj_dict["HDM_04_10_interior_dark"].material = scope.dark;
       scope.object3d.obj_dict["HDM_04_10_interior_dark_ms"].material = scope.dark;
       scope.object3d.obj_dict["HDM_04_10_chrome_glossy"].material = scope.dark;
       scope.object3d.obj_dict["HDM_04_10_chrome"].material = scope.silver1;
       scope.object3d.obj_dict["HDM_04_10_carpaint"].shaderProgram = scope.WardMesh;
       scope.object3d.obj_dict["HDM_04_10_carpaint"].material = scope.carpaint;

       scope.object3d.obj_dict["HDM_04_10_glass"].material = scope.M0;


        scope.object3d.obj_dict["HDM_04_10_mirrors"].material = scope.glass2;
        scope.object3d.obj_dict["HDM_04_10_glass_orange"].shaderProgram = scope.PhongMesh;
        scope.object3d.obj_dict["HDM_04_10_glass_orange"].material = scope.glass;
        scope.object3d.obj_dict["HDM_04_10_glass_ms"].shaderProgram = scope.PhongMesh;
        scope.object3d.obj_dict["HDM_04_10_glass_ms"].material = scope.glass1;    //前车灯玻璃
        scope.object3d.obj_dict["HDM_04_10_glass_black"].shaderProgram = scope.PhongMesh;
        scope.object3d.obj_dict["HDM_04_10_glass_black"].material = scope.dark;    //车玻璃边线
        scope.object3d.obj_dict["HDM_04_10_glass"].shaderProgram = scope.PhongMesh;
        scope.object3d.obj_dict["HDM_04_10_glass"].material = scope.glass;
        scope.object3d.obj_dict["HDM_04_10_glass_red_ms"].material = scope.glass3;       //车后灯玻璃外
        scope.object3d.obj_dict["HDM_04_10_taillight_glass"].material = scope.glass3;  //后车灯玻璃
        scope.object3d.obj_dict["HDM_04_10_register_plate"].material = scope.carpaint;      //车后牌
        scope.object3d.obj_dict["HDM_04_10_tire_fl"].material = scope.M3;
        //scope.object3d.obj_dict["HDM_04_10_tire_fl"].shaderProgram = scope.PhongMesh;
        scope.object3d.obj_dict["HDM_04_10_tire_fr"].material = scope.M3;
        scope.object3d.obj_dict["HDM_04_10_tire_rr"].material = scope.M3;
        scope.object3d.obj_dict["HDM_04_10_tire_rl"].material = scope.M3;

        scope.object3d.obj_dict["HDM_04_10_rim_rl"].material = scope.tire;
        scope.object3d.obj_dict["HDM_04_10_rim_rr"].material = scope.tire;
        scope.object3d.obj_dict["HDM_04_10_rim_fl"].material = scope.tire;
        scope.object3d.obj_dict["HDM_04_10_rim_fr"].material = scope.tire;
        scope.object3d.obj_dict["HDM_04_10_interior_red_ms"].shaderProgram = scope.TorranceMesh;
        scope.object3d.obj_dict["HDM_04_10_interior_red_ms"].material = scope.sit;    //车内饰

        scope.object3d.obj_dict["HDM_04_10_brake_disc_fl"].material = scope.tire1;
        scope.object3d.obj_dict["HDM_04_10_brake_disc_fr"].material = scope.tire1;
        scope.object3d.obj_dict["HDM_04_10_brake_disc_2_fl"].material = scope.tire1;
        scope.object3d.obj_dict["HDM_04_10_brake_disc_2_fr"].material = scope.tire1;
        scope.object3d.obj_dict["HDM_04_10_brake_disc_3_fl"].material = scope.tire1;
        scope.object3d.obj_dict["HDM_04_10_brake_disc_3_r"].material = scope.tire1;
        scope.object3d.obj_dict["HDM_04_10_brake_disc_r"].material = scope.tire1;

        scope.object3d.obj_dict["HDM_04_10_black_plastic_ms"].shaderProgram = scope.TorranceMesh;
        scope.object3d.obj_dict["HDM_04_10_black_plastic_ms"].material = scope.dark;   //车灯支架
    //    scope.object3d.obj_dict["HDM_04_10_black_plastic"].shaderProgram = scope.TorranceMesh;
        scope.object3d.obj_dict["HDM_04_10_black_plastic"].material = scope.plastic2;
    });
};

Trenchant.Car.prototype = {
    constructor: Trenchant.Car,
    setBodyAnimate: function(pMatrix, mvMatrix){
        this.am.pMatrix = pMatrix;
        this.am.mvMatrix = mvMatrix;
    },
    setWheelRL: function(pMatrix, mvMatrix){
        this.wheel_rl.pMatrix = pMatrix;
        this.wheel_rl.mvMatrix = mvMatrix;
    },
    setWheelRR: function(pMatrix, mvMatrix){
        this.wheel_rr.pMatrix = pMatrix;
        this.wheel_rr.mvMatrix = mvMatrix;
    },
    setWheelFL: function(pMatrix, mvMatrix){
        this.wheel_fl.pMatrix = pMatrix;
        this.wheel_fl.mvMatrix = mvMatrix;
    },
    setWheelFR: function(pMatrix, mvMatrix){
        this.wheel_fr.pMatrix = pMatrix;
        this.wheel_fr.mvMatrix = mvMatrix;
    },
    draw: function(){
        this.object3d.draw();
    },
    drawShadow: function() {
        this.object3d.drawShadow();
    }
};
