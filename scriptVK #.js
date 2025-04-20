var databaseVKVK;
let filePathVK = 'cloud_customers.xlsx';
var ergebnisseVK;

function i_htmlVK() { document.getElementById('productSearched').innerHTML = ""; }
function i_htmlVK_F() { document.getElementById('productSearched').innerHTML += stringHTMLVK; }

function erg_html_F_VK() { document.getElementById('erg').innerHTML = ergebnisseVK; }

// Laden Sie die XLSX-Bibliothek
var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js';
document.head.appendChild(script);

// Warten Sie, bis die XLSX-Bibliothek geladen ist, bevor Sie Ihren ursprünglichen Code ausführen
script.onload = function() {
	// Carica il file XLSX utilizzando XHR
	const xhr = new XMLHttpRequest();
	xhr.open('GET', filePathVK, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(e) {
		var data = new Uint8Array(xhr.response);
		var workbook = XLSX.read(data, { type: 'array' });
		var sheetName = workbook.SheetNames[0];
		var sheet = workbook.Sheets[sheetName];
		databaseVK = XLSX.utils.sheet_to_json(sheet);
	};
	xhr.send();
};

////////////////////////////////////////////////////

function searchVK2() {
	i_html();
	document.getElementById('legende').innerHTML = "WIEDERVERKÄUFER"; 
	ergebnisseVK = 0;
	
	var queryVK2 = document.getElementById('queryVK2').value;

	if (queryVK2.length < 4) { alert("inserisci almeno quattro caratteri") } 
	else {
		for (j = 0; j < databaseVK.length; j++) {
			let kunde = Object.values(databaseVK[j]);
				
			let gesprr_A = kunde[3];
			let vornameX = kunde[1];
			let nachnameX = kunde[2];
			let firmaX = kunde[4];
		
			let nameVK; // alles, was von WVK-Bezeichnung erscheint
			
			if (vornameX == "•••" && nachnameX == "•••") { nameVK = firmaX;}
			else if (vornameX == "•••" && firmaX == "•••") { nameVK = nachnameX;}			
			else if (vornameX == "•••" && nachnameX !== "•••" && firmaX !== "•••") { 
				nameVK = nachnameX + ' ' + firmaX; }
			else if (vornameX !== "•••" && nachnameX !== "•••" && firmaX == "•••") { 
				nameVK = vornameX + ' ' + nachnameX; }
			else { nameVK = vornameX + ' ' + nachnameX + ' ' + firmaX; }
			
			console.log(nameVK);
			ergebnisseVK = query_Split_VK (queryVK2, nameVK, kunde, gesprr_A, ergebnisseVK);
		}
		erg_html_F();
	}
}



function query_Split_VK (queryVK2, name, kunde, gesprr_A, ergebnisseVK) {

	let queryVK2_split = queryVK2.split(" ");
	let queryVK2_1, queryVK2_2, queryVK2_3;

	for (ii=0; ii<queryVK2_split.length; ii++) {
		if (ii===0)  queryVK2_1 = queryVK2_split[0]
		if (ii===1)  queryVK2_2 = queryVK2_split[1]
		if (ii===2)  queryVK2_3 = queryVK2_split[2]		
	}

	switch(queryVK2_split.length) {
		case 1: // PAOLA
			if (name.includes(queryVK2_1) && gesprr_A != 'Standard') {
				ausgabeVK(kunde, ergebnisseVK);
				ergebnisseVK++;
			}
		case 2: // DE PAOLA
			if (name.includes(queryVK2_1) || name.includes(queryVK2_2) && gesprr_A != 'Standard') {
				ausgabeVK(kunde, ergebnisseVK);
				ergebnisseVK++;
			}	
		case 3: // DE PAOLA KONDITOREI
			if (name.includes(queryVK2_1) || name.includes(queryVK2_2) || name.includes(queryVK2_3) && gesprr_A != 'Standard') {
				ausgabeVK(kunde, ergebnisseVK);
				ergebnisseVK++;
			}				
	}
	return ergebnisseVK;
}

////////////////////////////////////////////////////

function prodVK_Obj(kunde) {
	let prodVK = {
		karte: String(kunde[0]),
		vorname: kunde[1],		
		nachname: kunde[2],		
		gruppe: kunde[3],
		firma: kunde[4],
		geburt: String(kunde[5]),		
		geschlecht: kunde[6],		
		plz: String(kunde[7]),
		strasse: kunde[8],
		bundes: kunde[9],		
		stadt: kunde[10],		
		mail: kunde[12],
		telefon: String(kunde[13])
	}

	return prodVK;
}

////////////////////////////////////////////////////

function ausgabeVK(kunde, ergebnisseVK) { 
	
 	prodVK = prodVK_Obj(kunde);
	stringHTMLVK_VK ();
	i_html_F();
}

////////////////////////////////////////////////////



function stringHTMLVK_VK () {
	stringHTMLVK = `
	  <div class="productContainer">
	  <div class="bild">${prodVK.karte}<br>
		${prodVK.firma}<br>${prodVK.nachname}<br>${prodVK.vorname}<br>	  
	  </div>
	  
	  <div class="prddaten">
		<div style="font-weight: bold; color: #C70039">${prodVK.gruppe}</div>
		<div style="font-weight: bold; color: #C70039">${prodVK.telefon}</div>
		<div style="font-weight: bold; color: #C70039">${prodVK.plz}</div>
		<div style="font-weight: bold; color: #C70039">${prodVK.strasse}</div>
		<div style="font-weight: bold; color: #C70039">${prodVK.stadt}</div>
		<div style="font-weight: bold; margin-bottom: 15px;">${prodVK.mail}</div>
	</div>
	</div>
	`;

}


// function bild_F (prodVK) {
	// bild = `<img src="img/${prodVK.nr}.jpg" onerror="this.src='img/noimage.jpg'" style="width: auto; height: 310px;">`;
	// return bild;
// }
	


//////////////////////////////////////////


