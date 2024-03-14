document.getElementById('saveButton').addEventListener('click', saveToFile);

function saveToFile() {
  const table = document.getElementById("main_data");
  const jsonData = [];

  // Iterate through each row in the table and create a JSON object
  for (let i = 2; i < table.rows.length; i++) {
    const row = table.rows[i];
    const rowData = {};

    // Skip the first column with row numbers (if present)
    for (let j = 1; j < row.cells.length-1; j++) {
      const cellName = orderArray[j - 1]; // Adjust for skipping the first cell
      let cellValue = row.cells[j].textContent;

      // Interpret the third column as a date and convert it to a Date object
      if (j === 2) {
        // console.log(cellValue)
        cellValue = new Date(...cellValue.split('.').reverse());
        // console.log(cellValue)
      }

      rowData[cellName] = cellValue;
    }

    jsonData.push(rowData);
  }

  // Create a new workbook
  const newWorkbook = XLSX.utils.book_new();
  const newSheet = XLSX.utils.json_to_sheet(jsonData, { skipHeader: true });
  XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Sheet1');

  // Save the workbook to a file
  XLSX.writeFile(newWorkbook, 'output.xlsx');
}
