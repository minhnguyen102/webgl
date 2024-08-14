var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    '   gl_Position = a_Position; \n' +
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
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);

}

const initVertexBuffers = (gl) => {
    // vẽ tam giác
    // const vertices = new Float32Array([
    //     0.0, 0.5,
    //     -0.5, -0.5,
    //     0.5, -0.5
    // ])

    // var n = 3;
    // end vẽ tam giác

    // vẽ hình sao
    var g_point = [];
    var step = 3.14 / 6.0;
    var i;
    var angle, r;
    for (i = 0; i < 12; ++i) {
        r = (i % 2 == 0 ? 0.5 : 1.0);
        angle = i * step;
        g_point.push(r * Math.cos(angle));
        g_point.push(r * Math.sin(angle));

    }
    var n = 12;
    // end vẽ hình sao


    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); // vẽ tam giác
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(g_point), gl.STATIC_DRAW); // vẽ hình sao
    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}

