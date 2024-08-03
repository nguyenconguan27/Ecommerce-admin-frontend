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

export const getAccessTokenFromLS = () =>
  localStorage.getItem("access_token") || "";
export const getRefreshTokenFromLS = () =>
  localStorage.getItem("refresh_token") || "";
export const saveAccesTokenToLS = (access_token) => {
  localStorage.setItem("access_token", access_token);
};

export const saveRefreshTokenToLS = (refresh_token) => {
  localStorage.setItem("refresh_token", refresh_token);
};

export const LocalSotrageEventTarget = new EventTarget();

export const clearLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");
  localStorage.removeItem("refresh_token");
  const clearLSEvent = new Event("clearLS");
  LocalSotrageEventTarget.dispatchEvent(clearLSEvent);
};

export const saveProfileToLS = (profile) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};
