const colorPicker = document.getElementById("colorPicker");
const colorBox = document.getElementById("colorBox");
const colorValue = document.getElementById("colorValue");
const saveBtn = document.getElementById("saveBtn");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageUpload = document.getElementById("imageUpload");

/* ========== 基础颜色选择 ========== */

colorPicker.addEventListener("input", () => {
  updateColor(colorPicker.value);
});

function updateColor(color) {
  colorBox.style.background = color;
  colorValue.textContent = color;
}

/* ========== 保存色块为图片 ========== */

saveBtn.addEventListener("click", () => {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = 300;
  tempCanvas.height = 300;
  const tempCtx = tempCanvas.getContext("2d");

  tempCtx.fillStyle = colorValue.textContent;
  tempCtx.fillRect(0, 0, 300, 300);

  const link = document.createElement("a");
  link.download = "color.png";
  link.href = tempCanvas.toDataURL();
  link.click();
});

/* ========== 图片吸色器 ========== */

imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

canvas.addEventListener("click", (e) => {

  const rect = canvas.getBoundingClientRect();

  // 计算缩放比例
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  // 转换成真实像素坐标
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;

  const pixel = ctx.getImageData(x, y, 1, 1).data;

  const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);

  updateColor(hex);
});

/* ========== RGB 转 HEX ========== */

function rgbToHex(r, g, b) {
  return "#" + [r, g, b]
    .map(x => x.toString(16).padStart(2, "0"))
    .join("");
}
