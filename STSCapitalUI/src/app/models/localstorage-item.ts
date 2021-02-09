const USER = 'USER';
const ACCESS_TOKEN = 'ACCESS_TOKEN';

const LOCALSTORAGE_KEY = {
    USER,
    ACCESS_TOKEN
};
export { LOCALSTORAGE_KEY };

export function GetAccessToken(): any {
    let data = localStorage.getItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
    if (data && data !== 'undefined' && data !== '' && data !== 'null') {
        data = JSON.parse(data);
    } else {
        data = undefined;
    }

    return data;
}

export function GetUser(): any {
    let data = localStorage.getItem(LOCALSTORAGE_KEY.USER);
    if (data && data !== 'undefined' && data !== '' && data !== 'null') {
        data = JSON.parse(data);
    } else {
        data = undefined;
    }

    return data;
}

