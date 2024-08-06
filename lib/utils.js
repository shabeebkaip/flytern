import { format, parse } from "date-fns";
import CryptoJS from 'crypto-js';




const secretKey = 'crypto@123#'; 

export const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decryptUrl = (encryptedUrl) => {
  const rawRef = encryptedUrl;
  const encodedRef = encodeURIComponent(rawRef);
  const bytes = CryptoJS.AES.decrypt(encodedRef,'crypto@123#');
  return bytes.toString(CryptoJS.enc.Utf8);
}

                                           
export function checkApiStatus(response) {
  return (response && response.data && response.data.statusCode >= 200 && response.data.statusCode < 300)
}
export function generateBrowserFingerprint() {
  if (typeof window !== 'undefined') {
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;

    // Combine various browser properties
    const fingerprint = [
      navigatorInfo.userAgent,
      navigatorInfo.language,
      screenInfo.height,
      screenInfo.width,
      new Date().getTimezoneOffset()
    ].join('-');
    const hashedFingerprint = hashString(fingerprint);

    const trimmedFingerprint = hashedFingerprint.substring(0, 39);

    return trimmedFingerprint;
  }
  return null;
}


function hashString(input) {
  let hash = 0, i, chr;
  for (i = 0; i < input.length; i++) {
    chr = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
}

export function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}



export function dateFormatter(value) {
  return format(parse(value, 'dd-MM-yyyy', new Date()), 'MMM dd, yyyy')
}
export function flightDateFormatter(value) {
  return format(parse(value, 'yyyy-MM-dd', new Date()), 'MMM dd, yyyy')
}
export function decimalParser(value) {
  if (Number.isInteger(value)) {
    return parseInt(value);
  } else {
    return parseFloat(value).toFixed(2);
  }
}
export function getLocalStore(key) {
  return JSON.parse(localStorage.getItem(key));
}
export const removeEmptyKey = (obj) => {
  for (let keyParam in obj) {
    if (obj[keyParam] === null || obj[keyParam] === undefined || obj[keyParam] === '' || obj[keyParam].length === 0) {
      delete obj[keyParam];
    }
  }
  return obj;
}


export function formatDateForQuery(date, isStart) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  const monthname = date.toLocaleString('default', { month: 'short' });
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  if (isStart) {
    var time = '12:01AM'
    return [monthname, day, year, time].join(' ');
  } else {
    // var time = '11:59PM'
    return [monthname, day, year, time].join(' ');
  }
  // Jun 1 2005  1:33PM

}

export const getLocalStorageInfo = (value) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(value);
    if (data) {
      return JSON.parse(data);
    }
  }
  return null;
};


export const setGlobalCookie = (name, value, days) => {
  if (typeof document !== 'undefined') {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
}


export const getGlobalCookie = (name) => {
  if (typeof document !== 'undefined') {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const cookieValue = c.substring(nameEQ.length, c.length);
        try {
          return JSON.parse(cookieValue);
        } catch (error) {
          console.error("Failed to parse cookie value:", cookieValue, error);
          return null;
        }
      }
    }
  }
  return null;
}



export const clearAllCookies = () => {
  if (typeof document !== 'undefined') {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }
}


