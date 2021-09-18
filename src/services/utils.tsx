export type nameOfCookie = 'token' | 'refresh-token';

export function getCookie(name: nameOfCookie) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\\.$?*|{}\\(\\)\\[\]\\\\/\\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: nameOfCookie, value: string, props: any) {
  props = props || {};
  let exp = props.expires || 20 * 60;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: nameOfCookie) {
  setCookie(name, '', { expires: -1 });
}

export function getDateTimeInSpecialFormat(someDate: Date): (string | null) {

  if (!someDate) {
    return null;
  }

  const isToday = ((someDate: Date, today: Date): boolean => {
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear();
  });

  const isYestoday = ((someDate: Date, today: Date): boolean => {

    const offsetHours = Math.ceil(Math.abs(someDate.getTime() - today.getTime()) / (1000 * 3600));

    return offsetHours > today.getHours() && offsetHours < today.getHours() + 24;
  });

  const isDayBeforeYesterday = ((someDate: Date, today: Date): boolean => {

    const offsetHours = Math.ceil(Math.abs(someDate.getTime() - today.getTime()) / (1000 * 3600));

    return offsetHours > today.getHours() + 24 && offsetHours < today.getHours() + 48;
  });

  someDate = new Date(someDate);
  const today = new Date();

  let result = ``;

  if (isToday(someDate, today)) {
    result += `Сегодня`;
  }
  else if (isYestoday(someDate, today)) {
    result += `Вчера`;
  }
  else if (isDayBeforeYesterday(someDate, today)) {
    result += `2 дня назад`;
  } else {
    result += `${new Intl.DateTimeFormat('ru', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }).format(someDate)}`
  }

  result += `, `;
  result += `${new Intl.DateTimeFormat('ru', { hour: 'numeric', minute: 'numeric' }).format(someDate)}`;

  result += ` i-GMT`;
  result += `${someDate.getHours() - someDate.getUTCHours() > 0 ? "+" : "-"}`;
  result += `${someDate.getHours() - someDate.getUTCHours()}`;

  return result;
};