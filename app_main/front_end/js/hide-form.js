  // Lấy thẻ button và div
  var myButton = document.getElementById("myButton");
  var myDiv = document.getElementById("myDiv");
  // Thêm sự kiện click cho button
  myButton.addEventListener("click", function() {
    // Kiểm tra trạng thái hiện tại của div
    if (myDiv.style.display === "none") {
      // Nếu div đang ẩn thì show nó lên
      myDiv.style.display = "block";
    } else {
      // Nếu div đang hiện thì ẩn nó đi
      myDiv.style.display = "none";
    }
  });