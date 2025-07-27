var bookName = document.querySelector('.input-name');
var siteUrl = document.querySelector('.input-site');
var table = document.querySelector('table');
var access = document.querySelectorAll('.input-access');

var products;
var array = [];
var index = 0;

array = JSON.parse(localStorage.getItem("books"));
Display();
function Add() {
  if (valid(bookName.value, /^[a-z0-9]{3,}$/i) && valid(siteUrl.value, /^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}(\S*)?$/i)) {
    products = {
      name: bookName.value,
      site: siteUrl.value,
    }
    products.name = products.name.charAt(0).toUpperCase() + products.name.slice(1);
    array.push(products);
    localStorage.setItem("books", JSON.stringify(array));
    Clear();
    Display();
  }
  else {
    document.querySelector('.main-layer').classList.remove('d-none');
  }
}


document.querySelector('.submit').addEventListener('click', Add)

function accceptName() {
  if (valid(bookName.value, /^[a-z0-9]{3,}$/i)) {
    access[0].style.borderColor = 'green';
    access[0].style.boxShadow = '0 0 0 .25rem rgba(76, 233, 14, 0.25)';
    access[0].classList.remove('is-invalid');

  }
  else {
    access[0].style.borderColor = 'rgb(228, 87, 22)';
    access[0].style.boxShadow = '0 0 0 .25rem rgba(238, 102, 39, 0.25)';
    access[0].classList.add('is-invalid');
  }
}
function acceptSite() {
  if (valid(siteUrl.value, /^(https?:\/\/)?(www\.)?[\w-]+\.[a-z]{2,}(\S*)?$/i)) {
    access[1].style.borderColor = 'green';
    access[1].style.boxShadow = '0 0 0 .25rem rgba(76, 233, 14, 0.25)';
    access[1].classList.remove('is-invalid');
  }
  else {
    access[1].style.borderColor = 'rgb(228, 87, 22)';
    access[1].style.boxShadow = '0 0 0 .25rem rgba(238, 102, 39, 0.25)';
    access[1].classList.add('is-invalid');
  }
}
access[0].addEventListener('keyup', accceptName);
access[1].addEventListener('keyup', acceptSite);
// document.addEventListener('click', function (e) {
//   if (e.target !== access[0] && e.target !== access[1])
//     access[0].style.borderColor = 'none';
//   access[0].style.boxShadow = 'none';
// }
// );


// TO display products
function Display() {
  var cartona = `     
       <tr class=" py-3 border-bottom">
          <th>Index</th>
          <th>Website Name</th>
          <th>Visit</th>
          <th>Delete</th>
        </tr>` ;
  for (var i = 0; i < array.length; i++) {
    cartona +=
      `   <tr class="py-5 border-bottom">
          <td>${i + 1}</td>
  
          <td>${array[i].name}</td>
          <td><a href="https://${array[i].site}" class="btn btn-secondary"><i class="fa-solid fa-eye pe-2"></i>Visit </a></td>
          <td><button class="btn btn-danger delete" onclick="Delete(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
          </tr>`
  }

  table.innerHTML = cartona;
}

// test regax
function valid(name, regax) {
  return regax.test(name);
}

// to clear the form
function Clear() {
  siteUrl.value = '',
    bookName.value = '';
}

// to delete selected element
function Delete(index) {
  array.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(array));
  Display();
}


// to close the layer error
var mainLayer = document.querySelector('.main-layer');
document.querySelector('.layer i').addEventListener('click', function () {
  mainLayer.classList.add('d-none');
});
document.querySelector('.main-layer').addEventListener('click', function (e) {
  if (e.target === mainLayer) {
    mainLayer.classList.add('d-none');
  }
});