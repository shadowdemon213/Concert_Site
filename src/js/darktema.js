
не получилось((((
  document.addEventListener('DOMContentLoaded', function() {
  const burgerIcon = document.getElementById('burgerIcon');
  const themeToggle = document.getElementById('themeToggle');
  
  if (!burgerIcon || !themeToggle) {
    console.error('Не найдены необходимые элементы!');
    return;
  }

  function updateBurgerIcon(theme) {
    const newSrc = theme === 'dark' 
      ? burgerIcon.getAttribute('data-dark-src') 
      : burgerIcon.getAttribute('data-light-src');
    
    const img = new Image();
    img.src = newSrc;
    
    img.onload = function() {
      burgerIcon.src = newSrc;
      console.log('Изображение обновлено:', newSrc);
    };
    
    img.onerror = function() {
      console.error('Не удалось загрузить изображение:', newSrc);

      burgerIcon.src = burgerIcon.getAttribute('data-light-src');
    };
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateBurgerIcon(savedTheme);

  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateBurgerIcon(newTheme);
  });
});