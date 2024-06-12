export function formatNumberToSocialStyle(value) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace(".", ",")
    .toLocaleLowerCase();
}

export function formatCurrency(currency) {
  return new Intl.NumberFormat("de-DE").format(currency);
}

export const dateTranfer = (time) => {
  let date = new Date(time);
  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  let year = date.getUTCFullYear();
  let formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
