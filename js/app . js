const API_URL = "https://script.google.com/macros/s/AKfycbx4Dt5LPHxrQL8HThefz16qRp_vHh7rEv-Cnh_PmwLrixuWlQPPkMLrhuj2CtPGaGeZ/exec";

let members = [];

async function loadMembers() {
    try {
        const response = await fetch(API_URL);
        members = await response.json();

        console.log(members);

    } catch (err) {
        alert("Unable to load church directory.");
        console.log(err);
    }
}

loadMembers();

document.getElementById("directoryBtn").addEventListener("click", showFamilies);

function showFamilies(){

    let familyMap = {};

    members.forEach(member => {

        if(!familyMap[member.FamilyID]){
            familyMap[member.FamilyID]=member;
        }

    });

    let html="";

    Object.values(familyMap).forEach(family=>{

        html += `
        <div class="card">
            <h3>${family.FamilyName}</h3>
            <p>${family.Address}</p>
        </div>
        `;

    });

    document.getElementById("content").innerHTML = html;

}
