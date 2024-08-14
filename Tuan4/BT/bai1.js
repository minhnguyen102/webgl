var VSHADER_SOURCE = 
    'uniform mat4 u_xformMatrix;\n'+ 
    'attribute vec4 a_Position;\n'+
    'void main() {\n'+
    '   gl_Position = u_xformMatrix * a_Position;\n'+
    '}\n';

var FSHADER_SOURCE = 
    'void main() {\n'+
    '   gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);\n'+
    '}\n';

const main = () => {
    var canvas = document.querySelector("#canvas");
    var gl = getWebGLContext(canvas);
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    var n = initVertexBuffers(gl);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

const initVertexBuffers = (gl) => {
    var g_point = new Float32Array([
        0.0, 0.25,
        -0.25, -0.25,
        0.25, -0.25
    ])
    var n = 3;

    // thứ tự hoạt động ngược từ dưới lên: đề bài yêu cầu xoay rồi tịnh tiến thì cần set tịnh tiến sau đó là xoay
    var xformMatrix = new Matrix4();
	xformMatrix.setTranslate(+0.5, 0,0, 0.0);
	xformMatrix.rotate(45,0,0,1)
	

    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
	gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);
    	

    var vertexBuffer = gl.createBuffer(); // anh bom ra doi
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // gan cho co vo
    gl.bufferData(gl.ARRAY_BUFFER, g_point, gl.STATIC_DRAW); //lay cua hoi mon tu co gai
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0); // di tim ong tho xay
    gl.enableVertexAttribArray(a_Position);
    
    return n;
}
