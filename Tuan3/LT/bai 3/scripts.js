var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n'+
    'uniform mat4 u_xformMatrix;\n'+
    'void main() {\n'+
    '   gl_Position = u_xformMatrix * a_Position;\n'+
    '}\n';

var FSHADER_SOURCE = 
    'void main() {\n'+
    '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'+
    '}\n';

var ANGLE_STEP = 45.0;

const main = () => {
    var canvas = document.querySelector("#canvas");
    var gl = getWebGLContext(canvas);
    var x = Math.sqrt(2);
    var xformMatrix = new Float32Array([
        x/2 , x/2, 0, 0,
        -x/2, x/2, 0, 0,
        0, 0, 1, 0,
        0, 1/2, 0, 1
        ]);

    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
	gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);	

    var n = initVertexBuffers(gl);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

const initVertexBuffers = (gl) => {
    // cua hoi mon cua co gai
    var vertices = new Float32Array([
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5,
    ])
    var n = 4
    // lay ra bien thuoc tinh

    var vertexBuffer = gl.createBuffer(); // anh bom ra doi
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // gan cho co vo
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); //lay cua hoi mon tu co gai
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0); // di tim ong tho xay
    gl.enableVertexAttribArray(a_Position);
    return n;
}

// console.log(Math.sqrt(2))
