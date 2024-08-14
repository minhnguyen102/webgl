var VSHADER_SOURCE =
    'uniform mat4 u_xformMatrix;\n'+ 
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    '   gl_Position = u_xformMatrix * a_Position; \n' +
    '}\n';

var FSHADER_SOURCE =
    'void main() {\n' +
    '   gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);\n' +
    '}\n';

const main = () => {
    var canvas = document.querySelector("#canvas");
    var gl = getWebGLContext(canvas);

    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    var n = initVertexBuffers(gl);
    

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_LOOP, 0, 3);
    for(var i = 2; i < 5; i++){
        gl.drawArrays(gl.LINE_LOOP, i, 3);
    }
}

const initVertexBuffers = (gl) => {

    var Hoimon = new Float32Array([
        -0.5, 0.0, 0.0, //v0
        0.0, 0.5, 0.0, //v1
        0.0, 0.0, 0.5, //v2
        0.5, 0.0, 0.0, //v3
        0.0, 0.5, 0.0, //v4
        0.0, 0.0, -0.5, //v5
        -0.5, 0.0, 0.0]); //v6
    var n = 6;


    var xformMatrix = new Matrix4();
	xformMatrix.setRotate(30, 1, 1, 1);
    xformMatrix.scale(0.5, 0.5, 0.5);
	
	
    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
	gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);


    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, Hoimon, gl.STATIC_DRAW); // 
    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}

