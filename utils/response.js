/**
 * Response Utils
 */

const response = {
    setRequiredPost: (fields,body,cb) => {
        let errorFields = [];
        for(let i=0;i<fields.length;i++) {
            if(!body[fields[i]]) {
                errorFields.push(fields[i]);
            }
        }
        cb(errorFields);
    },
    filterMethodField: (body,fields) => {
        for(let prop in body) {
            if(body.hasOwnProperty(prop)) {
                if(fields.indexOf(prop) === -1) {
                    delete body[prop];
                }
            }
        }
        return body;
    }
}

module.exports = response;