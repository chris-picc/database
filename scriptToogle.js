var toggles = document.querySelectorAll('.toggle');

toggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
        var navbar = this.nextElementSibling;
        navbar.classList.toggle('active');
    });
});


// document.getElementById("btn_ANG").addEventListener("click", function() {
//     // Ändere den Hintergrund des Buttons in gelb
//     this.style.backgroundColor = "#FFFF99";
// });