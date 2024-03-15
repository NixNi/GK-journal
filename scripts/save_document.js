import displayData, { orderArray } from "./display_data";
document.getElementById('saveButton').addEventListener('click', saveToFile);

function saveToFile() {
  const table = document.getElementById("main_data");
  const jsonData = [];

  // Iterate through each row in the table and create a JSON object
  for (let i = 2; i < table.rows.length; i++) {
    const row = table.rows[i];
    const rowData = {};

    for (let j = 1; j < row.cells.length-1; j++) {
      const cellName = orderArray[j - 1]; 
      let cellValue = row.cells[j].textContent;

      if (j === 2) {
        cellValue = new Date(...cellValue.split('.').reverse());
      }

      rowData[cellName] = cellValue;
    }

    jsonData.push(rowData);
  }

  const newWorkbook = XLSX.utils.book_new();
  const newSheet = XLSX.utils.json_to_sheet(jsonData, { skipHeader: true });
  XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Sheet1');

  XLSX.writeFile(newWorkbook, `Глаукомный журнал ${new Date().toLocaleDateString()}.xlsx`);

  localStorage.setItem('editedData', JSON.stringify([]));
  displayData()
}
