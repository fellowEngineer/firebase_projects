const db = require ("./db_config");

async function getData(email_id){
    // const userRef = (await db.collection("users").doc(email_id).get()).data();
    const uRef = db.collection("users").doc(email_id);
    const response = await uRef.get();
    const uData = response.data();
    return uData;
}

module.exports = getData;