var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n'+ // khai báo biến thuộc tính 
  'uniform mat4 u_xformMatrix;\n'+ // khia bóa biến đồng nhất 
  'void main() {\n' +
	'gl_Position = u_xformMatrix * a_Position;\n'+ // tính ra kết quả 
  '}\n'
 var FSHADER_SOURCE =
	'void main(){\n'+
	'gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n'+
	'}\n'
function main(){
	var canvas = document.querySelector("#canvas")
	var gl = getWebGLContext(canvas);
	var xformMatrix = new Float32Array([
						0.5, 0.0, 0.0, 0.0,
						0.0, 0.5, 0, 0,
						0.0, 0.0, 1, 0,
						0.75, 0.75, 0, 1]);	
	var Hoimon=[];
	var step = 2*3.14 / 100.0;
	var i;
	var angle, r;
	for (i = 0; i < 100; ++i) {
		r = 0.5;
		angle = i * step;
		Hoimon.push(r * Math.cos(angle));
		Hoimon.push(r * Math.sin(angle));
    }	
	initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

	// truyền biến đòng nhất, là cách truyền ma trận 
	var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
	gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);	
	
	// truyền biến thuộc tính
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

	var Bom = gl.createBuffer();	
	gl.bindBuffer(gl.ARRAY_BUFFER, Bom);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Hoimon),gl.STATIC_DRAW);
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(a_Position);	

	
	gl.clearColor(0.0, 0.8, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 100);
}