var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n'+
  'uniform mat4 u_xformMatrix;\n'+  
  'void main() {\n' +
	'gl_Position= u_xformMatrix * a_Position  ;\n'+
  '}\n'
 var FSHADER_SOURCE =
	'void main(){\n'+
	'gl_FragColor = vec4(0.5,0.5,1.0,1.0);\n'+
	'}\n'
function main(){
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	//==============
	var Hoimon=[];
	var step = 2*3.14 / 100.0;
	var i;
	var angle, r;
	//=========hinh non
	for (i = 0; i < 100; i+=2) {
		r = 0.5;
		angle = i * step;
		Hoimon.push(0.0);Hoimon.push(0.0);Hoimon.push(1.0);
		Hoimon.push(r * Math.cos(angle));
		Hoimon.push(r * Math.sin(angle));
		Hoimon.push(0.0);
		angle = (i+1) * step;
		Hoimon.push(r * Math.cos(angle));
		Hoimon.push(r * Math.sin(angle));
		Hoimon.push(0.0);
    }
	Hoimon.push(0.0);Hoimon.push(0.0);Hoimon.push(1.0);
	Hoimon.push(r*Math.cos(0));Hoimon.push(r*Math.sin(0));Hoimon.push(0.0);
	
	initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	var xformMatrix = new Matrix4();
	xformMatrix.setRotate(60, -1.0, -1.0, -1.0);
	//xformMatrix.setScale(0.5, 0.5, 1.0);
	//xformMatrix.rotate(30, 1.0, 1.0, 1.0);
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
	gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);	
	var Bom = gl.createBuffer();	
	gl.bindBuffer(gl.ARRAY_BUFFER, Bom);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Hoimon), gl.STATIC_DRAW);
	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(a_Position);	
	gl.clearColor(0.0, 0.8, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	for(var i = 0; i < 150; i++)//ve hinh non co vien
		gl.drawArrays(gl.LINE_LOOP, i, 3);	
	
}


						