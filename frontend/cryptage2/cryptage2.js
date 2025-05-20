function decryptText() {
    let input = document.getElementById("inputText").value;
    let decrypted = atob(input); // Simple décodage en Base64
    document.getElementById("encryptedText").value = decrypted;
}


function copyText() {
    let decryptedText = document.getElementById("encryptedText");
    decryptedText.select();
    document.execCommand("copy");
}


function pasteText() {
    navigator.clipboard.readText().then(text => {
        document.getElementById("inputText").value = text;
    });
}


function importText() {
    // Logique pour importer du texte depuis un fichier
    alert("Fonctionnalité d'importation à implémenter");
}


function exportText() {
    let decrypted = document.getElementById("encryptedText").value;
    // Logique pour exporter du texte vers un fichier
    alert("Fonctionnalité d'exportation à implémenter");
}
