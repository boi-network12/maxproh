// src/config/apiConfig.tsx

let API_URL = 'https://maxproh.onrender.com/api'; // default to production

if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;

  if (
    hostname === 'localhost' ||
    hostname.startsWith('192.') || 
    hostname.startsWith('127.') ||
    hostname === '0.0.0.0'
  ) {
    API_URL = 'http://192.168.4.4:5000/api'; 
  }

}

export { API_URL };
