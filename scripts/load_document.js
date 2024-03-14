import displayData, { orderArray } from "./display_data";

const formDataArray = JSON.parse(localStorage.getItem('jsonData')) || [];
if (formDataArray) displayData();


document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      const arrayBuffer = new Uint8Array(data);
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      processWorkbook(workbook);
    };
    reader.readAsArrayBuffer(file);
  }
}

function processWorkbook(workbook) {
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const range = XLSX.utils.decode_range(sheet['!ref']);
  range.s.r = 2; // Start from the third row

  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: orderArray, cellDates: true, cellNF: true });
  jsonData.forEach(it => {
    try {
      it.DR = new Date((XLSX.SSF.parse_date_code(it.DR).D - (25567 + 1)) * 86400 * 1000).toLocaleDateString();
    } catch {
      it.DR = "error";
    }
    
  })
  localStorage.setItem('jsonData', JSON.stringify(jsonData));
  displayData();
}