export function useCreatedTime() {
  const now = new Date();
  const [year, month, date, hours, minutes, seconds] = [
    now.getFullYear(),

    `${now.getMonth() + 1}`.padStart(2, "0"),
    `${now.getDate()}`.padStart(2, "0"),
    `${now.getHours()}`.padStart(2, "0"),
    `${now.getMinutes()}`.padStart(2, "0"),
    `${now.getSeconds()}`.padStart(2, "0"),
  ];

  const createdTime = `${
    year + month + date + "_" + hours + minutes + seconds
  }`;

  return { createdTime };
}
