const API_URL = "https://script.google.com/macros/s/AKfycbx4Dt5LPHxrQL8HThefz16qRp_vHh7rEv-Cnh_PmwLrixuWlQPPkMLrhuj2CtPGaGeZ/exec";

let members = [];

window.onload = function () {
    loadMembers();

    document.getElementById("directoryBtn").addEventListener("click", showFamilies);
    document.getElementById("birthdayBtn").addEventListener("click", showBirthdays);
    document.getElementById("anniversaryBtn").addEventListener("click", showAnniversaries);
};

async function loadMembers() {
    try {
        const response = await fetch(API_URL);
        members = await response.json();
        console.log("Loaded", members.length, "members");
    } catch (err) {
        console.error(err);
        alert("Unable to load church directory.");
    }
}

function showFamilies() {

    let families = {};

    members.forEach(member => {

        if (!families[member.FamilyID]) {
            families[member.FamilyID] = [];
        }

        families[member.FamilyID].push(member);

    });

    let html = "";

    Object.keys(families).forEach(fid => {

        const family = families[fid];
        const head = family[0];

        html += `
        <div class="card">
            <h2>${head.FamilyName}</h2>
            <p>${head.Address || ""}</p>
            <p><strong>${family.length}</strong> Members</p>

            <button onclick="showFamily('${fid}')">
                View Family
            </button>
        </div>
        `;

    });

    document.getElementById("content").innerHTML = html;
}

function showFamily(fid) {

    let family = members.filter(m => m.FamilyID == fid);

    let html = `
    <button onclick="showFamilies()">⬅ Back</button>
    <br><br>
    <h2>${family[0].FamilyName}</h2>
    `;

    family.forEach(member => {

        html += `
        <div class="card">

            <h3>${member.MemberName}</h3>

            <p><strong>${relationship(member.Relationship)}</strong></p>

        <p>🎂 ${formatDate(member.DOB)}</p>

            <p>📞 ${member.Phone || "-"}</p>

            <p>🏠 ${member.Address || ""}</p>

        </div>
        `;

    });

    document.getElementById("content").innerHTML = html;

}

function relationship(code) {

    const map = {
        HOF: "Head of Family",
        W: "Wife",
        S: "Son",
        D: "Daughter",
        DL: "Daughter-in-law",
        SIL: "Son-in-law",
        GS: "Grand Son",
        GD: "Grand Daughter"
    };

    return map[code] || code;

}

function showBirthdays() {

    let html = "<h2>Birthdays</h2>";

    members.forEach(member => {

        if (member.DOB) {

            html += `
            <div class="card">
                <h3>${member.MemberName}</h3>
                <p>${member.DOB}</p>
            </div>
            `;

        }

    });

    document.getElementById("content").innerHTML = html;

}

function showAnniversaries() {

    let html = "<h2>Wedding Anniversaries</h2>";

    members.forEach(member => {

        if (member["Wedding Anniversary"]) {

            html += `
            <div class="card">
                <h3>${member.MemberName}</h3>
                <p>${formatDate(member["Wedding Anniversary"])}</p>
            </div>
            `;

        }

    });

    document.getElementById("content").innerHTML = html;

}
function formatDate(dateValue) {

    if (!dateValue) return "-";

    let date = new Date(dateValue);

    if (isNaN(date)) return dateValue;

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

}
