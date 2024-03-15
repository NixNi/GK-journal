export const orderArray = [
  "FIO", "DR", "ADR", "UC", "PHONE", "POST", "SN", "TYPE", "STD", "OD_TYPE",
  "OD_STD", "OD_D", "OS_TYPE", "OS_STD", "OS_D", "WMD", "PRIM"
]

export default function displayData() {
  const data = JSON.parse(localStorage.getItem('jsonData')) || [];
  const editedData = JSON.parse(localStorage.getItem('editedData')) || [];
  const table = document.getElementById("main_data").children[1];
  table.innerHTML = '';
  data.forEach((rowData, ind) => {
    const row = document.createElement('tr');
    const num = document.createElement('td');
    num.textContent = ind + 1;
    row.appendChild(num);
    orderArray.forEach(cellName => {
      const td = document.createElement('td');
      td.textContent = rowData[cellName];
      td.contentEditable = true;
      td.id = "" + rowData.id + "." + cellName;
      if (editedData.indexOf(td.id) >= 0) td.classList.add('edited')
      row.appendChild(td);
    });
    const del = document.createElement('td');
    const delbtn = document.createElement('button');
    delbtn.textContent = "X";
    delbtn.classList.add('delbtn');
    delbtn.id = "" + ind + "." + "DELETE";
    del.appendChild(delbtn);
    row.appendChild(del);
    table.appendChild(row);
  });
}