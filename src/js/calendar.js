document.addEventListener('DOMContentLoaded', function() {
    const months = [
      {
        id: 'may',
        name: 'Май',
        year: 2025,
        days: 31,
        firstDay: 4
      },
      {
        id: 'june',
        name: 'Июнь',
        year: 2025,
        days: 30,
        firstDay: 6 
      }
    ];
  
    let selectedStart = null;
    let selectedEnd = null;
  
    months.forEach(month => {
      const monthEl = document.getElementById(month.id);
      const daysContainer = monthEl.querySelector('.days');
      
      for (let i = 0; i < month.firstDay; i++) {
        daysContainer.appendChild(createEmptyDay());
      }
      
      for (let day = 1; day <= month.days; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'day';
        dayEl.textContent = day;
        dayEl.dataset.date = `${month.year}-${month.id}-${day}`;
        
        const dayOfWeek = (month.firstDay + day - 1) % 7;
        if (dayOfWeek === 5 || dayOfWeek === 6) {
          dayEl.classList.add('weekend');
        }
        
        dayEl.addEventListener('click', () => handleDayClick(dayEl));
        daysContainer.appendChild(dayEl);
      }
    });
  
    function createEmptyDay() {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'day empty';
      return emptyDay;
    }
  
    function handleDayClick(dayEl) {
      const dateStr = dayEl.dataset.date;
      
      if (!selectedStart || (selectedStart && selectedEnd)) {
        clearSelection();
        selectedStart = { element: dayEl, date: dateStr };
        selectedEnd = null;
        dayEl.classList.add('selected');
      } else {
        selectedEnd = { element: dayEl, date: dateStr };
        updateSelection();
      }
    }
  
    function clearSelection() {
      document.querySelectorAll('.day').forEach(day => {
        day.classList.remove('selected', 'in-range', 'first-in-range', 'last-in-range');
      });
    }
  
    function updateSelection() {
      clearSelection();
      
      if (new Date(selectedEnd.date) < new Date(selectedStart.date)) {
        [selectedStart, selectedEnd] = [selectedEnd, selectedStart];
      }
      
      const allDays = Array.from(document.querySelectorAll('.day:not(.empty)'));
      const startIndex = allDays.findIndex(day => day === selectedStart.element);
      const endIndex = allDays.findIndex(day => day === selectedEnd.element);
      
      for (let i = startIndex; i <= endIndex; i++) {
        allDays[i].classList.add('in-range');
      }
      
      selectedStart.element.classList.add('selected', 'first-in-range');
      selectedEnd.element.classList.add('selected', 'last-in-range');
    }
  });