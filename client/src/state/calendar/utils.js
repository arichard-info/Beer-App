export function getMonthElIndex(months, m, y) {
  let month = false;
  let year = false;
  if (typeof m.getMonth === "function") {
    month = m.getMonth();
    year = m.getFullYear();
  } else if (Number.isInteger(m) && Number.isInteger(y)) {
    const date = new Date(Date.UTC(y, m, 1));
    month = date.getMonth();
    year = date.getFullYear();
  } else return false;
  const index = months.findIndex(el => el.month === month && el.year === year);
  return index;
}

export function scrollToMonth(container, index) {
  const currentEl = container.childNodes[index];
  const scrollPosition = currentEl.offsetTop;
  container.scroll(0, scrollPosition);
}
