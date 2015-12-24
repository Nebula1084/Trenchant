Trenchant.Car = function(){
    var loader = new Trenchant.OBJLoader();
    loader.load("obj/car.obj", function(objects){
        this.object3d=new Trenchant.Object3D(objects);
        for (var key in this.object3d.obj_dict){
            this.object3d.obj_dict[key].shaderProgram=shaderProgram;
            console.log("part: "+key);
        }
    });
};

Trenchant.Car.prototype = {
    constructor: Trenchant.Car,
    draw: function(){        
        this.object3d.draw();
    }  
};