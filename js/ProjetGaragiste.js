"use strict"

document.addEventListener("DOMContentLoaded", loadDateTime);

//Variables Globales

let cout = 0;
const tabMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
let tabServices = [];

//Délimiter la date et l'heure min pour le date picker et l'input "Time" à aujourd'hui

function loadDateTime(){
    
const auj = new Date();//Pour récupérer la date d'aujourd'hui
var jj = auj.getDate();
var mm = auj.getMonth()+1; // car Janvier vaut 0
var aaaa = auj.getFullYear();
    
const demain = new Date();//Pour récupérer la date de demain
demain.setDate(demain.getDate() + 1);
var jj2 = demain.getDate();
var mm2 = demain.getMonth();
var aaaa2 = demain.getFullYear();

var timeH = auj.getHours();// Pour récupérer l'heure actuelle
var timeM = auj.getMinutes()+30;// car je veux que le client arrive 15 minutes à l'avance, et je donne 15 minutes pour qu'il arrive

    if (jj<10){
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
    
}