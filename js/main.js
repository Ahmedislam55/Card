var ProductNameInput = document.getElementById('ProductNameInput');
var ProductPriceInput = document.getElementById('ProductPriceInput');
var ProductCategoryInput = document.getElementById('ProductCategoryInput');
var ProductDescriptionInput = document.getElementById('ProductDescriptionInput');
var productContainer;
var btnAdd = document.getElementById('btnAdd');
var btnUpdate = document.getElementById('btnUpdate');
var currentUpdateIndex = -1; 
if (localStorage.getItem('myProducts') != null) {
    productContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(productContainer);
} else {
    productContainer = [];
}

function addProduct() {
    if(validateProductName()==true && validateProductCategory()==true && validateProductPrice()==true &&validateProductDescription()==true)
    {
        var product = {
            name: ProductNameInput.value,
            price: ProductPriceInput.value,
            category: ProductCategoryInput.value,
            desc: ProductDescriptionInput.value,
        };
        productContainer.push(product);
        localStorage.setItem('myProducts', JSON.stringify(productContainer));
        clearProdcut();
        displayProducts(productContainer);
    }
}

function clearProdcut() {
    ProductNameInput.value = "";
    ProductPriceInput.value = "";
    ProductCategoryInput.value = "";
    ProductDescriptionInput.value = "";
}

function displayProducts(productList) {
    var cartoona = ``;
    for (let i = 0; i < productList.length; i++) {
        cartoona += `<tr>
              <th scope="row">${i + 1}</th>
              <td>${productList[i].name}</td>
              <td>${productList[i].price}</td>
              <td>${productList[i].category}</td>
              <td>${productList[i].desc}</td>
              <td><button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning">Update</button></td>
              <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
            </tr>`;
    }
    document.getElementById('tbody').innerHTML = cartoona;
}

function searchProduct(searchTerm) {
    var searchResult = [];
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(searchTerm.trim().toLowerCase())) {
            searchResult.push(productContainer[i]);
        }
    }
    displayProducts(searchResult);
}

function deleteProduct(deletedIndex) {
    productContainer.splice(deletedIndex, 1);
    localStorage.setItem('myProducts', JSON.stringify(productContainer));
    displayProducts(productContainer);
}

function setFormForUpdate(updateIndex) {
    currentUpdateIndex = updateIndex; 
    ProductNameInput.value = productContainer[updateIndex].name;
    ProductPriceInput.value = productContainer[updateIndex].price;
    ProductCategoryInput.value = productContainer[updateIndex].category;
    ProductDescriptionInput.value = productContainer[updateIndex].desc;
    btnUpdate.classList.replace('d-none', 'd-inline-block');
    btnAdd.classList.add('d-none');
}

function updateProdcut() {
    if (currentUpdateIndex !== -1) {
        productContainer[currentUpdateIndex] = {
            name: ProductNameInput.value,
            price: ProductPriceInput.value,
            category: ProductCategoryInput.value,
            desc: ProductDescriptionInput.value,
        };
        localStorage.setItem('myProducts', JSON.stringify(productContainer));
        clearProdcut();
        displayProducts(productContainer);
        btnUpdate.classList.replace('d-inline-block', 'd-none');
        btnAdd.classList.remove('d-none');
        currentUpdateIndex = -1; 
    }
}
function validateProductName()
{
    var regx = /^[A-Z][a-z]{3,8}[1-9]{0,2}$/;
    if(regx.test(ProductNameInput.value)==true)
    {
        ProductNameInput.classList.replace('is-invalid','is-valid');
        return true;
    }
    else
    {
        ProductNameInput.classList.add('is-invalid');
        return false;
    }
}
function validateProductCategory()
{
    var regx = /^([A-Z]|[a-z])[a-z]{3,8}$/
    if(regx.test(ProductCategoryInput.value)==true)
        {
            ProductCategoryInput.classList.replace('is-invalid','is-valid');
            return true;
        }
        else
        {
            ProductCategoryInput.classList.add('is-invalid');
            return false;
        }
}
function validateProductPrice()
{
    var regx=/^[1-9][0-9]{3,8}$/
    if(regx.test(ProductPriceInput.value)==true)
    {
        ProductPriceInput.classList.replace('is-invalid','is-valid')
        return true;
    }
    else
    {
        ProductPriceInput.classList.add('is-invalid');
        return false;
    }

}
function validateProductDescription()
{
    var regx = /^([A-Z]|[a-z])[a-z- A-Z]{3,100}$/
    if(regx.test(ProductDescriptionInput.value)==true)
        {
            ProductDescriptionInput.classList.replace('is-invalid','is-valid');
            return true;
        }
        else
        {
            ProductDescriptionInput.classList.add('is-invalid');
            return false;
        }
}