// Auth.js
import Cookies from 'js-cookie';
import xml2js from 'xml2js';

const authenticateWithADFS = () => {
  const currentDate = new Date().toISOString();
  const adfsLoginUrl = `https://login.usm.my/adfs/ls/?wa=wsignin1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my/login&wctx=OmtlYmFqaWthbnNpc3dhLnVzbS5teS86`;
  window.location.href = adfsLoginUrl;
  console.log(window.location.href)
};

const processToken = (tokenXml) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(tokenXml, { explicitArray: false }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const logout = () => {
  Cookies.remove('email');
  Cookies.remove('password');
  window.location.href = '/'; // Redirect to the home page or any desired destination
};

export { authenticateWithADFS, processToken, logout };