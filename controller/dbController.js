let mongo = require('mongodb');
let {MongoClient} = require('mongodb');
// let mongoUrl ="mongodb+srv://Swat10:helloworld@cluster0.pbkgybn.mongodb.net/zomato?retryWrites=true&w=majority" 
let mongoUrl ="mongodb+srv://Swat10:helloworld@cluster0.pbkgybn.mongodb.net/flipkart?retryWrites=true&w=majority" 

let client = new MongoClient(mongoUrl)

async function dbConnect(){
    await client.connect()
}

let db = client.db('flipkart');

async function getData(colName,query,projection){
    let output = [];
    try{
        const cursor = db.collection(colName).find(query,projection);
        for await(const data of cursor){
            output.push(data)
        }
        cursor.closed
    } catch(err){
        output.push({"Error":"Error in getData"})
    }
    return output
}

async function postData(colName,data){
    let output;
    try{
        output = await db.collection(colName).insertOne(data)
    }
    catch(err){
        output = {"response":"Error in postData"}
    }
    return output
}

async function updateOrder(colName,condition,data){
    let output;
    try{
        output = await db.collection(colName).updateOne(condition,data)
    } catch(err){
        output = {"response":"Error in update data"}
    }
    return output
}

async function deleteOrder(colName,condition){
    let output;
    try{
        output = await db.collection(colName).deleteOne(condition)
    } catch(err){
        output = {"response":"Error in delete data"}
    }
    return output
}

module.exports = {
    dbConnect,
    getData,
    postData,
    updateOrder,
    deleteOrder
}