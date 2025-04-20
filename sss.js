function stringHTMLVK_VK () {
	stringHTML = `
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



			<div class="bildVK">
				<div style="font-size: 15px; font-weight: bold; color: #C70039"> ${prodVK.karte || ""}</div>
				<div style="font-size: 15px; font-weight: bold">${prodVK.firma !== "•••" ? prodVK.firma : ""} </div>				
				<div style="font-size: 15px; font-weight: bold">${prodVK.nachname !== "•••" ? prodVK.nachname : ""}	</div>		
				<div style="font-size: 15px; font-weight: bold">${prodVK.vorname !== "•••" ? prodVK.vorname : ""} </div>
			</div>
			
			
			

&nbsp;

			<div class="bildVK">
				${prodVK.karte || ""}
				${prodVK.firma !== "•••" ? prodVK.firma : ""}			
				${prodVK.nachname !== "•••" ? prodVK.nachname : ""}		
				${prodVK.vorname !== "•••" ? prodVK.vorname : ""} 
			</div>
			
			


			<div class="bildVK">
				<div style="font-size: 15px; font-weight: bold; color: #C70039"> ${prodVK.karte || ""}</div>
				<div style="font-size: 15px; font-weight: bold">${prodVK.firma !== "•••" ? prodVK.firma : ""} </div>				
				<div style="font-size: 15px; font-weight: bold">${prodVK.nachname !== "•••" ? prodVK.nachname : ""}	</div>		
				<div style="font-size: 15px; font-weight: bold">${prodVK.vorname !== "•••" ? prodVK.vorname : ""} </div>
			</div>
			
			
			


			// let nameVK = nachnameX + ' ' + firmaX;
				// console.log('OK');	
				
			// if (nachnameX == "•••") { 
				// console.log('OK');
				// nameVK = firmaX;
				// console.log(nameVK);
			// }
			// else { 
				// nameVK = nachnameX + ' ' + firmaX; 
				// console.log('NO');
				// console.log(nameVK);
			// }
			
			// console.log(gesprr_A);
			// console.log(nachnameX);
			// console.log(firmaX);
			// console.log(typeof(firmaX));
			
			
			
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




	
<nav style="font-weight: bold" class="abstand1">
	<input type="text" id="queryVK2" oninput="this.value = this.value.toUpperCase()" maxlength="13"
	  name="qpr" placeholder="Wiederverkäufer...">
	  <button onclick="searchVK2()">GO!</button>
</nav>


function stringHTML_VK () {
	stringHTML = `
	  <div class="productContainer">
	  <div class="bild">${prod.karte}<br>
		${prod.firma}<br>${prod.nachname}<br>${prod.vorname}<br>	  
	  </div>
	  
	  <div class="prddaten">
		<div style="font-weight: bold; color: #C70039">${prod.gruppe}</div>
		<div style="font-weight: bold; color: #C70039">${prod.telefon}</div>
		<div style="font-weight: bold; color: #C70039">${prod.plz}</div>
		<div style="font-weight: bold; color: #C70039">${prod.strasse}</div>
		<div style="font-weight: bold; color: #C70039">${prod.stadt}</div>
		<div style="font-weight: bold; margin-bottom: 15px;">${prod.mail}</div>
	</div>
	</div>
	`;

}



function colonne() { // 35 Säulen
	// let column = Object.values(database[0]) // riga nr. 2
	let col = { }

	col.karteIndex = 0;
	col.vornameIndex = 1;
	col.nachnameIndex = 2;
	col.gruppeIndex = 3;
	col.firmaIndex = 4;
	col.geburtIndex = 6;
	col.geschlechtIndex = 7;
	col.plzIndex = 8;
	col.strasseIndex = 9;
	col.bundesIndex = 10;
	col.stadtIndex = 11;	
	col.mailIndex = 13;
	col.telefonIndex = 14;

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
		  
			<div> <td style="font-weight: bold; color: #C70039">${prod.nr}</td> • <td style="color: #008000">PLU-Nr:</td> <td style="font-weight: bold; color: #008000">${prod.waage}</td>
			
			</div>
			
			<div style="font-weight: bold; margin-bottom: 15px;">${prod.name}</div>`;		
		
	}
	
}


###############

	stringHTML = `<table><tr>

		<td style="width: 35px; text-align: center; font-weight: bold; color: #C70039"> ${prod.nr}</td>
		
		<td style="font-weight: bold"> &nbsp; ${prod.name}</td>
		
		<td style="width: 45px; margin-left: 32px; text-align: center; font-weight: bold; color: #018749">• ${prod.sparte}</td>
		
    </tr></table>`;
	
	
############################	


##########################
ORIGINAL

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
			<div> <span style="font-weight: bold; color: #C70039">${prod.nr}</span> • <span style="color: #008000">PLU-Nr:</span> <span style="font-weight: bold; color: #008000">${prod.waage}</span>
			
			
			</div>
			<div style="font-weight: bold; margin-bottom: 15px;">${prod.name}</div>`;		
		
	}
	
}



###################

<nav id="btn_Brot" class="abstand1"><button id="btn_BROT" style="color: black" onclick="searchBrot()">Brot+Focacce</button></nav>   
	
	
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


	
	
function i_html_F() { document.getElementById('productSearched').innerHTML += stringHTML; }

function ausgabeNoBild(produkt, col, ergebnisse) {
 	prod = prod_Obj(produkt, col);
	stringHTML_F7(); 
	i_html_F();
}


function stringHTML_F7 () {
	stringHTML = `<table><tr>

		<td style="width: 35px; text-align: center; font-weight: bold; color: #C70039"> ${prod.nr}</td>
		
		<td style="font-weight: bold"> &nbsp; ${prod.name}</td>
		
		<td style="width: 45px; margin-left: 32px; text-align: center; font-weight: bold; color: #018749">• ${prod.sparte}</td>
		
    </tr></table>`;
}



function searchNoBild() {
	i_html();
	i_html_R();
	document.getElementById('legende').innerHTML = "NO IMAGE";  
	col = colonne();
	ergebnisse = 0;

    for (j=0; j < database.length; j++) {
		let produkt = Object.values(database[j]);
		let mengeA = produkt[col.mengeIndex];
		let mengeBstA = produkt[col.mengeBstIndex];
		let gesprr_A = produkt[col.gesprrIndex];
		let nrA = produkt[0];
		
		let flagNB = 0;
		let img = new Image();
		
		img.src = `img/${nrA}.jpg`;
		
		img.onerror = function() {
			flagNB = 1;
		};		
		

		if (gesprr_A != 'Ja' && flagNB == 1) {
			ausgabeNoBild(produkt, col, ergebnisse);
			ergebnisse++;
			console.log('OK');
		}
    }
	erg_html_F();
}




###############################


function bild_F (prod) {
	bild = `<img src="img/${prod.nr}.jpg" onerror="this.src='img/noimage.jpg'" style="width: auto; height: 310px;">`;
	return bild;
}

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


function ausgabeSpr(produkt, col, ergebnisse) {
 	prod = prod_Obj(produkt, col);
	bild = bild_F (prod);
	stringHTML_F5();
	i_html_F();
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




