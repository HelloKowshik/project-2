let filterInput = document.getElementById('filter');
let ul = document.querySelector('.collection');
let productName = document.querySelector('.product-name');
let productPrice = document.querySelector('.product-price');
let addProductBtn = document.querySelector('.add-product');
let errMsg = document.querySelector('.msg');

let productData = getDataFromLocalStorage();

function getDataFromLocalStorage() {
    let items = '';
    if (localStorage.getItem('productItems') === null) {
        items = [];
    } else {
       items = JSON.parse(localStorage.getItem('productItems'));
    }
    return items;
}

function saveDataToLocalStorage(item) {
    let items = '';
    if (localStorage.getItem('productItems') === null) {
        items = [];
        items.push(item);
        localStorage.setItem('productItems', JSON.stringify(items));
    } else {
        items = JSON.parse(localStorage.getItem('productItems'));
        items.push(item);
        localStorage.setItem('productItems', JSON.stringify(items));
    }
}

function deleteItemFromLocalStorage(id) {
    let items = JSON.parse(localStorage.getItem('productItems'));

    let result = items.filter(productItem => { 
        return productItem.id !== id
    });
    localStorage.setItem('productItems', JSON.stringify(result));
    if (result.length === 0) {
        location.reload();
    }
}

function getData(data) {
    if (productData.length > 0) {
        errMsg.innerHTML = '';
        let li;
        data.forEach(product => { 
        let { id, name, price } = product;
        li = document.createElement('tr');
        li.className = 'collection-item';
        li.id = `product-${id}`;
        li.innerHTML = `<th scope="row">${id}</th><td>${name}</td> <td><span class='price'>BDT-${price}</span></td> <td><i class="fas fa-trash float-right delete-btn"></i></td>`;
        ul.appendChild(li);
    });   
    } else {
        showMsg(true, null);
    }
}

getData(productData);

const addProductFunc = e => { 
    e.preventDefault();
    let id;
    let name = productName.value;
    let price = parseInt(productPrice.value);
    if (productData.length === 0) {
        id = 0;
    } else {
        id = productData[productData.length - 1].id + 1;
    }
    if (name === '' || Boolean(price) === false || price<0) {
        alert('Empty Field Not Allowed!');
        productName.value = '';
        productPrice.value = '';
    } else {
        let data = {
            id,
            name,
            price
        };
        productData.push(data);
        saveDataToLocalStorage(data);
        ul.innerHTML = '';
        getData(productData);
        productName.value = '';
        productPrice.value = '';
    }
}

const deleteProductFunc = e => { 
    if (e.target.classList.contains('delete-btn')) {
        let targetEL = e.target.parentElement.parentElement.parentElement;

        // console.log(e.target.parentElement.parentElement.parentElement, e.target.parentElement.parentElement);
        
        // console.log(targetEL.removeChild(e.target.parentElement.parentElement));

        targetEL.removeChild(e.target.parentElement.parentElement);
        let id = parseInt(e.target.parentElement.parentElement.id.split('-')[1]);
        let result = productData.filter(productItem => { 
            return productItem.id !== id
        });
        productData = result;
        deleteItemFromLocalStorage(id);
        
    }
}

const searchProductFunc =  e => { 
    let searchText = e.target.value.toLowerCase();
    let itemLength = 0;
    document.querySelectorAll('.collection-item').forEach(listItem => {
       listProductName = listItem.children[1].innerText.toLowerCase();
        if (listProductName.indexOf(searchText) === -1) {
            listItem.style.display = 'none';
        } else {
            listItem.style.display = 'table-row';
            ++itemLength;
        }
    });
    if (itemLength > 0) {
        showMsg(null, null);
    } else {
        showMsg(null, true);
    }
}

function showMsg(fetchMsg,searchMsg) {
    if (fetchMsg) {
        errMsg.innerHTML = 'Please Add Item';
    } else if (searchMsg) {
        errMsg.innerHTML = 'No Match Found!';
    } else {
        errMsg.innerHTML = '';
    }
}

addProductBtn.addEventListener('click', addProductFunc);
ul.addEventListener('click', deleteProductFunc);
filterInput.addEventListener('keyup', searchProductFunc);