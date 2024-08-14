var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n'+
    'void main() {\n'+
    '   gl_Position = a_Position;\n'+
    '}\n';

var FSHADER_SOURCE = 
    'void main() {\n'+
    '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n'+
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

    var g_point = [];
    var step = 2 * 3.14 / 5.0; 
    var i;
    var angle, r;
    for (i = 0; i < 5; ++i) {
        r = 1
        angle = i * step - 96 * 3.14/ 320;
        g_point.push(r * Math.cos(angle));
        g_point.push(r * Math.sin(angle));
    }
    var n = 5;
    // lay ra bien thuoc tinh

    var vertexBuffer = gl.createBuffer(); // anh bom ra doi
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // gan cho co vo
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(g_point), gl.STATIC_DRAW); //lay cua hoi mon tu co gai
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0); // di tim ong tho xay
    gl.enableVertexAttribArray(a_Position);
    return n;
}
