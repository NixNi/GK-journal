const form = document.getElementById("form");
const mainDataTable = document.getElementById("main_data");

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let formDataArray = JSON.parse(localStorage.getItem('jsonData')) || [];
  const formData = new FormData(form);
  let formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  formDataObject.SN = "";
  // console.log(formDataObject);
  formDataArray.push(formDataObject);
  formDataArray = formDataArray.sort((a, b) => a.FIO.localeCompare(b.FIO));
  // console.log(formDataArray);
  localStorage.setItem('jsonData', JSON.stringify(formDataArray));
  displayData();
});



// function setDataTable() {
//   // for (item of formDataArray) {
//   //   console.log("working")
//   //   const row = document.createElement("tr")
//   //   for (pos of orderArray) {
//   //     const cell = document.createElement("td")
//   //     cell.textContent = item[pos]
//   //     row.appendChild(cell)
//   //   }
//   //   mainDataTable.appendChild(row)
//   // }
// }