/**
 * Database
 */
const Query = require("../config/database");
const password_hash = require("password-hash");

/**
 * Pengguna model
 */

const pengguna = {
    login: (username,password,callback) => {
        Query.where({username}).limit(1,0)
        .get("pengguna",function(err,data){
            if(err) return callback(err,false);

            if(data.length) {
                if(password_hash.verify(password,data[0].password)){
                    return callback(null,{
                        ...data[0],
                        password: undefined
                    });
                } else {
                    return callback(null,false);
                }
            } else {
                return callback(null,false);
            }
        });
    },
    list_fields: (cb) => {
        Query.query("DESCRIBE `pengguna`",function(err,data){
            if(err) return cb(err,data);
            let fields = [];
            for(let i=0;i<data.length;i++) {
                fields.push(data[i].Field);
            }
            cb(err,fields);
        });
    }
}

module.exports = pengguna;