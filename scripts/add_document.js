import displayData, { orderArray } from "./display_data";

const form = document.getElementById("form");

form.addEventListener('submit', (e) => {
  // e.preventDefault();
  let formDataArray = JSON.parse(localStorage.getItem('jsonData')) || [];
  const formData = new FormData(form);
  let formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  formDataObject.SN = "";
  formDataObject.id = Date.now();
  formDataArray.push(formDataObject);
  formDataArray = formDataArray.sort((a, b) => a.FIO.localeCompare(b.FIO));
  localStorage.setItem('jsonData', JSON.stringify(formDataArray));

  let editedArray = JSON.parse(localStorage.getItem('editedData')) || [];
  editedArray.push(...orderArray.map(it => "" + formDataObject.id + "." + it));
  localStorage.setItem('editedData', JSON.stringify(editedArray));

  // displayData();
});
