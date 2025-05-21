function encryptText() {
    let input = document.getElementById("inputText").value;
    let encrypted = btoa(input); // Simple encodage en Base64
    document.getElementById("encryptedText").value = encrypted;
}

function copyText() {
    let encryptedText = document.getElementById("encryptedText");
    encryptedText.select();
    document.execCommand("copy");
}

function sendText() {
    let encrypted = document.getElementById("encryptedText").value;

    if (!encrypted.trim()) {
        alert("Veuillez d'abord crypter un texte.");
        return;
    }

    // Construction du lien mailto
    const email = ""; // <- tu peux mettre une adresse par défaut ici si tu veux
    const subject = encodeURIComponent("Texte crypté - CRYPTEXIS");
    const body = encodeURIComponent(encrypted);

    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    // Ouvrir Gmail avec le contenu crypté
    window.open(mailtoLink, '_blank');
}
