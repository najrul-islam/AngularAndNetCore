export const JSONX = {

    tryParse: (x = '', def = {}) => { 
        let result;

        try {
            result = JSON.parse(x);
        } catch (e) {
            return def;
        }

        return result;
    },

    tryParseG: function <T>(x = ''): T { 
        let result;

        try {
            result = JSON.parse(x) as T;
        } catch (e) {
            result = {};
        }
        return result;
    }

};
