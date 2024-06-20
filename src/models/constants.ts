import MD5 from 'crypto-js/md5';

export const ts = new Date().getTime();
export const privateKey = process.env.MARVEL_PV_KEY ? process.env.MARVEL_PV_KEY : '';
export const publicKey = process.env.MARVEL_PB_KEY;
export const mixed = ts + privateKey + publicKey;
export const hash = MD5(mixed).toString();