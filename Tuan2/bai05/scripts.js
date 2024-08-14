var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() { \n' + 
    'gl_Position = a_Position;\n'+
    'gl_PointSize = a_PointSize;\n' +
    '}\n'

    var FSHADER_SOURCE = 
    'void main() {\n' +
    'gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n'+
    '}\n';

    const main = () =>{
        var canvas = document.querySelector("#test");
        var gl = getWebGLContext(canvas);
        initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
        // lấy vị trí biến thuộc tính 
        var a_Position = gl.getAttribLocation(gl.program, "a_Position");
        var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");

        const btn = document.querySelector(".btn");
        console.log(btn);
        
        const x = document.querySelector("#x");
        const y = document.querySelector("#y");
        btn.addEventListener("click", () => {
            var x_value = x.value;
            var y_value = y.value;
            if(x_value ==''){
                alert("Yêu cầu nhập đủ toạ độ");
                document.getElementById("x").focus();
            }
            else if(y_value ==''){
                alert("Yêu cầu nhập đủ toạ độ");
                document.getElementById("y").focus();
            }
            else{
                gl.vertexAttrib3f(a_Position, x_value, y_value, 0.0);
                gl.clearColor(0, 1, 1, 0.8);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.drawArrays(gl.POINTS, 0, 1); // vẽ điểm
                x.value = '';
                y.value = '';
            }
        })
        // truyền giá trị biến thuộc tính 
        // gl.vertexAttrib3f(a_Position, 1.0, 0.0, 0.0); // 3f thì khong cần truyền tham số alpha vì mặc định hiểu là 1 
        gl.vertexAttrib1f(a_PointSize, 50.0);
        gl.clearColor(0, 1, 1, 0.8);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // gl.drawArrays(gl.POINTS, 0, 1); // vẽ điểm
    }