// Quay quanh đỉnh A(0, 0.5)
var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n'+
    'uniform mat4 u_xformMatrix;\n'+
    'void main() {\n'+
    '   gl_Position = u_xformMatrix * a_Position;\n'+
    '}\n';

var FSHADER_SOURCE = 
    'void main() {\n'+
    '   gl_FragColor = vec4(0.10, 0.50, 0.80, 1.0);\n'+
    '}\n';

var ANGLE_STEP = 45.0;

const main = () => {
    var canvas = document.querySelector("#canvas");
    var gl = getWebGLContext(canvas);

    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    var n = initVertexBuffers(gl);
    gl.clearColor(0, 0, 0, 1);

    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');

    var currentAngle = 0.0;
    var modelMatrix = new Matrix4();

    var tick = () => {
        currentAngle += 0.5;
        draw(gl, n, currentAngle, modelMatrix, u_xformMatrix);  
        requestAnimationFrame(tick, canvas);
    }
    tick();
}

const initVertexBuffers = (gl) => {
    var vertices = new Float32Array([
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5,
    ])
    var n = 3;

    // lay ra bien thuoc tinh

    var vertexBuffer = gl.createBuffer(); // anh bom ra doi
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // gan cho co vo
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); //lay cua hoi mon tu co gai
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0); // di tim ong tho xay
    gl.enableVertexAttribArray(a_Position);
    return n;
}

const draw = (gl, n, currentAngle, modelMatrix, u_xformMatrix) => {
    modelMatrix.setTranslate(0, 0.5, 0);
    modelMatrix.rotate(currentAngle, 0, 0, 1);
    modelMatrix.translate(0, -0.5, 0);
    gl.uniformMatrix4fv(u_xformMatrix, false, modelMatrix.elements);	
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
