export function getMonthElIndex(months, m, y) {
  let month = false;
  let year = false;
  if (typeof m.getMonth === "function") {
    month = m.getMonth();
    year = m.getFullYear();
  } else if (Number.isInteger(m) && Number.isInteger(y)) {
    month = m % 12;
    year = y;
  } else {
    return false;
  }
  const index = months.findIndex(el => el.month === month && el.year === year);
  return index;
}

export function scrollToMonth(container, index) {
  const currentEl = container.childNodes[index];
  const scrollPosition = currentEl.offsetTop;
  container.scroll(0, scrollPosition);
}
