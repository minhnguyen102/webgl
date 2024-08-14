// vẽ bằng canvans js 
    // var canvas = document.querySelector("#test");
    // var ctx = canvas.getContext("2d"); // yêu cầu lấy context 2d từ phần tử 
    // ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // thiết lập màu cho context
    // ctx.fillRect(120, 10, 150, 150); // 120, 10 lần lượt là tọa độ x, y; 150 150 lần lượt là chiều rộng vào cao của khối context

//  Ví dụ trên lớp
    // var  VSHADER_SOURCE = 
    // 'void main() {\n' +
    // 'gl_Position = vec4(-0.95, 0.95, 0, 1.0);\n' + 
    // 'gl_PointSize = 10.0;\n' +
    // '}\n';
    // // Vertex : Điểm (chương trình bên trong sẽ mô tả vị trí, kích thước của điểm ảnh)
    // // thắc mắc về số 1 cuối cùng

    // var FSHADER_SOURCE = 
    // 'void main() {\n' +
    // 'gl_FragColor = vec4(1, 1, 0, 1);\n' +
    // '}\n';
    // // chương trình này sẽ xử lí về thuộc tính kiểu hình ảnh, ánh sáng đối với phần tử ảnh 

    // const main = () => {
    //     var canvas = document.querySelector("#test"); 
    //     var gl = getWebGLContext(canvas); // Lấy ngữ cảnh cho webGL
    //     initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE); // khởi tạo ? cần 3 đối só ? 
    //     gl.clearColor(0.5,0.5,0.5,1.0); // chọn màu nền; CHÚ Ý : trong webgl giá trị màu chỉ giao động trong đoạn [0,1];
    //     gl.clear(gl.COLOR_BUFFER_BIT); // đổ màu nền ra (xóa màu nền)
    //     gl.drawArrays(gl.POINTS, 0, 1);
    // }
// OT 24/7
// chuong trinh 2d
    // const canvas = document.querySelector("#test");

    // var ctx = canvas.getContext("2d");
    // ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    // ctx.fillRect(120, 10, 150, 150);

// chuong trinh don gian nhat 
    // const main = () => {
    //     const canvans = document.querySelector("#test"); // lấy ra thẻ canvas
    //     var gl = getWebGLContext(canvans); // khởi tạo môi trường 
    //     gl.clearColor(0, 0.5, 0.5, 1); // chọn màu: clearColor
    //     gl.clear(gl.COLOR_BUFFER_BIT); // đổ màu : clear(gl.COLOR_BUFFER_BIT)
    // }

// ve 1 diem 
    // var VSHADER_SOURCE1 = 
    // 'void main() {\n'+
    // 'gl_Position = vec4(0.90, 0.0, 0.0, 1.0);\n' + 
    // 'gl_PointSize = 20.0;\n' + 
    // '}\n';

    // var FSHADER_SOURCE1 = 
    // 'void main() {\n' +
    // 'gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n'+
    // '}\n';

    // const main = () => {
    //     const canvas = document.querySelector("#test");
    //     var gl = getWebGLContext(canvas);
    //     initShaders(gl, VSHADER_SOURCE1, FSHADER_SOURCE1); // khởi tạo các sharder và thiết lập chúng trong hệ thống webgl
    //     gl.clearColor(0, 0, 0, 1);
    //     gl.clear(gl.COLOR_BUFFER_BIT);
    //     gl.drawArrays(gl.POINTS, 0, 1); // vẽ điểm 
    // }

// Vẽ 1 điểm sử dụng biến thuộc tính 
    // truyền dữ liệu vào vertex sharder

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
        // truyền giá trị biến thuộc tính 
        gl.vertexAttrib3f(a_Position, 1.0, 0.0, 0.0); // 3f thì khong cần truyền tham số alpha vì mặc định hiểu là 1 
        gl.vertexAttrib1f(a_PointSize, 50.0);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.POINTS, 0, 1); // vẽ điểm
    }

    