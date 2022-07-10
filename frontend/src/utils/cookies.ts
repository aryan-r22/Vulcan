export const createCookieInHour = (
  cookieName: string,
  cookieValue: string | null,
  hourToExpire: number
) => {
  let date = new Date();
  date.setTime(date.getTime() + hourToExpire * 60 * 60 * 1000);
  document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toUTCString();
};

export const getCookie = (name: string) => {
  function escape(s: string) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
  }
  var match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)"));
  return match ? match[1] : null;
};
