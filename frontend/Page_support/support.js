// Gestion du formulaire de support
document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const description = document.getElementById('description').value;
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Masquer les messages précédents
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Validation simple
    if (!email || !description) {
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Veuillez entrer une adresse email valide.';
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    // Simulation d'envoi (remplacez par votre logique d'envoi réelle)
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simuler un délai d'envoi
    setTimeout(() => {
        // Afficher le message de succès
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Réinitialiser le formulaire
        document.getElementById('supportForm').reset();
        
        // Restaurer le bouton
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Ici vous pouvez ajouter votre logique d'envoi réelle
        // Exemple d'appel AJAX :
        /*
        fetch('/api/support', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                description: description
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                successMessage.style.display = 'block';
                document.getElementById('supportForm').reset();
            } else {
                errorMessage.style.display = 'block';
            }
        })
        .catch(error => {
            errorMessage.style.display = 'block';
            console.error('Erreur:', error);
        });
        */
        
        console.log('Formulaire soumis:', { email, description });
        
    }, 1500);
});

// Animation au focus des champs
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Validation en temps réel
document.getElementById('email').addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
        this.style.borderColor = '#dc3545';
    } else {
        this.style.borderColor = '#ddd';
    }
});

// Compteur de caractères pour la description (optionnel)
document.getElementById('description').addEventListener('input', function() {
    const maxLength = 1000;
    const currentLength = this.value.length;
    
    // Créer ou mettre à jour le compteur
    let counter = this.parentElement.querySelector('.char-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            font-size: 12px;
            color: #666;
            text-align: right;
            margin-top: 5px;
        `;
        this.parentElement.appendChild(counter);
    }
    
    counter.textContent = `${currentLength}/${maxLength} caractères`;
    
    if (currentLength > maxLength) {
        counter.style.color = '#dc3545';
        this.style.borderColor = '#dc3545';
    } else {
        counter.style.color = '#666';
        this.style.borderColor = '#ddd';
    }
});