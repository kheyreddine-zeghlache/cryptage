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
    alert("Données envoyées : " + encrypted);
}
