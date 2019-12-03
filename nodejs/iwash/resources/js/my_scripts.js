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