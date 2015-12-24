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

Trenchant.ParametricGeometry = function ( func, slices, stacks, hole ) {

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
			
			if (hole != undefined)
				if (hole(verts[a]) || hole(verts[b]) || hole[c] || hole[d])
					continue;
			
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