	${prodVK.plz !== "•••" && prodVK.plz ? `<div>${prodVK.plz}</div>` : ""}	&nbsp;			
	${prodVK.stadt !== "•••" && prodVK.stadt ? `<div>${prodVK.stadt}</div>` : ""}	
	
				
				
			let nr_vorname = 1;
			let nr_nachname = 2;
			let nr_gruppe = 3;
			let nr_firma = 4;
			let nr_geburt = 6;
			let nr_plz = 8;
			let nr_strasse = 9;
			let nr_bundes = 10;
			let nr_stadt = 11;
			let nr_mail = 12;
			let nr_telefon = 13;




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



			let nr_vorname = 1;
			let nr_nachname = 2;
			let nr_gruppe = 3;
			let nr_firma = 4;
			let nr_geburt = 6;
			let nr_plz = 8;
			let nr_strasse = 9;
			let nr_bundes = 10;
			let nr_stadt = 11;
			let nr_mail = 12;
			let nr_telefon = 13;
			
			console.log(typeof(kunde[1]));




			if (typeof(kunde[1]) !== "string") {
				console.log ('OK');
				nr_nachname--; nr_gruppe--; nr_firma--; nr_geburt--; nr_plz--; nr_strasse--; nr_bundes--; nr_stadt--; nr_mail--; nr_telefon--;
			} 
			
			if (typeof(kunde[2]) !== "string") {
				nr_gruppe--; nr_firma--; nr_geburt--; nr_plz--; nr_strasse--; nr_bundes--; nr_stadt--; nr_mail--; nr_telefon--;
			}	

			if (typeof(kunde[4]) !== "string") {
				nr_geburt--; nr_plz--; nr_strasse--; nr_bundes--; nr_stadt--; nr_mail--; nr_telefon--;
			}	

			if (typeof(kunde[5]) !== "string") {
				nr_plz--; nr_strasse--; nr_bundes--; nr_stadt--; nr_mail--; nr_telefon--;
			}	

			if (typeof(kunde[6]) !== "string") {
				nr_plz--; nr_strasse--; nr_bundes--; nr_stadt--; nr_mail--; nr_telefon--;
			}	
			
			if (typeof(kunde[7]) !== "string") {
				nr_strasse--; nr_bundes--; nr_stadt--; nr_mail--; nr_telefon--;
			}				

			if (typeof(kunde[8]) !== "string") {
				nr_bundes--; nr_stadt--; nr_mail--; nr_telefon--;
			}	

			if (typeof(kunde[9]) !== "string") { nr_stadt--; nr_mail--; nr_telefon--; }	

			if (typeof(kunde[10]) !== "string") { nr_mail--; nr_telefon--; }	
			if (typeof(kunde[11]) !== "string") { nr_mail--; nr_telefon--; }	
			if (typeof(kunde[12]) !== "string") { nr_telefon--; }