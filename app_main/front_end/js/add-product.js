// Lấy các phần tử HTML tương ứng
let form = document.getElementById('my-form');
let submitBtn = document.getElementById('submit-btn');

// Bắt sự kiện khi người dùng nhấn nút Submit
submitBtn.addEventListener("click", function(event) {
  // Ngăn chặn hành động mặc định của nút Submit
  event.preventDefault();

  // Lấy các giá trị từ các trường dữ liệu
  let glassesId = document.getElementById('id-product-name').value;
  let link = document.getElementById('productImage').value;
  let glassesName = document.getElementById('productName').value;
  let brandName = document.getElementById("productBrand").value;
  let price = document.getElementById('productPrice').value;
  let imgUrl = document.getElementById("productDetail").value;

  // Tạo đường link mới với các tham số được chèn vào
  let newLink = `http://127.0.0.1:8000/insert?glasses_id=${glassesId}&link=${encodeURIComponent(link)}&glasses_name=${encodeURIComponent(glassesName)}&brand_name=${encodeURIComponent(brandName)}&price=${price}&img_url=${encodeURIComponent(imgUrl)}`;

  // Chuyển hướng đến đường link mới vừa tạo
  window.location.href = newLink;
});
