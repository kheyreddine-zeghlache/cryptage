document.getElementById("add-user-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        class: document.getElementById("class").value
    };

    const response = await fetch("/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    const result = await response.json();
    const messageElem = document.getElementById("message");

    if (result.success) {
        messageElem.textContent = "Utilisateur ajouté avec succès.";
    } else {
        messageElem.textContent = "Erreur : " + result.message;
        messageElem.style.color = "red";
    }
});
