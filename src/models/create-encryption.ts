import MD5 from "crypto-js/md5";

const ts = new Date().getTime();
const privateKey = process.env.REACT_APP_MARVEL_PV_KEY ? process.env.REACT_APP_MARVEL_PV_KEY : "";
const publicKey = process.env.REACT_APP_MARVEL_PB_KEY;
const mixed = ts + privateKey + publicKey;
const hash = MD5(mixed).toString();

export { ts, privateKey, publicKey, mixed, hash };
