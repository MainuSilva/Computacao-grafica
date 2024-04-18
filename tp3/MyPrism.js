import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {

	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices; // number of sides
		this.stacks = stacks; // number of floors
		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		//Angle between each slice
		var angle = 2*Math.PI/this.slices;
		var increment = angle;
		
		//Vertices
		for (let j = 0; j < this.stacks; j++) {
			this.vertices.push(0, 0, j);
			increment = angle;
			this.normals.push(0, 0, 0);
			
			for (let i = 0; i < this.slices; i++) {
				this.vertices.push(Math.cos(increment), Math.sin(increment), j);
				this.vertices.push(Math.cos(increment), Math.sin(increment), j);

				this.normals.push(Math.cos(angle*(i+0.5)), Math.sin(angle*(i+0.5)), 0);
				this.normals.push(Math.cos(angle*(i+1.5)), Math.sin(angle*(i+1.5)), 0);

				increment += angle;
			}
		}

		//Indices
		for (let j = 0; j < this.stacks; j++) {
			for (let i = 2; i <= this.slices*2; i+=2) {
				if (i < this.slices*2-1) {
					// floor (created 2 to make it possible to see the object from both sides)
					this.indices.push((this.slices*2+1)*j, i+(this.slices*2+1)*j, i+1+(this.slices*2+1)*j);
					this.indices.push(i+1+(this.slices*2+1)*j, i+(this.slices*2+1)*j, (this.slices*2+1)*j);
					if (j == this.stacks-1) {
						continue;
					}
					// wall
					this.indices.push(i+(this.slices*2+1)*j, i+2+(this.slices*2+1)*j, i+2+(this.slices*2+1)+(this.slices*2+1)*j);
					this.indices.push(i+(this.slices*2+1)*j, i+2+(this.slices*2+1)+(this.slices*2+1)*j, i+(this.slices*2+1)+(this.slices*2+1)*j );
				}
				else {
					//floor (created 2 to make it possible to see the object from both sides)
					this.indices.push((this.slices*2+1)*j, i+(this.slices*2+1)*j, 1+(this.slices*2+1)*j);
					this.indices.push(1+(this.slices*2+1)*j, i+(this.slices*2+1)*j, (this.slices*2+1)*j);
					if (j == this.stacks-1) {
						continue;
					}
					// wall
					this.indices.push(i+(this.slices*2+1)*j,i-(this.slices*2)+2+(this.slices*2+1)*j,i-(this.slices*2)+(this.slices*2)+2+(this.slices*2+1)*j);
					this.indices.push(i+(this.slices*2+1)*j,i-(this.slices*2)+(this.slices*2)+2+(this.slices*2+1)*j,i+(this.slices*2+1)+(this.slices*2+1)*j);

				}
				
			}
		}

		this.initGLBuffers(); 
	}

	display() {	
		this.scene.pushMatrix();
		//this.scene.rotate(0.5 * Math.PI, -1, 0, 0);
		super.display();
		this.scene.popMatrix();
	}
	
	updateBuffers(complexity){
    }
}
