document.addEventListener('DOMContentLoaded', function() {
  const burgerBtn = document.getElementById('burgerBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  
  burgerBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('active');
  });
  
  document.addEventListener('click', function() {
    dropdownMenu.classList.remove('active');
  });
  
  dropdownMenu.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});