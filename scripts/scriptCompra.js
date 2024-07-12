

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.size-buttons3');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Desativa todos os botões
            buttons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            
            // Ativa o botão clicado
            button.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            mainImage.src = this.src;
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
});