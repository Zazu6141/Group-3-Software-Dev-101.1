function machine_wash_options() {
	if (document.getElementById('machine_wash').checked) {
		document.getElementById('wash_temp').style = 'display:visible';
		document.getElementById('wash_cycle').style = 'display:visible';
	}
	else {
		document.getElementById('wash_temp').style = 'display:none';
		document.getElementById('wash_cycle').style = 'display:none';
	}
}

function myFunction() {
	console.log('test successful');
    var input, filter, table, tr, td, i;
    input = document.getElementById("mylist");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }