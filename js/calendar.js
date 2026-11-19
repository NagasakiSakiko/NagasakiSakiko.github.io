(() => {
  'use strict';

  const pad = value => String(value).padStart(2, '0');
  const sameDay = (left, right) =>
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate();

  const dayOfYear = date => {
    const start = new Date(date.getFullYear(), 0, 0);
    return Math.floor((date - start) / 86400000);
  };

  const isoWeek = date => {
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = target.getDay() || 7;
    target.setDate(target.getDate() + 4 - day);
    const yearStart = new Date(target.getFullYear(), 0, 1);
    return Math.ceil(((target - yearStart) / 86400000 + 1) / 7);
  };

  const initCalendar = () => {
    const root = document.querySelector('#aside-calendar');
    if (!root || root.dataset.calendarReady === 'true') return;
    root.dataset.calendarReady = 'true';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let selected = new Date(today);
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();

    const weekLabel = root.querySelector('[data-calendar-week]');
    const dayLabel = root.querySelector('[data-calendar-day]');
    const fullDateLabel = root.querySelector('[data-calendar-full-date]');
    const title = root.querySelector('[data-calendar-title]');
    const days = root.querySelector('[data-calendar-days]');

    const renderSummary = () => {
      const weekday = new Intl.DateTimeFormat('zh-CN', { weekday: 'long' }).format(selected);
      weekLabel.textContent = `第 ${isoWeek(selected)} 週 · ${weekday}`;
      dayLabel.textContent = selected.getDate();
      fullDateLabel.textContent = `${selected.getFullYear()}年${selected.getMonth() + 1}月 · 第 ${dayOfYear(selected)} 天`;
    };

    const selectDate = date => {
      selected = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      viewYear = selected.getFullYear();
      viewMonth = selected.getMonth();
      render();
    };

    const render = () => {
      renderSummary();
      title.textContent = `${viewYear} 年 ${pad(viewMonth + 1)} 月`;
      days.replaceChildren();

      const firstDay = new Date(viewYear, viewMonth, 1);
      const gridStart = new Date(viewYear, viewMonth, 1 - firstDay.getDay());
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      const cellCount = Math.ceil((firstDay.getDay() + daysInMonth) / 7) * 7;

      for (let index = 0; index < cellCount; index += 1) {
        const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'calendar-date';
        button.textContent = date.getDate();
        button.setAttribute('role', 'gridcell');
        button.setAttribute('aria-label', `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`);

        if (date.getMonth() !== viewMonth) button.classList.add('is-outside');
        if (sameDay(date, today)) {
          button.classList.add('is-today');
          button.setAttribute('aria-current', 'date');
        }
        if (sameDay(date, selected)) {
          button.classList.add('is-selected');
          button.setAttribute('aria-selected', 'true');
        }

        button.addEventListener('click', () => selectDate(date));
        days.appendChild(button);
      }
    };

    root.querySelector('[data-calendar-prev]').addEventListener('click', () => {
      viewMonth -= 1;
      if (viewMonth < 0) {
        viewMonth = 11;
        viewYear -= 1;
      }
      render();
    });

    root.querySelector('[data-calendar-next]').addEventListener('click', () => {
      viewMonth += 1;
      if (viewMonth > 11) {
        viewMonth = 0;
        viewYear += 1;
      }
      render();
    });

    root.querySelector('[data-calendar-today]').addEventListener('click', () => selectDate(today));
    render();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalendar, { once: true });
  } else {
    initCalendar();
  }
  document.addEventListener('pjax:complete', initCalendar);
})();
