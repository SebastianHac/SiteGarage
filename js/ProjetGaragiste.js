"use strict"

document.addEventListener("DOMContentLoaded", loadDateTime);
document.addEventListener("reset", resetErr);

//Variables Globales

const service = [
    
        {
            nomService: "Réparation crevaison de pneu",
            tarif: 25 
    },
        {
            nomService: "Diagnostic électroniques",
            tarif: 54.78
    },
        {
            nomService: "Diagnostic freinage",
            tarif: 35
    },
        {
            nomService: "Diagnostic tenue de route",
            tarif: 29.99
    },
        {
            nomService: "Diagnostic batterie et circuit de charge",
            tarif: 15.99
    }
    
];


// tableaux


const tabMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const tabJours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
let tabServices = [];


// Date


const auj = new Date();//Pour récupérer la date d'aujourd'hui
const demain = new Date();//Pour récupérer la date de demain
demain.setDate(demain.getDate() + 1);
var timeH = auj.getHours();// Pour récupérer l'heure actuelle
var timeM = auj.getMinutes()+30;// car je veux que le client arrive 15 minutes à l'avance, et je donne 15 minutes pour qu'il arrive



//Délimiter la date et l'heure min pour le date picker et l'input "Time" à aujourd'hui

 function loadDateTime(){
    
var jj = auj.getDate();
var mm = auj.getMonth()+1; // car Janvier vaut 0
var aaaa = auj.getFullYear();
    
var jj2 = demain.getDate();
var mm2 = demain.getMonth();
var aaaa2 = demain.getFullYear();

    if (jj<10){// or jj.length < 2
        jj = "0" + jj;
    }
    if (mm<10){
        mm = "0" + mm;
    }
    if (jj2<10){
        jj2 = "0" + jj2;
    }
    if (mm2<10){
        mm2 = "0" + mm2;
    }

let aujDate = aaaa + "-" + mm + "-" + jj;
let demainDate = aaaa2 + "-" + mm2 + "-" + jj2;
document.getElementById("date").setAttribute("min", aujDate); // cannot read property setAttributes of null (pcq page était pas chargé entièrement avant que je change l'attribut)
document.getElementById("date").setAttribute("value", aujDate);

    if (timeM >= 60){
        timeM -= 60;
        timeH += 1;
    }
    if (timeM < 10){
        timeM = "0" + timeM; // entre 30 et 40 problème résolu
    }
    if (timeH >= 24){
        timeH -= 24;
    }
    
let aujHeure = timeH + ":" + timeM;
    if (Number(aujHeure.substr(0,2)) < 7){
    
        document.getElementById("time").setAttribute("min", "07:00");
        document.getElementById("time").setAttribute("value", "07:00");
    
    }
    else if (Number(aujHeure.substr(0,2)) >= 18){
        document.getElementById("date").setAttribute("min", demainDate);
        document.getElementById("date").setAttribute("value", demainDate);
        document.getElementById("time").setAttribute("min", "07:00");
        document.getElementById("time").setAttribute("value", "07:00");
    }
    else{
        
        document.getElementById("time").setAttribute("min", aujHeure);
        document.getElementById("time").setAttribute("value", aujHeure);
    }
    
} 

// fonction validation formulaire

