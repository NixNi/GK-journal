const std_main = document.getElementById("STD");
const od_std = document.getElementById("OD_STD");
const os_std = document.getElementById("OS_STD");

od_std.addEventListener('change', (e) => {
  std_main.value = e.target.value > os_std.value ? e.target.value : os_std.value;
});

os_std.addEventListener('change', (e) => {
  std_main.value = e.target.value > od_std.value ? e.target.value : od_std.value;
});


const type_main = document.getElementById("TYPE");
const od_type = document.getElementById("OD_TYPE");
const os_type = document.getElementById("OS_TYPE");

od_type.addEventListener('change', (e) => {
  if(e.target.value != "анофтальм")
    type_main.value = e.target.value > os_type.value ? e.target.value : os_type.value;
});

os_std.addEventListener('change', (e) => {
  if (e.target.value != "анофтальм")
    type_main.value = e.target.value > od_type.value ? e.target.value : od_type.value;
});