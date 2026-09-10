//menentukan panel surya
function energiDisuplai(etotal, eta){
    return etotal / eta;
}
/* eta = Effisiensi Sistem (Umumnya 0,7-0,8) 
Etotal = Energi total sistem (wh) */

function dayaPanel (energi, h){
    return energi / h;
}
//H = Lama penyinaran matahati perjam

function jumlahPanel (daya, panelR){
    return daya / panelR;
}
//panelR = panel yang tersedia

//menentukan SCC
function scc (daya, vsistem){
    return (daya / vsistem) * 1.25;
}

//mentukan inverter
function inverter(beban){
    return beban * 1.25;
}

//menentukan baterai
function energiPenyimpanan(etotal, ehari){
    return etotal * ehari;
}
//Ehari = Hari otonomi (biasanya 1-3 hari)

function kapasitasBaterai(ebat, dod, vsistem){
    return ebat / (dod * vsistem);
}
/*Vistem = Tegangan sistem (12V/24V/48V) 
DoD = Depth Of Discharge (0,5-0,8) */

function jumlahBaterai(cbat, bateraiR){
    return cbat / bateraiR ;
}
//ebat = energy tototal
//cbat = kapasitas baterai
//nbat = baterai tersedia

function hitung(){
    //menghubungkan ke halaman html
    let etotal = parseFloat(document.getElementById("dayatotal").value);
    let eta = parseFloat(document.getElementById("effisiensi").value);
    let h = parseFloat(document.getElementById("jammatahari").value);
    let panelR = parseFloat(document.getElementById("rpanel").value);
    let vsistem = parseFloat(document.getElementById("sistemplts").value);
    let inv = parseFloat(document.getElementById("invplts").value);
    let ehari = parseFloat(document.getElementById("hotonomi").value);
    let dod = parseFloat(document.getElementById("dodplts").value);
    let bateraiR = parseFloat(document.getElementById("rbaterai").value);

    //mulai memasukkan rumus nya
    let epanel = energiDisuplai(etotal, eta);
    let ppanel = dayaPanel(epanel, h);
    let npanel = jumlahPanel(ppanel, panelR);
    let sccpanel = scc (ppanel, vsistem);
    let databeban = inverter(inv);
    let ebat = energiPenyimpanan(etotal, ehari);
    let cbat = kapasitasBaterai(ebat, dod, vsistem);
    let nbat = jumlahBaterai(cbat, bateraiR)

    //menampilkan hasil ke html
    document.getElementById("hasil").innerHTML = `
    Daya yang harus disuplai: ${epanel.toFixed(2)} Wh <br>
    Daya panel surya: ${ppanel.toFixed(2)} W <br>
    Jumlah panel: ${Math.ceil(npanel)} Pcs <br>
    SCC Min: ${sccpanel.toFixed(2)} A <br>
    Inverter: ${databeban.toFixed(2)} W <br>
    Kebutuhan Baterai: ${cbat.toFixed(2)} Ah <br>
    Jumlah Baterai: ${Math.ceil(nbat)} Pcs
  `;

}

function clearForm(){
    let ids = [
    "dayatotal", "effisiensi", "jammatahari", "rpanel",
    "sistemplts", "invplts", "hotonomi", "dodplts", "rbaterai"
    ];
    ids.forEach(id => document.getElementById(id).value = "");
    document.getElementById("hasil").innerHTML = "";
}
console.log('Script Jalan');