function onlyLetters(test){
    if (test.match(/^[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/)){
        return false;
    }
    else{
        return true;
    }
}

function resetErr(){
    document.querySelector("form.formulaire").querySelector("div#errPrenom").textContent = "";
    document.querySelector("form.formulaire").querySelector("div#errNom").textContent = "";
    document.querySelector("input#nom").style.borderColor = "";
    document.querySelector("input#prenom").style.borderColor = "";
}

function validerForm(){
    
    let form = document.formClient;
    let nom = form.Nom.value;
    let prenom = form.Prenom.value;
    let documentForm = document.querySelector("form.formulaire");
    let errNom = documentForm.querySelector("div#errNom");
    let errPrenom = documentForm.querySelector("div#errPrenom");
    let inputNom = document.querySelector("input#nom");
    let inputPrenom = document.querySelector("input#prenom");
    
    if (onlyLetters(nom) && onlyLetters(prenom)){
        inputNom.style.borderColor = "#D8152D";
        inputPrenom.style.borderColor = "#D8152D";
        errPrenom.textContent = "Le Prénom ne peut contenir que des lettres!";
        errNom.textContent = "Le Nom ne peut contenir que des lettres!";
    }
    
    else if (onlyLetters(nom)){
        inputNom.style.borderColor = "#D8152D";
        inputPrenom.style.borderColor = "";
        errPrenom.textContent = "";
        errNom.textContent = "Le Nom ne peut contenir que des lettres!";
    }
    
    else if (onlyLetters(prenom)){
        inputPrenom.style.borderColor = "#D8152D";
        inputNom.style.borderColor = "";
        errPrenom.textContent = "Le Prénom ne peut contenir que des lettres!";
        errNom.textContent = "";
    }
    
    else if(document.querySelectorAll('input[type="checkbox"]:checked').length == 0){
        inputNom.style.borderColor = "";
        inputPrenom.style.borderColor = "";
        errPrenom.textContent = "";
        errNom.textContent = "";
        alert("Vous devez au moins sélectionner un service !");
    }
    
    else{
        inputNom.style.borderColor = "";
        inputPrenom.style.borderColor = "";
        errPrenom.textContent = "";
        errNom.textContent = "";
        envoyerForm(nom, prenom, form);
    }
    
}

function envoyerForm(nom, prenom, form){
    
    let date = form.Date.value;
    let heure = form.Heure.value;
    let cout = 0;// cout avec/ sans promo
    let cout2 = 0;// cout sans promo
    let codeCorrect = false;// booléen pour vérifier code promo
    let coutPromo = "";// string pour texte "-15% de..."
    let code = form.Promo.value;
    let cb = document.getElementsByClassName("serv");
    
    for (let i in cb){
        if (cb[i].checked){
            tabServices.push(service[i].nomService);
            cout += service[i].tarif;
        }
    }
    
    cout2 = cout.toFixed(2);
    
    if (code == "seb"){
        cout -= cout*(15/100);
        codeCorrect = true;
    }
    
    if (codeCorrect == true){
        coutPromo = "(- 15% de " + cout2 + "€)";
    }
    
    cout = cout.toFixed(2);

    let dateChoix = new Date(date);//Thu Aug 20 2020 02:00:00 GMT+0200 (heure d’été d’Europe centrale)
    let numeroJour = dateChoix.getDay();//valeur entre 0-6 qui correspond aux jours de la semaine
    let nomJour = tabJours[numeroJour];// Jour de la semaine basé sur le num -> 4 = Jeudi
    let tabDate = date.split("-");//"2020-08-23" => [2020, 08, 23]
    tabDate.push(nomJour);// [2020, 08, 23, dimanche]
    let nomMois = tabMois[(tabDate[1])-1]; // 08 -> Août
    
    let listServices = "";
    for (let i = 0; i < tabServices.length; i++){
        listServices += tabServices[i] + ", ";
    }
    
 
        let documentSection = document.querySelector("section#RDV");
        documentSection.querySelector("h1.RDV").textContent = "À très bientôt !";
    
        document.getElementById("Mois").innerHTML = nomMois;
        document.getElementById("Jour").innerHTML = tabDate[3];
        document.getElementById("NumeroJour").innerHTML = tabDate[2];
        document.getElementById("Annee").innerHTML = tabDate[0];

        let documentDiv = document.querySelector("div.texte");
        documentDiv.querySelector("p.para1").textContent = prenom + " " + nom + " est attendu(e) le " + nomJour + " " + tabDate[2] + " " + tabMois[(tabDate[1])-1] + " à " + heure + " pour une examination de sa voiture.";
        documentDiv.querySelector("p.para2").textContent = "Le(s) service(s) demandé(s) :" + " " + listServices + " sera/seront facturés à hauteur de " + cout + " €." + coutPromo;
        
        var rdv = document.getElementById("RDV");
        rdv.scrollIntoView();
  

    
    tabServices = [];// pour remettre à zéro la liste des services demandés
    cout = 0;// pour remettre à zero le compteur après utilisation du formulaire
}
