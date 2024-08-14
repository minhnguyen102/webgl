var VSHADER_SOURCE =
    'uniform mat4 u_xformMatrix;\n'+ 
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    '   gl_Position = u_xformMatrix * a_Position; \n' +
    '}\n';

var FSHADER_SOURCE =
    'void main() {\n' +
    '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';

var ANGLE_STEP  = 45;

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
        // currentAngle += 0.5;
        currentAngle = animate(currentAngle);  // Update the rotation angle
        draw(gl, n, currentAngle, modelMatrix, u_xformMatrix);  
        requestAnimationFrame(tick, canvas);
    }
    tick();
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

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, Hoimon, gl.STATIC_DRAW); // 
    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}

const draw = (gl, n, currentAngle, modelMatrix, u_xformMatrix) => {
    modelMatrix.setRotate(currentAngle, 1, 1, 1);
    gl.uniformMatrix4fv(u_xformMatrix, false, modelMatrix.elements);	
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_LOOP, 0, 3);
    for(var i = 2; i < 5; i++){
        gl.drawArrays(gl.LINE_LOOP, i, 3);
    }
}

var g_last = Date.now();
function animate(angle) {
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle %= 360;
}

const btnStop = document.querySelector(".btn-warning");
btnStop.addEventListener("click", () => {
    var current_angle = ANGLE_STEP;
    ANGLE_STEP = 0;
    btnStop.addEventListener("click", () => {
        ANGLE_STEP = current_angle;
    })
})

const btnLeft = document.querySelector(".btn-success");
btnLeft.addEventListener("click", () => {
    ANGLE_STEP = 45;
})

const btnRight = document.querySelector(".btn-danger");
btnRight.addEventListener("click", () => {
    ANGLE_STEP = -45;
})

