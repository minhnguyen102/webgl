var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() { \n' + 
    'gl_Position = a_Position;\n'+
    'gl_PointSize = a_PointSize;\n' +
    '}\n'

    var FSHADER_SOURCE = 
    'precision mediump float;\n'+
    'uniform vec4 u_Color;\n' +
    'void main() {\n' +
    'gl_FragColor = u_Color;\n'+
    '}\n';

    const main = () =>{
        var canvas = document.querySelector("#test");
        var gl = getWebGLContext(canvas);
        initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
        // lấy vị trí biến thuộc tính 
        var a_Position = gl.getAttribLocation(gl.program, "a_Position");
        var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
        var u_Color = gl.getUniformLocation(gl.program, 'u_Color');
        // lấy các biến thuộc tính 
        const btn = document.querySelector(".btn");
        // tọa độ
        const x = document.querySelector("#x");
        const y = document.querySelector("#y");

        //rgb
        const red = document.querySelector("#r");
        const green = document.querySelector("#g");
        const blue = document.querySelector("#b");
        btn.addEventListener("click", () => {
            var x_value = x.value;
            var y_value = y.value;

            var red_value = red.value;
            var green_value = green.value;
            var blue_value = blue.value;

            if(x_value ==''){
                alert("Yêu cầu nhập đủ toạ độ");
                document.getElementById("x").focus();
            }
            else if(y_value ==''){
                alert("Yêu cầu nhập đủ toạ độ");
                document.getElementById("y").focus();
            }
            else{
                const arr_color = document.getElementsByClassName("color");
                for (const color of arr_color) {
                // console.log(color.getAttribute('id'));
                    if (color.value == ''){
                        var id_color = color.getAttribute('id');
                        alert("Yêu cầu phải điền đủ bộ màu");
                        document.getElementById(id_color).focus();
                        break;
                    }
                    else {
                        gl.vertexAttrib3f(a_Position, x_value, y_value, 0.0);
                        gl.uniform4f(u_Color, red_value, green_value, blue_value, 1);
                        gl.clearColor(0, 1, 1, 0.8);
                        gl.clear(gl.COLOR_BUFFER_BIT);
                        gl.drawArrays(gl.POINTS, 0, 1); // vẽ điểm
                    }
                }
            }
            
        })
        
        // truyền giá trị biến thuộc tính 
        gl.vertexAttrib1f(a_PointSize, 50.0);
        gl.clearColor(0, 1, 1, 0.8);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // gl.drawArrays(gl.POINTS, 0, 1); // vẽ điểm
    }