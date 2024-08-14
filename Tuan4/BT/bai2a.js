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
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ])
    var n = 3;

    // thu nhỏ với điểm cố định là gốc tọa độ
    var xformMatrix = new Matrix4();
	xformMatrix.setScale(0.5, 0.5,0.5);
    // xformMatrix.scale(0.5, 0.5,0.5);
    // setScale hay scale đều dùng được trong trường hợp này, tuy nhiên nên dùng setScale vì nó có thể clear toàn bộ matrix khởi tạo ban đầu (tính quân phiệt)
	
	

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
