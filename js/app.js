const API_URL = "https://script.google.com/macros/s/AKfycbx4Dt5LPHxrQL8HThefz16qRp_vHh7rEv-Cnh_PmwLrixuWlQPPkMLrhuj2CtPGaGeZ/exec";

let members = [];

async function loadMembers() {
    try {
        const response = await fetch(API_URL);
        members = await response.json();
        console.log("Members loaded:", members);
    } catch (err) {
        console.error(err);
        alert("Unable to load church directory.");
    }
}

loadMembers();
