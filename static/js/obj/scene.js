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

    /*Yellow_marble0*/

    this.Yellow_marble0 = new Trenchant.Material();
    this.Yellow_marble0.showSpecularHighlightsUniform = true;
    this.Yellow_marble0.useLightingUniform = true;
    this.Yellow_marble0.ambientColorUniform = new Trenchant.Vector3(0, 0, 0);
    this.Yellow_marble0.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.Yellow_marble0.pointLightingSpecularColorUniform = new Trenchant.Vector3(1, 1, 1);
    this.Yellow_marble0.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.852891, 0.773297, 0.659592);
    this.Yellow_marble0.setTexture("textures/bridge/marble.jpg");
    this.Yellow_marble0.useTexturesUniform = "none";
    this.Yellow_marble0.samplerUniform  = 0;
    this.Yellow_marble0.materialShininessUniform = 8.16617;

    /*Metallic_Varnish*/

    this.Metallic_Varnish = new Trenchant.Material();
    this.Metallic_Varnish.showSpecularHighlightsUniform = true;
    this.Metallic_Varnish.useLightingUniform = true;
    this.Metallic_Varnish.ambientColorUniform = new Trenchant.Vector3(0, 0, 0);
    this.Metallic_Varnish.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.Metallic_Varnish.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.733333, 0.92549, 1);
    this.Metallic_Varnish.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.823529, 0, 0.0352941);
    this.Metallic_Varnish.setTexture("textures/bridge/Metallic_Varnish.jpg");
    this.Metallic_Varnish.useTexturesUniform = "none";
    this.Metallic_Varnish.samplerUniform  = 0;
    this.Metallic_Varnish.materialShininessUniform = 3.32012;

    /*Metal0*/
    this.Metal0 = new Trenchant.Material();
    this.Metal0.showSpecularHighlightsUniform = true;
    this.Metal0.useLightingUniform = true;
    this.Metal0.ambientColorUniform = new Trenchant.Vector3(0, 0, 0);
    this.Metal0.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.Metal0.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.666667, 0.839216, 0.976471);
    this.Metal0.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.410314, 0.471725, 0.47824);
    this.Metal0.setTexture("textures/bridge/black.jpg");
    this.Metal0.useTexturesUniform = "none";
    this.Metal0.samplerUniform  = 0;
    this.Metal0.materialShininessUniform = 15.7998;

    /*Silver*/
    this.silver = new Trenchant.Material();
    this.silver.showSpecularHighlightsUniform = false;
    this.silver.useLightingUniform = true;
    this.silver.setTexture("textures/bridge/silver.jpg");
    this.silver.ambientColorUniform = new Trenchant.Vector3(0.5,0.5, 0.5);
    this.silver.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.silver.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.4,0.4, 0.4);
    this.silver.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.3,0.3, 0.3);
    this.silver.useTexturesUniform = "none";
    this.silver.samplerUniform  = 0;
    this.silver.materialShininessUniform = 15.7998;

    /*Pewter*/
    this.Pewter = new Trenchant.Material();
    this.Pewter.showSpecularHighlightsUniform = false;
    this.Pewter.useLightingUniform = true;
    this.Pewter.setTexture("textures/bridge/Pewter.jpg");
    this.Pewter.ambientColorUniform = new Trenchant.Vector3(0,0,0);
    this.Pewter.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.Pewter.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.835294, 0.921569, 1);
    this.Pewter.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.603922, 0.603922, 0.603922);
    this.Pewter.useTexturesUniform = "none";
    this.Pewter.samplerUniform  = 0;
    this.Pewter.materialShininessUniform = 20.0855;

    /*Dry_grass*/
    this.Dry_grass = new Trenchant.Material();
    this.Dry_grass.showSpecularHighlightsUniform = false;
    this.Dry_grass.useLightingUniform = true;
    this.Dry_grass.setTexture("textures/bridge/grass.jpg");
    this.Dry_grass.ambientColorUniform = new Trenchant.Vector3(0,0,0);
    this.Dry_grass.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.Dry_grass.pointLightingSpecularColorUniform = new Trenchant.Vector3(1, 1, 1);
    this.Dry_grass.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.563382, 0.497095, 0.300868);
    this.Dry_grass.useTexturesUniform = "none";
    this.Dry_grass.samplerUniform  = 0;
    this.Dry_grass.materialShininessUniform = 3.35721;


    /*rock*/
    this.rock = new Trenchant.Material();
    this.rock.showSpecularHighlightsUniform = false;
    this.rock.useLightingUniform = true;
    this.rock.setTexture("textures/bridge/rock.jpg");
    this.rock.ambientColorUniform = new Trenchant.Vector3(0,0,0);
    this.rock.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.rock.pointLightingSpecularColorUniform = new Trenchant.Vector3(1, 1, 1);
    this.rock.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.565874, 0.552278, 0.54372);
    this.rock.useTexturesUniform = "none";
    this.rock.samplerUniform  = 0;
    this.rock.materialShininessUniform = 8.16617;

    /*Flat_gray*/
    this.Flat_gray = new Trenchant.Material();
    this.Flat_gray.showSpecularHighlightsUniform = false;
    this.Flat_gray.useLightingUniform = true;
    this.Flat_gray.setTexture("textures/bridge/Flat_gray.jpg");
    this.Flat_gray.ambientColorUniform = new Trenchant.Vector3(0,0,0);
    this.Flat_gray.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.Flat_gray.pointLightingSpecularColorUniform = new Trenchant.Vector3(1, 1, 1);
    this.Flat_gray.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.501961, 0.501961, 0.501961);
    this.Flat_gray.useTexturesUniform = "none";
    this.Flat_gray.samplerUniform  = 0;
    this.Flat_gray.materialShininessUniform = 8.16617;

    /*asphalt*/
    this.asphalt = new Trenchant.Material();
    this.asphalt.showSpecularHighlightsUniform = false;
    this.asphalt.useLightingUniform = true;
    this.asphalt.setTexture("textures/bridge/asphalt.png");
    this.asphalt.ambientColorUniform = new Trenchant.Vector3(0,0,0);
    this.asphalt.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.asphalt.pointLightingSpecularColorUniform = new Trenchant.Vector3(0.603922, 0.654902, 0.686275);
    this.asphalt.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.261573, 0.261136, 0.260263);
    this.asphalt.useTexturesUniform = "none";
    this.asphalt.samplerUniform  = 0;
    this.asphalt.materialShininessUniform = 1;

    /*porcelaine*/
    this.porcelaine = new Trenchant.Material();
    this.porcelaine.showSpecularHighlightsUniform = false;
    this.porcelaine.useLightingUniform = true;
    this.porcelaine.setTexture("textures/bridge/porcelaine.jpg");
    this.porcelaine.ambientColorUniform = new Trenchant.Vector3(0,0,0);
    this.porcelaine.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.porcelaine.pointLightingSpecularColorUniform = new Trenchant.Vector3(1, 1, 1);
    this.porcelaine.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.862745, 0.866667, 0.905882);
    this.porcelaine.useTexturesUniform = "none";
    this.porcelaine.samplerUniform  = 0;
    this.porcelaine.materialShininessUniform = 164.022;

    /*white*/
    this.white = new Trenchant.Material();
    this.white.showSpecularHighlightsUniform = false;
    this.white.useLightingUniform = true;
    this.white.setTexture("textures/bridge/white.jpg");
    this.white.ambientColorUniform = new Trenchant.Vector3(0,0,0);
    this.white.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.white.pointLightingSpecularColorUniform = new Trenchant.Vector3(1, 1, 1);
    this.white.pointLightingDiffuseColorUniform = new Trenchant.Vector3(1, 1, 1);
    this.white.useTexturesUniform = "none";
    this.white.samplerUniform  = 0;
    this.white.materialShininessUniform = 8.16617;

    /*Techo*/
    this.Techo = new Trenchant.Material();
    this.Techo.showSpecularHighlightsUniform = false;
    this.Techo.useLightingUniform = true;
    this.Techo.setTexture("textures/bridge/Techo.jpg");
    this.Techo.ambientColorUniform = new Trenchant.Vector3(0,0,0);
    this.Techo.pointLightingLocationUniform = new Trenchant.Vector3(90, 90.0, -20.0);
    this.Techo.pointLightingSpecularColorUniform = new Trenchant.Vector3(1, 1, 1);
    this.Techo.pointLightingDiffuseColorUniform = new Trenchant.Vector3(0.294118, 0.294118, 0.294118);
    this.Techo.useTexturesUniform = "none";
    this.Techo.samplerUniform  = 0;
    this.Techo.materialShininessUniform = 1;

    var scope = this;
        
    loader.load("obj/bridge2.obj", function(objects){
        scope.object3d=new Trenchant.Object3D(objects);        
        
        for (var key in scope.object3d.obj_dict){
            scope.object3d.obj_dict[key].shaderProgram=scope.PhongMesh;
            scope.object3d.obj_dict[key].material = scope.M1;
            scope.object3d.obj_dict[key].animation = scope.am;
            console.log("part: "+key);
        }
        
        scope.object3d.obj_dict["PYLONFAC01"].material = scope.Yellow_marble0;
        scope.object3d.obj_dict["PYLONTUN01"].material = scope.Metallic_Varnish;
        scope.object3d.obj_dict["UNDERROA01"].material = scope.Metal0;
        scope.object3d.obj_dict["POLEFACE01"].material = scope.Yellow_marble0;
        scope.object3d.obj_dict["ARCHSPAC01"].material = scope.Metal0;
        scope.object3d.obj_dict["ARCHZIGZ01"].material = scope.Metal0;
        scope.object3d.obj_dict["ARCHFACE01"].material = scope.silver;
        scope.object3d.obj_dict["ARCHHANG01"].material = scope.silver;
        scope.object3d.obj_dict["LIGHTARM01"].material = scope.Pewter;
        scope.object3d.obj_dict["GRASSFAC01"].material = scope.Dry_grass;
        scope.object3d.obj_dict["BLOCKSID01"].material = scope.silver;
        scope.object3d.obj_dict["SEAROADF01"].material = scope.Flat_gray;
        scope.object3d.obj_dict["SEAWALLF01"].material = scope.rock;
        scope.object3d.obj_dict["ROADWAYF01"].material = scope.asphalt;
        scope.object3d.obj_dict["UNDERROA02"].material = scope.silver;
        //scope.object3d.obj_dict["RAILINGS01"].material = scope.porcelaine;
        scope.object3d.obj_dict["ARMCOFAC01"].material = scope.white;
        scope.object3d.obj_dict["FIXTURES01"].material = scope.Techo;
        scope.object3d.obj_dict["PYLONJOI01"].material = scope.Yellow_marble0;
        scope.object3d.obj_dict["LINESFAC01"].material = scope.white;

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