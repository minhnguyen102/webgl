var VSHADER_SOURCE =
    'uniform mat4 u_xformMatrix;\n' +
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    '   gl_Position = u_xformMatrix * a_Position; \n' +
    '}\n';

var FSHADER_SOURCE =
    'void main() {\n' +
    '   gl_FragColor = vec4(0.65, 0.65, 0.65, 1);\n' +
    '}\n';

var g_point = [];
const main = () => {
    var canvas = document.querySelector("#canvas");
    var gl = getWebGLContext(canvas);

    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

    initVertexBuffers(gl);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    for(i = 0; i< 1500; i+= 3){
        gl.drawArrays(gl.LINE_LOOP, i, 3);
    }
    for(i = 0; i< 1000; i++){
        gl.drawArrays(gl.LINE_LOOP, 1500, g_point.length);
    }
}


const initVertexBuffers = (gl) => {
    var step = 2 * Math.PI / 1000;
    var i;
    var angle, r;
    var flag = true
    for (i = 0; i < 1000; ++i) {
        r = 0.5;
        angle = i * step;
        if(flag){
            g_point.push(0, 0.5, 0);
            g_point.push(r * Math.cos(angle), -0.25, r * Math.sin(angle));
            flag = !flag;
        }else{
            g_point.push(r * Math.cos(angle), -0.25, r * Math.sin(angle));
            flag = !flag;
        }
    }

    for (i = 0; i < 1000; ++i) {
        r = 0.5;
        angle = i * step;
        if(flag){
            g_point.push(0.4 * Math.cos(angle), -0.25, 0.4 * Math.sin(angle));
            flag = !flag;
        }else{
            g_point.push(0.4 * Math.cos(angle), -0.9, 0.4 * Math.sin(angle));
            flag = !flag;
        }
    }


    var xformMatrix = new Matrix4();
    xformMatrix.setRotate(40, 1, 1, 1);

    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);


    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(g_point), gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, "a_Position");
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

}

