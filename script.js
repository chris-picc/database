var database;
var databaseVK; 
const filePath = 'Artikelübersicht.xlsx';
var ergebnisse;
var bild;
function i_html() { document.getElementById('productSearched').innerHTML = ""; }
function i_html_F() { document.getElementById('productSearched').innerHTML += stringHTML; }
function i_html_R() { document.getElementById('freieArtikel').innerHTML = ""; }
function i_html_FR() { document.getElementById('freieArtikel').innerHTML += stringHTML; }

function erg_html_F() { document.getElementById('erg').innerHTML = ergebnisse; }
function erg_html_VK() { document.getElementById('erg').innerHTML = ergebnisseVK; }

// Laden Sie die XLSX-Bibliothek
var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js';
document.head.appendChild(script);


script.onload = function() {
	// Beide Dateien laden
	loadExcelFile('Artikelübersicht.xlsx', function(data) {
		database = data;
		// console.log("Artikel-Daten geladen:", database);
		// Optional: auf Daten reagieren
	});

	loadExcelFile('cloud_customers.xlsx', function(data) {
		databaseVK = data;
		// console.log("Kundendaten geladen:", databaseVK);
		// Optional: auf Daten reagieren
	});
};

// Hilfsfunktion zum Laden eines Excel-Files
function loadExcelFile(filePath, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', filePath, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(e) {
		var data = new Uint8Array(xhr.response);
		var workbook = XLSX.read(data, { type: 'array' });
		var sheetName = workbook.SheetNames[0];
		var sheet = workbook.Sheets[sheetName];
		var jsonData = XLSX.utils.sheet_to_json(sheet);
		callback(jsonData);
	};
	xhr.send();
}



////////////////////////////////////////////////////

