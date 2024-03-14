const orderArray = [
  "FIO", "DR", "ADR", "UC", "PHONE", "POST", "SN", "TYPE", "STD", "OD_TYPE",
  "OD_STD", "OD_D", "OS_TYPE", "OS_STD", "OS_D", "WMD", "PRIM"
]
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


function displayData() {
  const data = JSON.parse(localStorage.getItem('jsonData')) || [];
  const table = document.getElementById("main_data").children[1]
  table.innerHTML = '';
  data.forEach((rowData, ind) => {
    const row = document.createElement('tr');
    const num = document.createElement('td');
    num.textContent = ind+1;
    row.appendChild(num);
    orderArray.forEach(cellName => {
      const td = document.createElement('td');
      td.textContent = rowData[cellName];
      td.contentEditable = true;
      td.id = "" + ind + "." + cellName
      row.appendChild(td);
    });
    const del = document.createElement('td');
    const delbtn = document.createElement('button')
    delbtn.textContent = "X"
    delbtn.classList.add('delbtn')
    delbtn.id = "" + ind + "." + "DELETE"
    del.appendChild(delbtn)
    row.appendChild(del)
    table.appendChild(row);
  });
}