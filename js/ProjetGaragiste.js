"use strict"

document.addEventListener("DOMContentLoaded", loadDateTime);

//Variables Globales

let cout = 0;
const tabMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const tabJours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
let tabServices = [];
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

    if (timeM > 60){
        timeM -= 60;
        timeH += 1;
    }
    
let aujHeure = timeH + ":" + timeM;
    if (Number(aujHeure.substr(0,2)) < 7){
    
        document.getElementById("time").setAttribute("min", "07:00");
        document.getElementById("time").setAttribute("value", "07:00");
    
    }
    else if (Number(aujHeure.substr(0,2)) > 18){
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

function validerForm(f){
    var err = 0; //compteur
    let nom = f.Nom.value;
    if (! nom){
        err ++;
    }
    return !err;
}

function envoyerForm(){
    
    let form = document.formClient;
    
    let nom = form.Nom.value;
    let prenom = form.Prenom.value;
    let date = form.Date.value;
    let heure = form.Heure.value;
    let code = form.Promo.value;
    
    let cb = document.getElementsByClassName("serv");
    
    if (cb.length == 0){
        alert("Vous n'avez choisi aucun service !");
        return;
    }
    if (cb[0].checked){
        tabServices += "Réparation crevaison de pneu";
        cout += 25;
    }
    if (cb[1].checked){
        tabServices += "Diagnostic électroniques";
        cout += 54.78;
    }
    if (cb[2].checked){
        tabServices += "Diagnostic freinage";
        cout += 35;
    }
    if (cb[3].checked){
        tabServices += "Diagnostic tenue de route";
        cout += 29.99;
    }
    if (cb[4].checked){
        tabServices += "Diagnostic batterie et circuit de charge";
        cout += 15.99;
    }
    if (code == "seb"){
        cout -= cout*(15/100);
        cout = cout.toFixed(2);
    }
    
    let donnees = [nom, prenom, date, heure, cout];
    alert(donnees);
    
    let dateChoix = new Date(date);
    let numeroJour = dateChoix.getDay();
    let nomJour = tabJours[numeroJour];
    let tabDate = date.split("-");//"2020-08-23" => [2020, 08, 23]
    tabDate.push(nomJour);// [2020, 08, 23, dimanche]
    let nomMois = tabMois[(tabDate[1])-1]; // 08 -> Août
    
    console.log(tabServices);
    
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
    documentDiv.querySelector("p.para1").textContent = prenom + " " + nom + " est attendu le " + nomJour + " " + numeroJour + " " + tabMois[(tabDate[1])-1] + " à " + heure + " pour une examination de sa voiture.";
    documentDiv.querySelector("p.para2").textContent = "Le(s) service(s) demandé(s) :" + " " + listServices + " sera/seront facturés à hauteur de " + cout + " €.";
    
    tabServices = [];// pour remettre à zéro la liste des services demandés
    cout = 0;// pour remettre à zero le compteur après utilisation du formulaire
}

