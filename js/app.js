const API_URL = "https://script.google.com/macros/s/AKfycbx4Dt5LPHxrQL8HThefz16qRp_vHh7rEv-Cnh_PmwLrixuWlQPPkMLrhuj2CtPGaGeZ/exec";

let members = [];

async function loadMembers() {
    try {
        const response = await fetch(API_URL);
        members = await response.json();

        console.log("Loaded", members.length, "members");

    } catch (err) {
        console.error(err);
        alert("Unable to load Church Directory");
    }
}

loadMembers();

document.getElementById("directoryBtn").addEventListener("click", showFamilies);

function showFamilies() {

    let families = {};

    members.forEach(member => {

        if (!families[member.FamilyID]) {

            families[member.FamilyID] = {
                familyName: member.FamilyName,
                address: member.Address,
                members: []
            };

        }

        families[member.FamilyID].members.push(member);

    });

    let html = "";

    Object.values(families).forEach(family => {

        html += `
        <div class="card">
            <h2>${family.familyName}</h2>
            <p><strong>Members :</strong> ${family.members.length}</p>
            <button onclick="showMembers('${family.familyName}')">
                View Family
            </button>
        </div>
        `;

    });

    document.getElementById("content").innerHTML = html;

}

function showMembers(familyName){

    let html="<h2>"+familyName+"</h2>";

    members
        .filter(m=>m.FamilyName===familyName)
        .forEach(member=>{

            html+=`
            <div class="card">

                <h3>${member.MemberName}</h3>

                <p>${relationship(member.Relationship)}</p>

                <p>🎂 ${member.DOB || "-"}</p>

                <p>📞 ${member.Phone || "-"}</p>

            </div>
            `;

        });

    html+=`<br><button onclick="showFamilies()">⬅ Back</button>`;

    document.getElementById("content").innerHTML=html;

}

function relationship(code){

    const map={
        HOF:"Head of Family",
        W:"Wife",
        S:"Son",
        D:"Daughter",
        DL:"Daughter-in-law",
        GS:"Grand Son",
        GD:"Grand Daughter"
    };

    return map[code] || code;

}
