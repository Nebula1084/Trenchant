/* global gl */
/* global Trenchant */
Trenchant = function(){
};

Trenchant.Vector2 = function ( x, y ) {

	this.x = x || 0;
	this.y = y || 0;

};

Trenchant.Vector2.prototype = {

	constructor: Trenchant.Vector2,
	
	clone: function () {

		return new this.constructor( this.x, this.y );

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;

		return this;

	},

	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'Trenchant.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;

		return this;

	},

	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;

	},
	
	subScalar: function ( s ) {

		this.x -= s;
		this.y -= s;

		return this;

	},

	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	},
	
	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y );

	},

	lengthManhattan: function() {

		return Math.abs( this.x ) + Math.abs( this.y );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	}
}

Trenchant.Vector3 = function(x, y, z){
	this.x=x || 0;
	this.y=y || 0;
	this.z=z || 0;	
};

Trenchant.Vector3.prototype = {
	constructor: Trenchant.Vector4,
	
	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	},
	
	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'Trenchant.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	},
	
	multiplyScalar: function ( scalar ) {

		if ( isFinite( scalar ) ) {
			this.x *= scalar;
			this.y *= scalar;
			this.z *= scalar;
		} else {
			this.x = 0;
			this.y = 0;
			this.z = 0;
		}

		return this;

	},	
	
	divideScalar: function ( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	},
	
	cross: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'Trenchant.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
			return this.crossVectors( v, w );

		}

		var x = this.x, y = this.y, z = this.z;

		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;

		return this;

	},
	
	subScalar: function ( s ) {

		this.x -= s;
		this.y -= s;
		this.z -= s;

		return this;

	},

	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	},
	
	crossVectors: function ( a, b ) {

		var ax = a.x, ay = a.y, az = a.z;
		var bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	},
	
	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	},

	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},
	
	clone: function () {

		return new this.constructor( this.x, this.y, this.z);

	}
}

Trenchant.Vector4 = function(x, y, z, w){
	this.x=x || 0;
	this.y=y || 0;
	this.z=z || 0;
	this.w=w || 0;
};

Trenchant.Vector4.prototype = {
	constructor: Trenchant.Vector4,
	
	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'Trenchant.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;

		return this;

	},
	
	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;

		return this;

	},

	subScalar: function ( s ) {

		this.x -= s;
		this.y -= s;
		this.z -= s;
		this.w -= s;

		return this;

	},

	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;

		return this;

	},
	
	multiplyScalar: function ( scalar ) {

		if ( isFinite( scalar ) ) {
			this.x *= scalar;
			this.y *= scalar;
			this.z *= scalar;
			this.w *= scalar;
		} else {
			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 0;
		}

		return this;

	},
	
	divideScalar: function ( scalar ) {

		return this.multiplyScalar( 1 / scalar );

	},
	
	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

	},

	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},
		
	clone: function () {

		return new this.constructor( this.x, this.y, this.z, this.w );

	}
}

Trenchant.Object = function(object){
	var geometry = object.geometry;
        
	this.vertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.normals), gl.STATIC_DRAW);
	this.vertexNormalBuffer.itemSize = 3;
	this.vertexNormalBuffer.numItems = geometry.normals.length / 3;

	this.vertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.uvs), gl.STATIC_DRAW);
	this.vertexTextureCoordBuffer.itemSize = 2;
	this.vertexTextureCoordBuffer.numItems = geometry.uvs.length / 2;

	this.vertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.vertices), gl.STATIC_DRAW);
	this.vertexPositionBuffer.itemSize = 3;
	this.vertexPositionBuffer.numItems = geometry.vertices.length / 3;       
};

Trenchant.Object.prototype = {
	constructor: Trenchant.Object,
	draw: function(){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
        gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, this.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
                
        gl.drawArrays(gl.TRIANGLES, 0, this.vertexNormalBuffer.numItems); 
	}
};


Trenchant.Object3D = function(objects){
	this.obj_dict = [];
	for (var i = 0, l = objects.length; i < l; i ++){
		if (objects[i].name == "") continue;
		this.obj_dict[objects[i].name]=new Trenchant.Object(objects[i]);
	}
};

