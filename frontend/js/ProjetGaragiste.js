"use strict"

//Event

document.addEventListener("DOMContentLoaded", loadDateTime);
document.addEventListener("reset", resetErr);

//Objet

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

//Tableaux

const tabMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const tabJours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
let tabServices = [];

//Date

const auj = new Date();//Pour récupérer la date d'aujourd'hui
const demain = new Date();
demain.setDate(demain.getDate() + 1);//Pour récupérer la date de demain
let timeH = auj.getHours();// Pour récupérer l'heure actuelle
let timeM = auj.getMinutes()+30;// car je veux que le client arrive 15 minutes à l'avance, et je donne 15 minutes pour qu'il arrive

/**
 * Récupère la date et l'heure actuelle pour déterminer la valeur min de l'input "Date" et la valeur min et max de l'input "Time"
 */
 function loadDateTime(){
    
let jj = auj.getDate();
let mm = auj.getMonth()+1; // car Janvier vaut 0
let aaaa = auj.getFullYear();
    
let jj2 = demain.getDate();// 9
let mm2 = demain.getMonth();// 8
let aaaa2 = demain.getFullYear();// 2020

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
/**
 * Test une string pour déterminer si elle contient autre chose que des lettres avec/sans accent
 * @param {string} test - la string à tester
 * @return {boolean} renvoie FALSE si la string contient que des lettres et TRUE dans le cas contraire
 */
function onlyLetters(test){
    if (test.match(/^[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/)){
        return false;
    }
    else{
        return true;
    }
}
/**
 * Permet de supprimer le contenu de balises HTML et les valeurs de certaines propriétés CSS
 */
function resetErr(){
    document.querySelector("form.formulaire").querySelector("div#errPrenom").textContent = "";
    document.querySelector("form.formulaire").querySelector("div#errNom").textContent = "";
    document.querySelector("input#nom").style.borderColor = "";
    document.querySelector("input#prenom").style.borderColor = "";
}
/**
 * Permet de vérifier si les informations entrées dans le formulaire sont celles attendues et qu'il est complété avant d'appeler la fonction "envoyerForm"
 */
function validerForm(){
    
    let form = document.formClient;
    let nom = form.Nom.value;
    let prenom = form.Prenom.value;
    let documentForm = document.querySelector("form.formulaire");
    let errNom = documentForm.querySelector("div#errNom");
    let errPrenom = documentForm.querySelector("div#errPrenom");
    let inputNom = document.querySelector("input#nom");
    let inputPrenom = document.querySelector("input#prenom");
    
    if (onlyLetters(nom)){
        inputNom.style.borderColor = "#D8152D";
        errNom.textContent = "Le Nom ne peut contenir que des lettres!";
    }
    else {
        inputNom.style.borderColor = "";
        errNom.textContent = "";
    }
    
    
    if (onlyLetters(prenom)){
        inputPrenom.style.borderColor = "#D8152D";
        errPrenom.textContent = "Le Prénom ne peut contenir que des lettres!";
    }
    else {
        inputPrenom.style.borderColor = "";
        errPrenom.textContent = "";
    }
    
    
    if(document.querySelectorAll('input[type="checkbox"]:checked').length == 0){
        alert("Vous devez au moins sélectionner un service !");
    }
    
    
    if (! onlyLetters(nom) && ! onlyLetters(prenom) && document.querySelectorAll('input[type="checkbox"]:checked').length > 0){
        inputNom.style.borderColor = "";
        inputPrenom.style.borderColor = "";
        errPrenom.textContent = "";
        errNom.textContent = "";
        envoyerForm(nom, prenom, form);
    }
    
}
/**
 * Récupère les dernières données du Formulaire et les affiche sous forme de calendrier avec un résumé et une liste de rappels
 * @param {string} nom - récupère la valeur entrée dans le formulaire depuis la fonction "validerForm"
 * @param {string} prenom - récupère la valeur entrée dans le formulaire depuis la fonction "validerForm"
 * @param {undefined} form - récupère l'élément formulaire dans le html
 */
function envoyerForm(nom, prenom, form){
    

    /* RECUPERER LES INFORMATIONS DU FORMULAIRES + TRANSFORMATION */

    
    let date = form.Date.value;
    let heure = form.Heure.value;
    let cout = 0;// cout avec/sans promo
    let cout2 = 0;// cout sans promo
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
    

    /* AFFICHER LES INFORMATIONS DANS LA SECTION "RDV" */
    
    /* CALENDRIER */

    let documentSection = document.querySelector("section#RDV");
    documentSection.querySelector("h1#RDV").textContent = "À très bientôt !";
    
    document.getElementById("Mois").innerHTML = nomMois;
    document.getElementById("Jour").innerHTML = tabDate[3];
    document.getElementById("NumeroJour").innerHTML = tabDate[2];
    document.getElementById("Annee").innerHTML = tabDate[0];

    /* TEXTE CLIENT */

    let documentDiv = document.querySelector("div#texte");
    documentDiv.querySelector("p#para1").textContent = prenom + " " + nom + " est attendu(e) le " + nomJour + " " + tabDate[2] + " " + nomMois + " à " + heure + " pour une examination de sa voiture.";
    documentDiv.querySelector("p#para2").textContent = "Le(s) service(s) demandé(s) :" + " " + listServices + " sera/seront facturés à hauteur de " + cout + " €." + coutPromo;

    /* RAPPEL */

    let tabRappel = ["Soyez présents 1/4 d'heure avant l'heure de rendez-vous !","Le paiement sur place peut s'effectuer par cash, par bancontact ou par carte de crédit.","Le port du masque est OBLIGATOIRE dans l'enceinte de notre établissement."];
    let rappel = "<h2>Rappel :</h2><ul>";
    for (let i = 0; i < tabRappel.length; i++){
        rappel += "<li>" + tabRappel[i] + "</li>"
    }
    rappel += "</ul>";
    document.getElementById("boxRappel").innerHTML = rappel;
        



    var rdv = document.getElementById("RDV");
    rdv.scrollIntoView();
    tabServices = [];// pour remettre à zéro la liste des services demandés
    cout = 0;// pour remettre à zero le compteur après utilisation du formulaire
}
