import CryptoJS from "crypto-js";


export function encryptData(text) {
    // const secretPass = '8080808080808080';
    // const iv="8080808080808080";
    // const data = CryptoJS.AES.encrypt(
    //   text,
    //   secretPass,{iv:iv}
    // ).toString();

    // var KEY = "12345678900000001234567890000000";//32 bit
    // var IV = "1234567890000000";//16 bits
    
    var KEY = "12345678900000001234567807102023";//32 bit
    var IV = "1234567807102023";//16 bits

        var key = CryptoJS.enc.Utf8.parse(KEY);
        var iv = CryptoJS.enc.Utf8.parse(IV);

        var encrypted = '';

        var srcs = CryptoJS.enc.Utf8.parse(text);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return encrypted.ciphertext.toString();

  }

export function decryptData(text) {
    //   const secretPass = 'my-secret-key@SGS302412';
    // const bytes = CryptoJS.AES.decrypt(text, secretPass);
    // const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //  return data
    // var KEY = "12345678900000001234567890000000";//32 bit
    // var IV = "1234567890000000";//16 bits

    var KEY = "12345678900000001234567807102023";//32 bit
    var IV = "1234567807102023";//16 bits
    
        var key = CryptoJS.enc.Utf8.parse(KEY);
        var iv = CryptoJS.enc.Utf8.parse(IV);

        var decrypted = '';

        var srcs = CryptoJS.enc.Utf8.parse(text);
        decrypted = CryptoJS.AES.decrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return decrypted.ciphertext.toString();
  }

  
// const CryptoJS = require('crypto-js');
// function Encrypt(str) {
//                  var KEY = "12345678900000001234567890000000";//32 bit
//                  var IV = "1234567890000000";//16 bits
//         var key = CryptoJS.enc.Utf8.parse(KEY);
//         var iv = CryptoJS.enc.Utf8.parse(IV);

//         var encrypted = '';

//         var srcs = CryptoJS.enc.Utf8.parse(str);
//         encrypted = CryptoJS.AES.encrypt(srcs, key, {
//             iv: iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7
//         });

//         return encrypted.ciphertext.toString();
//     }
// var encryptedEmployeeId = Encrypt("1031");
// console.log(encryptedEmployeeId);
//result would be EF082204BF6F804099396A96CC7733F4