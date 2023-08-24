const search = document.getElementById('search');
const productList = document.getElementById('product-list');
const listCard = [];
const button = document.getElementById("price-button");
const minPrice = document.getElementById("price-min");
const maxPrice = document.getElementById("price-max");

search.addEventListener('input', (e) => filterInput(e.target.value))
productList.innerHTML = '<div class="loader"></div><p class="load">Loading...</p>'; // Hiển thị loading và dòng chữ
// Lấy dữ liệu từ API
fetch('http://127.0.0.1:8002/crawl')
  .then(response => response.json())
  .then(data => {
    productList.innerHTML = ''; // Xóa loading và dòng chữ
    // Hiển thị dữ liệu lên giao diện
    let rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    data.glasses_list.forEach((glasses, index) => {
      if (index % 2 === 0 && index !== 0) {
        productList.appendChild(rowDiv);
        rowDiv = document.createElement('div');
        rowDiv.className = 'row';
      }
      const colDiv = document.createElement('div');
      listCard.push(colDiv);
      colDiv.className = 'col-lg-6 col-md-6 col-sm-12';
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      const cardImageDiv = document.createElement('div');
      cardImageDiv.className = 'card-image';
      const img = document.createElement('img');
      img.src = glasses.img_url;
      cardImageDiv.appendChild(img);
      const cardTitleDiv = document.createElement('div');
      cardTitleDiv.className = 'card-title';
      cardTitleDiv.innerHTML = glasses.glasses_name;
      const cardBrandDiv = document.createElement('div');
      cardBrandDiv.className = 'card-brand';
      cardBrandDiv.innerHTML = glasses.brand_name;
      const cardPriceDiv = document.createElement('div');
      cardPriceDiv.className = 'card-price';
      cardPriceDiv.innerHTML = `$${glasses.price}`;
      cardDiv.appendChild(cardImageDiv);
      cardDiv.appendChild(cardTitleDiv);
      cardDiv.appendChild(cardBrandDiv);
      cardDiv.appendChild(cardPriceDiv);
      colDiv.appendChild(cardDiv);
      rowDiv.appendChild(colDiv);

      // Kiểm tra nếu là sản phẩm cuối cùng
      if (index === data.glasses_list.length - 1) {
        productList.appendChild(rowDiv);
      }
    });
  })
  .catch(error => console.log(error));



//Tìm kiếm theo khoản giá người dùng nhập vào
function seacrhPrice(minPrice, maxPrice) {
  productList.innerHTML = '<div class="loader"></div><p class="load">Loading...</p>'; // Hiển thị loading và dòng chữ
  // Lấy dữ liệu từ API
  fetch('http://127.0.0.1:8000/getByPrice?_min=' + minPrice + '&_max=' + maxPrice)
    .then(response => response.json())
    .then(data => {
      productList.innerHTML = ''; // Xóa loading và dòng chữ
      // Hiển thị dữ liệu lên giao diện
      let rowDiv = document.createElement('div');
      rowDiv.className = 'row';
      data.forEach((glasses, index) => {
        if (index % 2 === 0 && index !== 0) {
          productList.appendChild(rowDiv);
          rowDiv = document.createElement('div');
          rowDiv.className = 'row';
        }
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-6 col-md-6 col-sm-12';
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        const cardImageDiv = document.createElement('div');
        cardImageDiv.className = 'card-image';
        const img = document.createElement('img');
        img.src = glasses.img_url;
        cardImageDiv.appendChild(img);
        const cardTitleDiv = document.createElement('div');
        cardTitleDiv.className = 'card-title';
        cardTitleDiv.innerHTML = glasses.glasses_name;
        const cardBrandDiv = document.createElement('div');
        cardBrandDiv.className = 'card-brand';
        cardBrandDiv.innerHTML = glasses.brand_name;
        const cardPriceDiv = document.createElement('div');
        cardPriceDiv.className = 'card-price';
        cardPriceDiv.innerHTML = `$${glasses.price}`;
        cardDiv.appendChild(cardImageDiv);
        cardDiv.appendChild(cardTitleDiv);
        cardDiv.appendChild(cardBrandDiv);
        cardDiv.appendChild(cardPriceDiv);
        colDiv.appendChild(cardDiv);
        rowDiv.appendChild(colDiv);

        // Kiểm tra nếu là sản phẩm cuối cùng
        if (index === data.length - 1) {
          productList.appendChild(rowDiv);
        }
      });
    })
    .catch(error => console.log(error));
}

function filterInput(keySearch) {
  console.log('KeySearch :>>', keySearch);
  const searchTerm = keySearch.toLowerCase();
  listCard.forEach(item => {
    if (item.innerText.toLowerCase().includes(searchTerm)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  })
};

button.addEventListener("click", function () {
  // Lấy giá trị của input
  const minValue = parseInt(minPrice.value);
  const maxValue = parseInt(maxPrice.value);
  seacrhPrice(minValue, maxValue);
});