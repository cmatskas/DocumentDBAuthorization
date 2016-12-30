var crypto = require("crypto");
var moment = require("moment");

let masterKey = "RTBA2c8HivHZ0un7wnl23rC1QNyzOUIpOiKGIVUJkuQbw3Vd8xVxIdhbI8IAEmfhjT5djis25JL6ODNZb0xLkw==";
let dateInRfc7231Format = moment().format("ddd, DD MMM YYYY HH:mm:ss");
let dateWithTimeZone = dateInRfc7231Format + " GMT";
console.debug(dateWithTimeZone);
// list all databases
//let result = getAuthorizationTokenUsingMasterKey("GET", "", "dbs", dateWithTimeZone, masterKey);

// list all collections within a db
//let result = getAuthorizationTokenUsingMasterKey("GET", "dbs/demodb", "colls", dateWithTimeZone, masterKey);

// create new collection
//let result = getAuthorizationTokenUsingMasterKey("POST", "dbs/demodb", "colls", dateWithTimeZone, masterKey);

// list all documents
//let result = getAuthorizationTokenUsingMasterKey("GET", "dbs/demodb/colls/student", "docs", dateWithTimeZone, masterKey);

let result = getAuthorizationTokenUsingMasterKey("POST", "dbs/demodb/colls/student", "docs", dateWithTimeZone, masterKey);


console.debug(result);

function getAuthorizationTokenUsingMasterKey(verb, resourceId, resourceType, date, masterKey) {  
    var key = new Buffer(masterKey, "base64");  

    var text = (verb || "").toLowerCase() + "\n" +   
               (resourceType || "").toLowerCase() + "\n" +   
               (resourceId || "") + "\n" +   
               (date || "").toLowerCase() + "\n" +   
               "" + "\n";

    var body = new Buffer(text, "utf8");  
    var signature = crypto.createHmac("sha256", key).update(body).digest("base64");
    var MasterToken = "master";  
    var TokenVersion = "1.0";  

    return encodeURIComponent("type=" + MasterToken + "&ver=" + TokenVersion + "&sig=" + signature);  
}