Trenchant.Object3D.prototype = {
	constructor: Trenchant.Object3D,
	draw: function(){
		for (var key in this.obj_dict){
			this.obj_dict[key].draw();
		}
	}
};

Trenchant.Part = function(geometry){
	this.vertexNormalBuffer = gl.createBuffer();
	var test = new Float32Array(geometry.normals)
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.normals), gl.STATIC_DRAW);
	this.vertexNormalBuffer.itemSize = 3;
	this.vertexNormalBuffer.numItems = geometry.normals.length / 3;

	this.vertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.uvs), gl.STATIC_DRAW);
	this.vertexTextureCoordBuffer.itemSize = 2;
	this.vertexTextureCoordBuffer.numItems = geometry.uvs.length / 2;

	this.vertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.vertices), gl.STATIC_DRAW);
	this.vertexPositionBuffer.itemSize = 3;
	this.vertexPositionBuffer.numItems = geometry.vertices.length / 3;
	
	this.vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(geometry.indices), gl.STATIC_DRAW);
    this.vertexIndexBuffer.itemSize = 1;
    this.vertexIndexBuffer.numItems = geometry.indices.length;
};

Trenchant.Part.prototype = {
	constructor: Trenchant.Object,
	draw: function(){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
        gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
        gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute, this.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
                
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);  		      
        gl.drawElements(gl.TRIANGLES, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	}
};

Trenchant.Geometry = function () {		

	this.name = '';
	this.type = 'Geometry';

	this.vertices = [];
	this.uvs = [];
	this.normals = [];
	this.indices = [];


};

Trenchant.Geometry.prototype = {

	constructor: Trenchant.Geometry,
	

}

Trenchant.ParametricGeometry = function ( func, slices, stacks ) {

	Trenchant.Geometry.call( this );

	this.type = 'ParametricGeometry';

	this.parameters = {
		func: func,
		slices: slices,
		stacks: stacks
	};

	var verts = [];
	var uvs = [];
	var normals = [];
	var indices = [];

	var i, j, p;
	var u, v;

	var sliceCount = slices + 1;

	for ( i = 0; i <= stacks; i ++ ) {

		v = i / stacks;

		for ( j = 0; j <= slices; j ++ ) {

			u = j / slices;

			p = func( u, v );			
			verts.push( p );
			uvs.push(new Trenchant.Vector2(u, v));
			normals.push(new Trenchant.Vector3(0, 0, 0));
		}

	}

	var a, b, c, d;	
	var ab = new Trenchant.Vector3(), cb = new Trenchant.Vector3();
	var ad = new Trenchant.Vector3(), cd = new Trenchant.Vector3();
	var bd = new Trenchant.Vector3();
		
	var na = new Trenchant.Vector3(), nc = new Trenchant.Vector3();
	
	
	for ( i = 0; i < stacks; i ++ ) {

		for ( j = 0; j < slices; j ++ ) {

			a = i * sliceCount + j;
			b = i * sliceCount + j + 1;
			c = ( i + 1 ) * sliceCount + j + 1;
			d = ( i + 1 ) * sliceCount + j;
			ab.subVectors(verts[a], verts[b]);
			cb.subVectors(verts[c], verts[b]);
			ad.subVectors(verts[a], verts[d]);
			cd.subVectors(verts[c], verts[d]);
			bd.subVectors(verts[b], verts[d]);
			
			na.crossVectors(ad, ab);
			na.normalize();
			nc.crossVectors(cb, cd);
			nc.normalize();
			
			normals[a].add(na);
			normals[b].add(na);
			normals[b].add(nc);
			normals[c].add(nc);
			normals[d].add(nc);
			normals[d].add(na);
			
			indices.push(a, b, d);
			indices.push(d, c, b);
		}

	}
	
	var it, l;
	for (it=0, l=normals.length; it<l; it++){
		normals[it].normalize();
		this.normals.push(normals[it].x, normals[it].y, normals[it].z);
	}
	
	for (it=0, l=verts.length; it<l; it++){		
		this.vertices.push(verts[it].x, verts[it].y, verts[it].z);
	}
	
	for (it=0, l=uvs.length; it<l; it++){		
		this.uvs.push(uvs[it].x, uvs[it].y);
	}
	
	for (it=0, l=indices.length; it<l; it++){		
		this.indices.push(indices[it]);
	}
	
	
};