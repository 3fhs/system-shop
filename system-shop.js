let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

//global
let mood = "create";
let ziz;

//get total
function totalPrice() {
  if (price.value != "") {
    const rezult = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = rezult;
    total.style.backgroundColor = "#4169e1";
    total.style.color = "white";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#ededed";
  }
}
//scan if the data is here or not here
let arrayBro;
if (localStorage.arrayBro != null) {
  arrayBro = JSON.parse(localStorage.arrayBro);
} else {
  arrayBro = [];
}

submit.onclick = () => {
  newArrayBro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newArrayBro.count < 100
  ) {
    //change mood
    if (mood === "create") {
      //add items by count
      if (newArrayBro.count > 1) {
        for (let i = 0; i < newArrayBro.count; i++) {
          arrayBro.push(newArrayBro);
        }
      } else {
        arrayBro.push(newArrayBro);
      }
    } else {
      arrayBro[ziz] = newArrayBro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    emptyInput();
  }
  localStorage.setItem("arrayBro", JSON.stringify(arrayBro));
  showData();
};

//empty all input after click submit
function emptyInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//show data in tabl
function showData() {
  totalPrice();
  let table = "";
  for (let i = 0; i < arrayBro.length; i++) {
    table += `
          <tr>
          <td>${i + 1}</td>
          <td>${arrayBro[i].title}</td>
          <td class="small-media">${arrayBro[i].price} $</td>
          <td class="small-media">${arrayBro[i].taxes} $</td>
          <td class="small-media">${arrayBro[i].ads} $</td>
          <td class="small-media">${arrayBro[i].discount} $</td>
          <td>${arrayBro[i].total} $</td>
          <td class="menu-media">${arrayBro[i].category}</td>
          <td class="table-option">
            <button onclick="updateSelect(${i})" id="update">update</button>
            <button onclick="deleateSelect(${i})" id="delete">delete</button>
          </td>
          </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  // create buttom dellet all
  let btnDelete = document.getElementById("deleteall");
  if (arrayBro.length > 0) {
    btnDelete.innerHTML = ` <button onclick="deleateAll()">delete all <span>${arrayBro.length} Items<span></button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

//delete product by id
function deleateSelect(i) {
  arrayBro.splice(i, 1);
  localStorage.arrayBro = JSON.stringify(arrayBro);
  showData();
}

//function delet all
function deleateAll() {
  arrayBro.splice(0);
  localStorage.clear;
  showData();
}

//update data
function updateSelect(i) {
  title.value = arrayBro[i].title;
  price.value = arrayBro[i].price;
  taxes.value = arrayBro[i].taxes;
  ads.value = arrayBro[i].ads;
  discount.value = arrayBro[i].discount;
  totalPrice();
  category.value = arrayBro[i].category;
  count.style.display = "none";
  submit.innerHTML = "update";
  mood = "update";
  ziz = i;
  scroll({
    top: "0",
    behavior: "smooth",
  });
}

//search by title or category
let searchMood = "title";

function searchProduct(id) {
  let search = document.getElementById("search");
  if (id == "search-title") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchEveryProduct(value) {
  table = "";
  if (searchMood == "title") {
    for (let i = 0; i < arrayBro.length; i++) {
      if (arrayBro[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
          <td>${i + 1}</td>
          <td>${arrayBro[i].title}</td>
          <td class="small-media">${arrayBro[i].price} $</td>
          <td class="small-media">${arrayBro[i].taxes} $</td>
          <td class="small-media">${arrayBro[i].ads} $</td>
          <td class="small-media">${arrayBro[i].discount} $</td>
          <td>${arrayBro[i].total} $</td>
          <td class="menu-media">${arrayBro[i].category}</td>
          <td class="table-option">
            <button onclick="updateSelect(${i})" id="update">update</button>
            <button onclick="deleateSelect(${i})" id="delete">delete</button>
          </td>
          </tr>`;
      }
    }
  } else {
    for (let i = 0; i < arrayBro.length; i++) {
      if (arrayBro[i].category.includes(value.toLowerCase())) {
        table += `
              <tr>
              <td>${i + 1}</td>
              <td>${arrayBro[i].title}</td>
              <td class="small-media">${arrayBro[i].price} $</td>
              <td class="small-media">${arrayBro[i].taxes} $</td>
              <td class="small-media">${arrayBro[i].ads} $</td>
              <td class="small-media">${arrayBro[i].discount} $</td>
              <td>${arrayBro[i].total} $</td>
              <td class="menu-media">${arrayBro[i].category}</td>
              <td class="table-option">
                <button onclick="updateSelect(${i})" id="update">update</button>
                <button onclick="deleateSelect(${i})" id="delete">delete</button>
              </td>
              </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
///////////////////////////////////////////////header

document.addEventListener("DOMContentLoaded", function () {
  const todayDate = document.querySelector(".date");
  const todayDay = document.querySelector(".day");
  const todayTime = document.querySelector(".time");

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function showData() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    const dayName = daysOfWeek[date.getDay()]; // Get the name of the day

    // Get hours, minutes, and seconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format time to be two digits
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    todayDate.innerHTML = `${day} / ${month} / ${year}`;
    todayDay.innerHTML = dayName;
    todayTime.innerHTML = formattedTime;
  }

  // Update the time every second
  setInterval(showData, 1000);

  // Initial call to show data immediately
  showData();
});
////////////////////////////////////////////////////////////////start calc///////////////////////////
const calc = document.getElementById("calc-click");
const display = document.getElementById("display");

function openCalc() {
  var openCalculator = document.getElementById("calculator");
  openCalculator.style.display = "block";
}
function closeCalc() {
  var closeCalculator = document.getElementById("calculator");
  closeCalculator.style.display = "none";
}

function appendToDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

function calculator() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}
