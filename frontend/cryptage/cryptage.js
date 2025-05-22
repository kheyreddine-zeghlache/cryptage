async function encryptText() {
    let input = document.getElementById("inputText").value;
    if (!input.trim()) {
        alert("Veuillez entrer un texte à crypter");
        return;
    }

    try {
        const response = await fetch('/api/crypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: input })
        });
       
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
       
        const result = await response.json();
       
        // Afficher le résultat sous forme: "CLÉ|TEXTE_CHIFFRÉ"
        const combinedOutput = `${result.key}|${result.encrypted}`;
        document.getElementById("encryptedText").value = combinedOutput;
    } catch (error) {
        console.error("Erreur de chiffrement:", error);
        alert("Erreur lors du chiffrement: " + error.message);
    }
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