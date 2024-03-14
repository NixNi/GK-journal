import displayData from "./display_data";

document.getElementById("main_data").addEventListener("input", (e) => {
  const [target_ind, target_col] = e.target.id.split('.');
  let formDataArray = JSON.parse(localStorage.getItem('jsonData')) || [];
  formDataArray[Number(target_ind)][target_col] = e.target.textContent;
  localStorage.setItem('jsonData', JSON.stringify(formDataArray));
});

document.getElementById("main_data").addEventListener("click", (e) => {
  const [target_ind, target_col] = e.target.id.split('.');
  console.log(target_ind, target_col);

  if (target_col === "DELETE") {
    let formDataArray = JSON.parse(localStorage.getItem('jsonData')) || [];
    console.log(formDataArray);

    // Check if the target_ind is a valid index
    if (target_ind >= 0 && target_ind < formDataArray.length) {
      const updatedArray = formDataArray.filter((it, ind)=> ind!=target_ind)

      localStorage.setItem('jsonData', JSON.stringify(updatedArray));
      displayData(); // Assuming displayData() is a function to update your UI
    }
  }
});
