import displayData from "./display_data";

document.getElementById("main_data").addEventListener("input", (e) => {
  const [target_ind, target_col] = e.target.id.split('.');
  e.target.classList.add("edited");

  let formDataArray = JSON.parse(localStorage.getItem('jsonData')) || [];
  formDataArray.find(it => it.id == target_ind)[target_col] = e.target.textContent;
  localStorage.setItem('jsonData', JSON.stringify(formDataArray));
  let editedArray = JSON.parse(localStorage.getItem('editedData')) || [];
  if (editedArray.indexOf(e.target.id) < 0) {
    editedArray.push(e.target.id);
    localStorage.setItem('editedData', JSON.stringify(editedArray));
  }
});

document.getElementById("main_data").addEventListener("click", (e) => {
  const [target_ind, target_col] = e.target.id.split('.');
  console.log(target_ind, target_col);

  if (target_col === "DELETE") {
    let formDataArray = JSON.parse(localStorage.getItem('jsonData')) || [];
    console.log(formDataArray);

    // Check if the target_ind is a valid index
    if (target_ind >= 0 && target_ind < formDataArray.length) {
      const updatedArray = formDataArray.filter((it, ind) => ind != target_ind);

      localStorage.setItem('jsonData', JSON.stringify(updatedArray));
      displayData(); // Assuming displayData() is a function to update your UI
    }
  }
});