function searchAng() {
	i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "AKTUELLE ANGEBOTE";
	col = colonne();
	ergebnisse = 0;

    for (let j=1; j < database.length; j++) {
		let produkt = Object.values(database[j]);
		let name = String(produkt[1] + produkt[2]);
		
		if (name.startsWith("[W]")) {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
    }
	erg_html_F();	
}


function searchMen_Auf() {
	i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "MENGE IN AUFTRAG";
	col = colonne();
	ergebnisse = 0;

    for (let j=1; j < database.length; j++) {
		let produkt = Object.values(database[j]);
		let mengeAuft_A = produkt[col.mengeAuftIndex];
		
		if (mengeAuft_A > 0) {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
    }
	erg_html_F();	
}


function searchMinus() {
	i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "BESTAND IN MINUS";
	col = colonne();
	ergebnisse = 0;
	let flagMinus;
	
    for (j=0; j < database.length; j++) {
		let produkt = Object.values(database[j]);
		let nr = produkt[0];
		let mengeA = produkt[col.mengeIndex];
		flagMinus = 0;
		
		if ( (nr>0 && nr<14) || nr==666 || nr==240 || (nr>=500 && nr<505) || (nr>8000 && nr<8003) ) {
			flagMinus = 1;
		}

		if ( (mengeA < 0) && (flagMinus==0) ) {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
    }
	erg_html_F();
}


function searchSper() {
	i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "ZUM SPERREN ?";  
	col = colonne();
	ergebnisse = 0;

    for (j=0; j < database.length; j++) {
		let produkt = Object.values(database[j]);
		let mengeA = produkt[col.mengeIndex];
		let mengeBstA = produkt[col.mengeBstIndex];
		let gesprr_A = produkt[col.gesprrIndex];

		if ( mengeA == 0 && mengeBstA == 0 && gesprr_A != 'Ja') {
			ausgabeSpr(produkt, col, ergebnisse);
			ergebnisse++;
		}
    }
	erg_html_F();
}


function searchEintr() {
	i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "EINTREFFDATUM ?";  
	col = colonne();
	ergebnisse = 0;

    for (j=0; j < database.length; j++) {
		let produkt = Object.values(database[j]);
		
		let mengeBstA = produkt[col.mengeBstIndex];
		
		dat1 = produkt[col.eingangDatum]; // 60824,00 --> 6. August 2024
		let datumJs = vdatumJs (String(dat1)); // Tue Aug 06 2024 JS
		
		let heute = new Date();
		let datumJsObj = new Date(datumJs);
		
		let flagH = 0;
		
		if (datumJsObj < heute)  flagH = 1;

		if ( mengeBstA > 0 && flagH == 1 ) {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
    }
	erg_html_F();
}

function searchBrot() {
    i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "BROT+FOCACCE";
	col = colonne();
	ergebnisse = 0;	
		
	for (j=0; j < database.length; j++) {
		let produkt = Object.values(database[j]);
		let name = String(produkt[1] + produkt[2]);

		// var nr = String(produkt[0]);
		
		if ( (produkt[0]>=1 && produkt[0]<=5) || (produkt[0]>=7 && produkt[0]<=11) || 
		produkt[0]==13 || produkt[0]==666 || (produkt[0]>=99001 && produkt[0]<=99008) ) {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
	}
	erg_html_F();
}


function searchNoBild() {
    i_html();
    i_html_R();
    document.getElementById('legende').innerHTML = "NO IMAGE";  
    col = colonne();
    ergebnisse = 0;

    // Erstelle ein Array von Promises, um alle Bilder zu überprüfen
    let promises = [];

    for (let j = 1; j < database.length; j++) {
        let produkt = Object.values(database[j]);

        promises.push(
            new Promise((resolve) => {
                let nrA = produkt[0];
                let mengeA = produkt[col.mengeIndex];
                let mengeBstA = produkt[col.mengeBstIndex];
                let gesprr_A = produkt[col.gesprrIndex];

                let img = new Image();
                img.src = `img/${nrA}.jpg`;

                img.onload = function () {
                    resolve(null);  // Bild existiert, nichts tun
                };

                img.onerror = function () {
                    if (gesprr_A != 'Ja') {
                        resolve(produkt);  // Bild existiert nicht und das Produkt ist nicht gesperrt
                    } else {
                        resolve(null);  // Bild existiert nicht, aber das Produkt ist gesperrt
                    }
                };
            })
        );
    }

    // Warten auf alle Promises und dann Ergebnisse verarbeiten
    Promise.all(promises).then((results) => {
        results.forEach((produkt) => {
            if (produkt) {
                ausgabeNoBild(produkt, col, ergebnisse);
                ergebnisse++;
                console.log('OK');
            }
        });
        erg_html_F();
    });
}


function searchPanett() {
    i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "PANETTONI";
	col = colonne();
	ergebnisse = 0;	
		
	for (j=0; j < database.length; j++) {
		let produkt = Object.values(database[j]);

		let mengeA = produkt[col.mengeIndex];
		let mengeBstA = produkt[col.mengeBstIndex];
		let sparte = String(produkt[col.sparteIndex]);
		let gesprr_A = produkt[col.gesprrIndex];
		
		let flagW = 0;
		
		if ( (mengeA > 0 || mengeBstA > 0) && sparte == "14-1")  flagW = 1;
		
		if ( flagW == 1 && gesprr_A != 'Ja' ) {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
	}
	erg_html_F();
}


function searchPandor() {
    i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "PANDORI";
	col = colonne();
	ergebnisse = 0;	
		
	for (j=0; j < database.length; j++) {
		let produkt = Object.values(database[j]);

		let mengeA = produkt[col.mengeIndex];
		let mengeBstA = produkt[col.mengeBstIndex];
		let sparte = String(produkt[col.sparteIndex]);
		let gesprr_A = produkt[col.gesprrIndex];
		
		let flagW = 0;
		
		if ( (mengeA > 0 || mengeBstA > 0) && sparte == "14-5")  flagW = 1;
		
		if ( flagW == 1 && gesprr_A != 'Ja' ) {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
	}
	erg_html_F();
}


function searchWeihn() {
    i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "WEIHNACHTEN ANDERE";
	col = colonne();
	ergebnisse = 0;	
		
	for (j=0; j < database.length; j++) {
		let produkt = Object.values(database[j]);

		let mengeA = produkt[col.mengeIndex];
		let mengeBstA = produkt[col.mengeBstIndex];
		let sparte = String(produkt[col.sparteIndex]);
		let gesprr_A = produkt[col.gesprrIndex];
		
		let flagW = 0;
		
		if ( (mengeA > 0 || mengeBstA > 0) && 
			(sparte == "14-2" || sparte == "14-3" || sparte == "14-4" || sparte == "14-6" || sparte == "14-7" || sparte == "14-8" || sparte == "14-9" ) )  flagW = 1;
		
		if ( flagW == 1 && gesprr_A != 'Ja' ) {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
	}
	erg_html_F();
}



function searchOstEi() {
    i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "OSTEREIER";
	col = colonne();
	ergebnisse = 0;	
		
	for (j=0; j < database.length; j++) {
		let produkt = Object.values(database[j]);

		let mengeA = produkt[col.mengeIndex];
		let mengeBstA = produkt[col.mengeBstIndex];
		let sparte = String(produkt[col.sparteIndex]);
		let gesprr_A = produkt[col.gesprrIndex];
		
		let flagW = 0;
		
		if ( (mengeA > 0 || mengeBstA > 0) && sparte == "13-1")  flagW = 1;
		
		if ( flagW == 1 && gesprr_A != 'Ja' ) {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
	}
	erg_html_F();
}


function searchOstEiKin() {
    i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "OSTEREIER KINDER";
	col = colonne();
	ergebnisse = 0;	
		
	for (j=0; j < database.length; j++) {
		let produkt = Object.values(database[j]);
		let name = String(produkt[1] + produkt[2]);

		let mengeA = produkt[col.mengeIndex];
		let mengeBstA = produkt[col.mengeBstIndex];
		let sparte = String(produkt[col.sparteIndex]);
		let gesprr_A = produkt[col.gesprrIndex];
		
		let flagW = 0;
		
		if ( (mengeA > 0 || mengeBstA > 0) && sparte == "13-1" && name.includes('KINDER') )  flagW = 1;
		
		if ( flagW == 1 && gesprr_A != 'Ja' ) {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
	}
	erg_html_F();
}


function searchColom() {
    i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "COLOMBE";
	col = colonne();
	ergebnisse = 0;	
		
	for (j=0; j < database.length; j++) {
		let produkt = Object.values(database[j]);

		let mengeA = produkt[col.mengeIndex];
		let mengeBstA = produkt[col.mengeBstIndex];
		let sparte = String(produkt[col.sparteIndex]);
		let gesprr_A = produkt[col.gesprrIndex];
		
		let flagW = 0;
		
		if ( (mengeA > 0 || mengeBstA > 0) && sparte == "13-2")  flagW = 1;
		
		if ( flagW == 1 && gesprr_A != 'Ja' ) {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
	}
	erg_html_F();
}



function searchColomBaul() {
    i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "COLOMBE BAULI";
	col = colonne();
	ergebnisse = 0;	
		
	for (j=0; j < database.length; j++) {
		let produkt = Object.values(database[j]);
		let name = String(produkt[1] + produkt[2]);

		let mengeA = produkt[col.mengeIndex];
		let mengeBstA = produkt[col.mengeBstIndex];
		let sparte = String(produkt[col.sparteIndex]);
		let gesprr_A = produkt[col.gesprrIndex];
		
		let flagW = 0;
		
		if ( (mengeA > 0 || mengeBstA > 0) && sparte == "13-2" && name.includes('BAULI') )  flagW = 1;
		
		if ( flagW == 1 && gesprr_A != 'Ja' ) {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
	}
	erg_html_F();
}


// function searchColomVf() {
    // i_html();
	// i_html_R();
	// document.getElementById('legende').innerHTML = "COLOMBE VECCHIO FORNO";
	// col = colonne();
	// ergebnisse = 0;	
		
	// for (j=0; j < database.length; j++) {
		// let produkt = Object.values(database[j]);
		// let name = String(produkt[1] + produkt[2]);

		// let mengeA = produkt[col.mengeIndex];
		// let mengeBstA = produkt[col.mengeBstIndex];
		// let sparte = String(produkt[col.sparteIndex]);
		// let gesprr_A = produkt[col.gesprrIndex];
		
		// let flagW = 0;
		
		// if ( (mengeA > 0 || mengeBstA > 0) && sparte == "13-2" && (name.includes('VECCHIO') ||  name.includes('DUCALE') ))  flagW = 1;
		
		// if ( flagW == 1 && gesprr_A != 'Ja' ) {
			// ausgabe(produkt, col, ergebnisse);
			// ergebnisse++;
		// }
	// }
	// erg_html_F();
// }



function searchFrart() {
	i_html();
    i_html_R();
	document.getElementById('legende').innerHTML = "FREIE ARTIKEL-NR";
	ergebnisse = 0;	
	
	let nummer = 1;
	
	for (j=1; j < 50; j++) {  // die ersten 50 verfügbaren Artikel-Nr	
		let produkt = Object.values(database[j]);
		
		// console.log('Nr: ', produkt[0]);
		// console.log('RM: ', nummer);
		
		if (produkt[0] != nummer) { // Artikel-Nr existiert nicht --> ausgeben
			ausgabeFreiArt(nummer, ergebnisse);
			ergebnisse++;
			j--;
		}
		
		nummer++;		
	}
	erg_html_F();
}



////////////////////////////////////////////////////


function colonne() { // 35 Säulen
	let column = Object.values(database[0]) // riga nr. 2
	let col = { }
	
	for (i=3; i<35; i++) {
		if (column[i] == 'Lagerbestand')  col.mengeIndex = i;
		if (column[i] == 'Menge in Bestellung')  col.mengeBstIndex = i;
		if (column[i] == 'Basiseinheitencode')  col.einheitIndex = i;
		if (column[i] == 'VK-Preis')  col.preisIndex = i;
		if (column[i] == 'Menge in Auftrag')  col.mengeAuftIndex = i;
		if (column[i] == 'Erster EAN-Code')  col.eanIndex = i;
		if (column[i] == 'Waagen PLU-Nr.')  col.waageIndex = i;
		if (column[i] == 'Sparte')  col.sparteIndex = i;
		if (column[i] == 'Warengruppe')  col.warengruppeIndex = i;
		if (column[i] == 'VK-Preis 2')  col.preisWVKIndex = i;
		if (column[i] == 'MwSt.-Produktbuchungsgruppe')  col.MwStIndex = i;	  
		if (column[i] == 'Gesperrt')  col.gesprrIndex = i;
		if (column[i] == 'Nächstes Wareneingangsdatum')  col.eingangDatum = i;
		if (column[i] == 'Letztes Einkaufsdatum')  col.einkaufsDatum = i;	
		if (column[i] == 'Kreditorennr.')  col.lieferantIndex = i;
		if (column[i] == 'Regalnr.')  col.regalIndex = i;			
	}
	return col;
}

function prod_Obj(produkt, col) {
	let prod = {
		nr: produkt[0],
		name: String(produkt[1] + produkt[2]),
		gesprr: produkt[col.gesprrIndex], //
		menge: produkt[col.mengeIndex],
		// mengeBst: mengeComma (String(produkt[col.mengeBstIndex])),
		mengeBst: produkt[col.mengeBstIndex],
		mengeAuft: produkt[col.mengeAuftIndex],
		eingang: vdatum (String(produkt[col.eingangDatum])),
		einkauf: vdatum (String(produkt[col.einkaufsDatum])),
		// lieferant: liefNr (produkt[col.lieferantIndex]),
		regal: produkt[col.regalIndex],
		
		einheit: produkt[col.einheitIndex],
		preis: preisComma (String(produkt[col.preisIndex])),
		ean: produkt[col.eanIndex],
		waage: String(produkt[col.waageIndex]),
		sparte: String(produkt[col.sparteIndex]),
		warengruppe: produkt[col.warengruppeIndex],
		MwSt: produkt[col.MwStIndex],
		preisWVK: preisComma (String(produkt[col.preisWVKIndex])),
		preisWVK_netto: 0,
		fun0: function() {
			if (prod.MwSt == "7%") prod.preisWVK_netto = (produkt[col.preisWVKIndex]*100/107).toFixed(2)
			else if (prod.MwSt == "19%") prod.preisWVK_netto = (produkt[col.preisWVKIndex]*100/119).toFixed(2)
			prod.preisWVK_netto = preisComma(String(prod.preisWVK_netto));
		},
		flagMenge: 0,
		fun1: function() {
			if (prod.menge < 0) prod.flagMenge = 1
			prod.menge = mengeComma (String(prod.menge));
		},
		
		flagBest: 0,
		funX: function() {
			if (prod.mengeBst > 0) prod.flagBest = 1
			prod.mengeBst = mengeComma (String(prod.mengeBst));
		},
		
		flagAuf: 0,
		fun2: function() {
			if (prod.mengeAuft > 0) prod.flagAuf = 1
			prod.mengeAuft = mengeComma (String(prod.mengeAuft));
		}
		
		
		
	}
	
	prod.fun0();
	prod.fun1();
	prod.funX();	
	prod.fun2();

	return prod;
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

function bild_F (prod) {
	bild = `<img src="img/${prod.nr}.jpg" onerror="this.src='img/noimage.jpg'" style="width: auto; height: 310px;">`;
	return bild;
}
	

function stringHTML_F () {
	if (prod.waage == "0") {
		stringHTML = `
		  <div class="productContainer">
		  <div class="bild">${bild}</div>
		  <div class="prddaten">
			<div style="font-weight: bold; color: #C70039">${prod.nr}</div>
			<div style="font-weight: bold; margin-bottom: 15px;">${prod.name}</div>`;
	}
	else {
		stringHTML = `
		  <div class="productContainer">
		  <div class="bild">${bild}</div>
		  <div class="prddaten">
		  
			<table><tr> <td style="font-weight: bold; color: #C70039">${prod.nr}</td><td style="color: #008000"> • PLU-Nr:</td> <td style="font-weight: bold; color: #008000">${prod.waage}</td></tr></table>
			
			
			
			<div style="font-weight: bold; margin-bottom: 15px;">${prod.name}</div>`;		
		
	}
	
}


function stringHTMLVK_VK () {
	
	// console.log(prodVK.geburt,prodVK.plz,prodVK.strasse,prodVK.bundes,prodVK.stadt,prodVK.mail,prodVK.telefon);
	
	stringHTML = `
		<div class="productContainer">


			<div class="bildVK">
				<div style="font-size: 15px; font-weight: bold; color: #C70039"> ${prodVK.karte || ""}</div>
				<div style="font-size: 15px; font-weight: bold">${prodVK.firma !== "•••" ? prodVK.firma : ""} </div>				
				<div style="font-size: 15px; font-weight: bold">${prodVK.nachname !== "•••" ? prodVK.nachname : ""}	${prodVK.vorname !== "•••" ? prodVK.vorname : ""} </div>
			</div>


			<div class="prddatenVK">
				${prodVK.gruppe !== "•••" && prodVK.gruppe ? `<div style="font-size: 15px; font-weight: bold; color: #0000CD">${prodVK.gruppe}</div>` : ""}<br>
				
				${prodVK.telefon !== "•••" && prodVK.telefon ? `<div>${prodVK.telefon}</div>` : ""}	
				${prodVK.mail !== "•••" && prodVK.mail ? `<div>${prodVK.mail}</div>` : ""}				
				<br>
				${prodVK.strasse !== "•••" && prodVK.strasse ? `<div>${prodVK.strasse}</div>` : ""}
				
				${(prodVK.plz !== "•••" && prodVK.plz) || (prodVK.stadt !== "•••" && prodVK.stadt) ? `
					<div style="display: flex;">
						<div style="margin-right: 5px;">${prodVK.plz !== "•••" && prodVK.plz ? prodVK.plz : ""}</div>
						<div>${prodVK.stadt !== "•••" && prodVK.stadt ? prodVK.stadt : ""}</div>
					</div>` : ""}

	

				
				${prodVK.bundes !== "•••" && prodVK.bundes ? `<div>${prodVK.bundes}</div>` : ""}				
		
			</div>
		</div>
	`;
}



function stringHTML_F2 () { // Lagerbestand_A
	stringHTML += `<div 
		style="background-color: #FBCEB1">Lagerbestand:<span style="font-weight: bold"> ${prod.menge}</span>

		<span style="color: #757474">/•••/ </span>
		<span style="font-weight: bold; color: #757474; font-size: 10px">eingetroffen am ${prod.einkauf}</span>
	
	</div>`;
}

function stringHTML_F2_b () { // Lagerbestand_B
	stringHTML += `
	<div>Lagerbestand:<span style="font-weight: bold"> ${prod.menge}</span>
	
		<span style="color: #757474">/•••/ </span>
		<span style="font-weight: bold; color: #757474; font-size: 10px">eingetroffen am ${prod.einkauf}</span>
		
	</div>`;
}



function stringHTML_Fx () { // Menge in Bestellung_A
	stringHTML += `<div>Menge in Bestellung:
	  <span style="font-weight: bold"> ${prod.mengeBst} </span>
	  <span style="color: #757474">/•••/ </span>
	  <span style="font-weight: bold; color: #0011c7; font-size: 10px">Eintreffdatum: ${prod.eingang}</span>
	</div>`
}

function stringHTML_Fx_b () { // Keine_Menge in Bestellung_B
	stringHTML += `<div>Menge in Bestellung: ${prod.mengeBst}</div>`
}


function stringHTML_F3 () { // Menge in Auftrag_A
	stringHTML += `<div style="background-color: yellow">Menge in Auftrag: ${prod.mengeAuft}</div>`;
}

function stringHTML_F3_b () { // Keine_Menge in Auftrag_B
	stringHTML += `<div>Menge in Auftrag: ${prod.mengeAuft}</div>`;
}
 


function stringHTML_F4 () {
	
	if (prod.regal != "") {
		stringHTML += `
		<div style="color: #20B2AA">${prod.einheit}</div>
		<div>Preis:<span style="font-weight: bold; color: #C70039"> ${prod.preis}</span></div>
		<div>Sparte: ${prod.sparte}</div>
		<div>EAN-Code: ${prod.ean}</div>

		<div>Preis-VK2:
		  <span style="font-weight: bold"> ${prod.preisWVK_netto}</span> <span style="font-size: 10px">(Netto)</span>      
		  <span>//</span>
		  <span style="font-weight: bold"> ${prod.preisWVK}</span> <span style="font-size: 10px">(Brutto)</span>
		</div>
		<div>Regal-Nr: ${prod.regal}</div>
		
		</div>
		</div>
		<br>`;
	}
	
	else {
		stringHTML += `
		<div style="color: #20B2AA">${prod.einheit}</div>
		<div>Preis:<span style="font-weight: bold; color: #C70039"> ${prod.preis}</span></div>
		<div>Sparte: ${prod.sparte}</div>
		<div>EAN-Code: ${prod.ean}</div>

		<div>Preis-VK2:
		  <span style="font-weight: bold"> ${prod.preisWVK_netto}</span> <span style="font-size: 10px">(Netto)</span>      
		  <span>//</span>
		  <span style="font-weight: bold"> ${prod.preisWVK}</span> <span style="font-size: 10px">(Brutto)</span>
		</div>

		</div>
		</div>
		<br>`;
	}		
	
}


function stringHTML_F5 () {
	stringHTML = `<table><tr>

		<td style="width: 100px; text-align: right; font-size: 10px; font-weight: bold; color: #757474"> ${prod.einkauf}</td>

		<td style="width: 35px; text-align: center; font-weight: bold; color: #C70039"> ${prod.nr}</td>
		
		<td style="font-weight: bold"> &nbsp; ${prod.name}</td>
		
		<td style="width: 45px; margin-left: 32px; text-align: center; font-weight: bold; color: #018749">• ${prod.sparte}</td>
		
    </tr></table>`;
}

		// <span style="font-weight: bold"> ${nummer} • &nbsp;</span>
		
function stringHTML_F6 (nummer) {
	if (nummer < 100) {
	stringHTML = `
		<span style="font-weight: bold; margin-left: 20px">&nbsp; ${nummer} </span>
	`;	
	}
	else {
	stringHTML = `
		<span style="font-weight: bold; margin-left: 20px">${nummer}</span>
	`;
	}
}


function stringHTML_F7 () {
	stringHTML = `<table><tr>

		<td style="width: 35px; text-align: center; font-weight: bold; color: #C70039"> ${prod.nr}</td>
		
		<td style="width: 54px; margin-left: 32px; text-align: center; font-weight: bold; color: #018749">• ${prod.sparte} •</td>
		
		<td style="width: 55px; margin-left: 32px; text-align: center; font-weight: bold; color: #FF0000">${prod.menge}</td>

		<td style="font-weight: bold"> &nbsp; ${prod.name}</td>		
		
    </tr></table>`;
}


////////////////////////////////////////////////////


function ausgabe(produkt, col, ergebnisse) { 
	
 	prod = prod_Obj(produkt, col);
	bild = bild_F (prod);
	stringHTML_F ();

	if (prod.flagMenge){ stringHTML_F2(); } 
	else { stringHTML_F2_b(); }

	if (prod.flagBest) { stringHTML_Fx(); }
	else { stringHTML_Fx_b() ; }

	if (prod.flagAuf) { stringHTML_F3(); }
	else { stringHTML_F3_b() ; }
		
	stringHTML_F4();
	i_html_F();
}



////////////////////////////////////////////////////


function ausgabeVK(kunde, ergebnisseVK) { 
	
 	prodVK = prodVK_Obj(kunde);
	stringHTMLVK_VK ();
	i_html_F();
}
////////////////////////////////////////////////////

function ausgabeSpr(produkt, col, ergebnisse) {
 	prod = prod_Obj(produkt, col);
	bild = bild_F (prod);
	stringHTML_F5();
	i_html_F();
}


function ausgabeFreiArt(nummer, ergebnisse) {
	stringHTML_F6(nummer);
	i_html_FR();
}


function ausgabeNoBild(produkt, col, ergebnisse) {
 	prod = prod_Obj(produkt, col);
	stringHTML_F7(); 
	i_html_F();
}


//////////////////////////////////////////


function searchPr() {
	i_html();
	document.getElementById('legende').innerHTML = "PRODUKTSUCHE (NAME)"; 
	col = colonne();
	ergebnisse = 0;
	
	var queryPr = document.getElementById('queryPr').value.toUpperCase();

	if (queryPr.length < 2) { alert("inserisci almeno due caratteri") } 
	else {
		for (j = 1; j < database.length; j++) {
			let produkt = Object.values(database[j]);
			var name = String(produkt[1] + produkt[2]);
			let gesprr_A = produkt[col.gesprrIndex];

			ergebnisse = query_Split (queryPr, name, produkt, gesprr_A, ergebnisse);
		}
		erg_html_F();
	}
}


function searchNr() {
	i_html();
	document.getElementById('legende').innerHTML = "PRODUKTSUCHE (ARTIKEL-NR)";
	col = colonne();
	ergebnisse = 0;
	
	var queryNr = document.getElementById('queryNr').value;
	
	if (queryNr.length < 1) { alert("inserisci almeno un numero") } 
	else {
		for (j=0; j < database.length; j++) {
			let produkt = Object.values(database[j]);
			var nr = String(produkt[0]);
			let gesprr_A = produkt[col.gesprrIndex];
					
			if (nr == queryNr && gesprr_A != 'Ja') {
				ausgabe(produkt, col, ergebnisse);
				ergebnisse++;
			}
		}
		erg_html_F();
	}
}


function searchPlu() {
	i_html();
	document.getElementById('legende').innerHTML = "PRODUKTSUCHE (PLU-NR)"; 
	col = colonne();
	ergebnisse = 0;
  
	var queryPlu = document.getElementById('queryPlu').value;

	if (queryPlu.length < 1) { alert("inserisci almeno un numero") } 
	else {
		for (j=0; j < database.length; j++) {
			let produkt = Object.values(database[j]);
			let waage = String(produkt[col.waageIndex]);
			let gesprr_A = produkt[col.gesprrIndex];

			if (waage == queryPlu && gesprr_A != 'Ja') {
				ausgabe(produkt, col, ergebnisse);
				ergebnisse++;
			}
		}
		erg_html_F();
	}
}


function searchEAN() {
	i_html();
	document.getElementById('legende').innerHTML = "PRODUKTSUCHE (EAN)"; 
	col = colonne();
	ergebnisse = 0;
	
	var queryEAN = document.getElementById('queryEAN').value;

	if (queryEAN.length < 5) { alert("inserisci almeno cinque numeri") } 
	else {
		for (j = 1; j < database.length; j++) {
			let produkt = Object.values(database[j]);
			var ean = String(produkt[col.eanIndex]);
			let gesprr_A = produkt[col.gesprrIndex];

			if (ean.includes(queryEAN) && gesprr_A != 'Ja') {
				ausgabe(produkt, col, ergebnisse);
				ergebnisse++;
			}
		}
		erg_html_F();
	}
}

/// quando la cella è vuota, non la considera
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
		
			// if (gesprr_A == "Standard") console.log("gesperrt");
			let nameVK; // alles, was von WVK-Bezeichnung erscheint
			
			if (vornameX == "•••" && nachnameX == "•••") { nameVK = firmaX; }
			else if (vornameX == "•••" && firmaX == "•••") { nameVK = nachnameX;}			
			else if (vornameX == "•••" && nachnameX !== "•••" && firmaX !== "•••") { 
				nameVK = nachnameX + ' ' + firmaX; }
			else if (vornameX !== "•••" && nachnameX !== "•••" && firmaX == "•••") { 
				nameVK = vornameX + ' ' + nachnameX; }
			else { nameVK = vornameX + ' ' + nachnameX + ' ' + firmaX; }
			
			// console.log(ergebnisseVK);
			ergebnisseVK = query_Split_VK (queryVK2, nameVK, kunde, gesprr_A, ergebnisseVK);
		}
		erg_html_VK();
	}
}

//////////////////////////////////////////


function searchErw() {
    i_html();
	document.getElementById('legende').innerHTML = "ERWEITERTE SUCHE";
	col = colonne();
	ergebnisse = 0;	
		
	// Produkt & Sparte
	var queryPrSp = document.getElementById('queryPrSp').value.toUpperCase(); 
	var queryPrKat = document.getElementById('queryPrKat').value;

	if (queryPrKat.length < 3) { alert("inserisci la categoria, per esempio: 1-2") } else {
		for (j=0; j < database.length; j++) {
			let produkt = Object.values(database[j]);
			let name = String(produkt[1] + produkt[2]);			
			let sparte = String(produkt[col.sparteIndex]);
			let gesprr_A = produkt[col.gesprrIndex];
			
			ergebnisse = query_Split_Sparte (queryPrSp, queryPrKat, sparte, name, produkt, gesprr_A, ergebnisse);
		}
		erg_html_F();
	}
}



function preisComma (preis) {
  preis = preis.replace('.', ',');
  
  if (preis.charAt(1) == ',' && preis.length == 3)  // 1,9
	  preis += '0'
  else if (preis.charAt(2) == ',' && preis.length == 4)  // 11,9
	preis += '0'
  else if (preis.charAt(3) == ',' && preis.length == 5)  // 111,9
	preis += '0'  
  
  preis += ' €';
  return preis;  
}


function mengeComma (menge) {
  menge = menge.replace('.', ',');
  return menge;  
}



function vdatum (datum) {
	lng = datum.length;
	lngX = datum.length;
	// console.log(lng);
	
	
	lr = " ";
	jahr = "20" + datum.slice(lng-2, lng);
	monat = datum.slice(lng-4, lng-2);
	
	if (lng == 6) tag = datum.slice(lng-6, lng-4) + ".";
	else tag = datum.slice(lng-5, lng-4) + ".";
// console.log(lng);
	switch (monat) {
		case "01": monat = "Januar"; break;
		case "02": monat = "Februar"; break;
		case "03": monat = "März"; break;
		case "04": monat = "April"; break;
		case "05": monat = "Mai"; break;
		case "06": monat = "Juni"; break;		
		case "07": monat = "Juli"; break;
		case "08": monat = "August"; break;
		case "09": monat = "September"; break;
		case "10": monat = "Oktober"; break;
		case "11": monat = "November"; break;
		case "12": monat = "Dezember"; break;			
	}

	datum = tag + lr + monat + lr + jahr;
	
// console.log(datum.length);	
	if (lngX == 0) datum = "";
	// if (datum === " . 20") console.log("OK")
	return datum;  
}



function vdatumJs (dat1) {
	lng = dat1.length;
	lngX = dat1.length;
	
	lr = " ";
	jahr = "20" + dat1.slice(lng-2, lng);
	monat = dat1.slice(lng-4, lng-2);
	
	if (lng == 6) tag = dat1.slice(lng-6, lng-4) + "."; // ===
	else tag = dat1.slice(lng-5, lng-4) + ".";

	switch (monat) {
		case "01": monat = 0; break;
		case "02": monat = 1; break;
		case "03": monat = 2; break;
		case "04": monat = 3; break;
		case "05": monat = 4; break;
		case "06": monat = 5; break;		
		case "07": monat = 6; break;
		case "08": monat = 7; break;
		case "09": monat = 8; break;
		case "10": monat = 9; break;
		case "11": monat = 10; break;
		case "12": monat = 11; break;			
	}
	
	let datumJs = new Date();
	
	datumJs.setDate(tag);
	datumJs.setMonth(monat);
	datumJs.setFullYear(jahr);
	
	if (lngX == 0) datumJs = "";  // ===

	return datumJs;  
}




function query_Split (queryPr, name, produkt, gesprr_A, ergebnisse) {

	let queryPr_split = queryPr.split(" ");
	let queryPr_1, queryPr_2, queryPr_3, queryPr_4, queryPr_5;

	for (ii=0; ii<queryPr_split.length; ii++) {
		if (ii===0)  queryPr_1 = queryPr_split[0]
		if (ii===1)  queryPr_2 = queryPr_split[1]
		if (ii===2)  queryPr_3 = queryPr_split[2]
		if (ii===3)  queryPr_4 = queryPr_split[3]
		if (ii===4)  queryPr_5 = queryPr_split[4]
	}

	switch(queryPr_split.length) {
		case 1: // RIGONI
			if (name.includes(queryPr_1) && gesprr_A != 'Ja') {
				ausgabe(produkt, col, ergebnisse);
				ergebnisse++;
			}
		case 2: // RIGONI ASIAGO
			if (name.includes(queryPr_1) && name.includes(queryPr_2) && gesprr_A != 'Ja') {
				ausgabe(produkt, col, ergebnisse);
				ergebnisse++;
			}	
		case 3: // RIGONI ASIAGO ERDBEER
			if (name.includes(queryPr_1) && name.includes(queryPr_2) && name.includes(queryPr_3) && gesprr_A != 'Ja') {
				ausgabe(produkt, col, ergebnisse);
				ergebnisse++;
			}
		case 4: // RIGONI ASIAGO ERDBEER MARMELADE
			if (name.includes(queryPr_1) && name.includes(queryPr_2) && name.includes(queryPr_3) && name.includes(queryPr_4) && gesprr_A != 'Ja') {
				ausgabe(produkt, col, ergebnisse);
				ergebnisse++;
			}	
		case 5: // RIGONI ASIAGO ERDBEER MARMELADE BIO
			if (name.includes(queryPr_1) && name.includes(queryPr_2) && name.includes(queryPr_3) && name.includes(queryPr_4) && name.includes(queryPr_5) && gesprr_A != 'Ja') {
				ausgabe(produkt, col, ergebnisse);
				ergebnisse++;
			}			
	}
	return ergebnisse;
}


function query_Split_Sparte (queryPrSp, queryPrKat, sparte, name, produkt, gesprr_A, ergebnisse) {

	let queryPrSp_split = queryPrSp.split(" ");
	let queryPrSp_1, queryPrSp_2, queryPrSp_3, queryPrSp_4, queryPrSp_5;

	for (kk=0; kk<queryPrSp_split.length; kk++) {
		if (kk===0)  queryPrSp_1 = queryPrSp_split[0]
		if (kk===1)  queryPrSp_2 = queryPrSp_split[1]
		if (kk===2)  queryPrSp_3 = queryPrSp_split[2]
		if (kk===3)  queryPrSp_4 = queryPrSp_split[3]
		if (kk===4)  queryPrSp_5 = queryPrSp_split[4]
	}

	switch(queryPrSp_split.length) {
		case 1: // RIGONI
		if (sparte == queryPrKat && (name.includes(queryPrSp_1)) && gesprr_A != 'Ja') {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
		case 2: // RIGONI ASIAGO
		if (sparte == queryPrKat && (name.includes(queryPrSp_1) && name.includes(queryPrSp_2)) && gesprr_A != 'Ja') {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}	
		case 3: // RIGONI ASIAGO ERDBEER
		if (sparte == queryPrKat && (name.includes(queryPrSp_1) && name.includes(queryPrSp_2) && name.includes(queryPrSp_3)) && gesprr_A != 'Ja') {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}
		case 4: // RIGONI ASIAGO ERDBEER MARMELADE
		if (sparte == queryPrKat && (name.includes(queryPrSp_1) && name.includes(queryPrSp_2) && name.includes(queryPrSp_3) && name.includes(queryPrSp_4)) && gesprr_A != 'Ja') {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}	
		case 5: // RIGONI ASIAGO ERDBEER MARMELADE BIO
		if (sparte == queryPrKat && (name.includes(queryPrSp_1) && name.includes(queryPrSp_2) && name.includes(queryPrSp_3) && name.includes(queryPrSp_4) && name.includes(queryPrSp_5)) && gesprr_A != 'Ja') {
			ausgabe(produkt, col, ergebnisse);
			ergebnisse++;
		}		  
	}
	return ergebnisse;
}


// ##################################


function query_Split_VK (queryVK2, nameVK, kunde, gesprr_A, ergebnisseVK) {
	// console.log(nameVK);
	let queryVK2_split = queryVK2.split(" ");
	let queryVK2_1, queryVK2_2, queryVK2_3;

	for (ii=0; ii<queryVK2_split.length; ii++) {
		if (ii===0)  queryVK2_1 = queryVK2_split[0]
		// if (ii===0)  console.log("OK: ein Wort match");
		if (ii===1)  queryVK2_2 = queryVK2_split[1]
		if (ii===2)  queryVK2_3 = queryVK2_split[2]		
	}
	// console.log(queryVK2_split.length); // 1
	// console.log(queryVK2_1); // BASSA
	// console.log(nameVK);
	
	switch(queryVK2_split.length) {
		case 1: // PAOLA
			if (nameVK.toLowerCase().includes(queryVK2_1.toLowerCase()) && gesprr_A != 'Standard') {
				// console.log("ein Wort match");
				ausgabeVK(kunde, ergebnisseVK);
				ergebnisseVK++;
			}
			break;
		case 2: // DE PAOLA
			if (nameVK.toLowerCase().includes(queryVK2_1.toLowerCase()) || nameVK.toLowerCase().includes(queryVK2_2.toLowerCase()) && gesprr_A != 'Standard') {
				// console.log("zwei Wörter match");
				ausgabeVK(kunde, ergebnisseVK);
				ergebnisseVK++;
			}
			break;
		case 3: // DE PAOLA KONDITOREI
			if (nameVK.toLowerCase().includes(queryVK2_1.toLowerCase()) || nameVK.toLowerCase().includes(queryVK2_2.toLowerCase()) || nameVK.toLowerCase().includes(queryVK2_3.toLowerCase()) && gesprr_A != 'Standard') {
				// console.log("drei Wörter match");
				ausgabeVK(kunde, ergebnisseVK);
				ergebnisseVK++;
			}
			break;			
	}
	// console.log(ergebnisseVK);
	return ergebnisseVK;
}



////////////////////////////////////////////////////



