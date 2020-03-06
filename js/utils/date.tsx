const isValidDate = (date: Date): boolean =>
  date instanceof Date && !isNaN(date.getTime());

const formatDateString = (date: string): string => {
  const d = new Date(date);

  if (!isValidDate(d)) {
    return '';
  }

  const formattedDate = d.toLocaleDateString().replace(/\//g, '.');
  const formattedTime = `${d.getHours()}:${d.getMinutes()}`;

  return `${formattedDate} ${formattedTime}`;
};

export {formatDateString, isValidDate};
