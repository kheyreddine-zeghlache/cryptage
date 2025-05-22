async function decryptText() {
    let input = document.getElementById("inputText").value;
    if (!input.trim()) {
        alert("Veuillez entrer un texte à décrypter");
        return;
    }

    try {
        // Séparer la clé et le texte chiffré (format: "CLÉ|TEXTE_CHIFFRÉ")
        const [key, encryptedText] = input.split('|');
       
        if (!key || !encryptedText) {
            throw new Error("Format invalide. Le texte doit être au format 'CLÉ|TEXTE_CHIFFRÉ'");
        }

        const response = await fetch('/api/decrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                encrypted: encryptedText,
                key: key
            })
        });
       
        if (!response.ok) {
            throw new Error('Erreur réseau');
        }
       
        const result = await response.json();
       
        if (result.error) {
            throw new Error(result.error);
        }
       
        document.getElementById("encryptedText").value = result.decrypted;
    } catch (error) {
        console.error("Erreur de déchiffrement:", error);
        alert("Erreur lors du déchiffrement: " + error.message);
    }
}

// Les autres fonctions restent inchangées