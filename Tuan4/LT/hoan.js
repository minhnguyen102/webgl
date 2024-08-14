var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n'+
  'uniform mat4 u_xformMatrix;\n'+  
  'void main() {\n' +
	'gl_Position=  u_xformMatrix * a_Position  ;\n'+
  '}\n'
 var FSHADER_SOURCE =
	'void main(){\n'+
	'gl_FragColor = vec4(0.5,0.5,1.0,1.0);\n'+
	'}\n'
function main(){
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);

	// bộ đệm đối tượng
	var Hoimon = new Float32Array([
				0.0, 0.5,
				-0.5, -0.5,
				0.5, -0.5 ]);

	// khởi tạo ma trận
	var xformMatrix = new Matrix4();
	xformMatrix.setTranslate(-0.5, -0.5, 0.0);
	xformMatrix.scale(0.5, 0.5, 1.0);
	xformMatrix.translate(0.5, 0.5, 0.0);	
	
	// khởi tạo chương trình
	initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	// lấy các biến thuộc tính
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
	gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);	

	// 5 bước của bộ đệm đối tượng
	var Bom = gl.createBuffer();	// bom ra đời
	gl.bindBuffer(gl.ARRAY_BUFFER, Bom); // gán cho vợ 
	gl.bufferData(gl.ARRAY_BUFFER, Hoimon, gl.STATIC_DRAW); // lấy của hồi môn 
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0); // truyền cho thợ được thuê 
	gl.enableVertexAttribArray(a_Position); // xây

	// đổ màu và vẽ
	gl.clearColor(0.0, 0.8, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}
