// Bài 2. Viết chương trình WebGL hiển thị một điểm ảnh vàng ở góc trên bên phải,
// nền là màu xanh da trời. (hellopoint1.js)
var VSHADER_SOURCE =
    'void main() {\n' +
    'gl_Position = vec4(0.95, 0.95, 0, 1.0);\n' +
    'gl_PointSize = 10.0;\n' +
    '}\n';
// Vertex : Điểm (chương trình bên trong sẽ mô tả vị trí, kích thước của điểm ảnh)
// thắc mắc về số 1 cuối cùng

var FSHADER_SOURCE =
    'void main() {\n' +
    'gl_FragColor = vec4(1, 1, 0, 1);\n' +
    '}\n';
// chương trình này sẽ xử lí về thuộc tính kiểu hình ảnh, ánh sáng đối với phần tử ảnh 

const main = () => {
    var canvas = document.querySelector("#test");
    var gl = getWebGLContext(canvas); // Lấy ngữ cảnh cho webGL
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE); // khởi tạo ? cần 3 đối só ? 
    gl.clearColor(0, 0, 0.5, 0.8); // chọn màu nền; CHÚ Ý : trong webgl giá trị màu chỉ giao động trong đoạn [0,1];
    gl.clear(gl.COLOR_BUFFER_BIT); // đổ màu nền ra (xóa màu nền)
    gl.drawArrays(gl.POINTS, 0, 1);
}