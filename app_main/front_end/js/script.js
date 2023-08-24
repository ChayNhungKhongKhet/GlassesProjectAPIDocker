
const productList = document.getElementById('product-list');
productList.innerHTML = '<div class="loader"></div><p class="load">Loading...</p>'; // Hiển thị loading và dòng chữ
fetch('http://127.0.0.1:8002/crawl')
    .then(response => response.json())
    .then(data => {
        productList.innerHTML = ''; // Xóa loading và dòng chữ
        let productsHtml = '<div class="row">';

        data.glasses_list.forEach((glasses, index) => {
            if (index % 2 === 0 && index !== 0) {
                productsHtml += '</div><div class="row">';
            }
            productsHtml += `
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="card">
                        <div class="card-img">
                            <img src="${glasses.img_url}" alt="${glasses.glasses_name}">
                        </div>
                        <div class="card-title">
                            <h3>Name:${glasses.glasses_name}</h3>
                        </div>
                        <div class="card-brand">
                            <p>Brand: <a href="${glasses.brand_url}" target="_blank">${glasses.brand_name}</a></p>
                        </div>
                        <div class="card-price">
                            <p>Price: $${glasses.price}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        productsHtml += '</div>';
        productList.innerHTML = productsHtml;
    })
    .catch(error => console.log(error));
