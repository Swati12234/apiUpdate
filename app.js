let express = require('express');
let app = express();
let port = process.env.PORT||9120;
let Mongo = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

let {dbConnect,getData,postData,updateOrder,deleteOrder} = require('./controller/dbController')

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

app.get('/',(req,res) => {
    res.send('Hiii From express')
})

// get all location
app.get('/category',async (req,res)=>{
    let query = {};
    let collection = "category"
    let output = await getData(collection,query)
    res.send(output)
})


app.get('/sub_cat', async (req,res) => {
    let query = {};
    let collection = "sub_cat";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/item_list', async (req,res) => {
    let query = {};
    let collection = "item_list";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/item_list', async(req,res) => {
   
    if(req.query.catId && req.query.winterId){
       let query ={Cat_id: Number(req.query.catId),"Sweaters_&_Jackets.Winter_id": Number(req.query.winterId)}
       console.log(query);
    }
   
    else if(req.query.winterId){
       let query={"Sweaters_&_Jackets.Winter_id": Number(req.query.winterId)}
    }
    else{
       let query = {};
    }
   
    let collection = "item_list";
    let output = await getData(collection,query);
    res.send(output);
})

app.get('/filter/:hello', async(req,res) => {
   let hello = req.params.hello
   res.send(hello)
})
app.get('/filter/:Saree_id', async(req,res) => {
    let lcost = Number(req.query.lcost)
    let hcost = Number(req.query.hcost)
  
  if(lcost && hcost){
        query = {
            $and:[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    else{
        query = {}
    }
    let collection = "item_list";
    let output = await getData(collection,query);
    res.send(output)
})

// details

app.get('/details/:id', async(req,res) => {
    let id = Number(req.params.id);
    let query = {Cat_id:id};
    let collection = "item_list";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/detailsB/:id', async(req,res) => {
    let id = Number(req.params.id);
    let query = {Cat_B_id:id};
    let collection = "item_list";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/detailsC/:id', async(req,res) => {
    let id = Number(req.params.id);
    let query = {Cat_C_id:id};
    let collection = "item_list";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/detailsD/:id', async(req,res) => {
    let id = Number(req.params.id);
    let query = {Cat_D_id:id};
    let collection = "item_list";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/detailsE/:id', async(req,res) => {
    let id = Number(req.params.id);
    let query = {Cat_E_id:id};
    let collection = "item_list";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/detailsF/:id', async(req,res) => {
    let id = Number(req.params.id);
    let query = {Cat_F_id:id};
    let collection = "item_list";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/detailsG/:id', async(req,res) => {
    let id = Number(req.params.id);
    let query = {Cat_G_id:id};
    let collection = "item_list";
    let output = await getData(collection,query);
    res.send(output)
})

app.get('/detailsH/:id', async(req,res) => {
    let id = Number(req.params.id);
    let query = {Cat_H_id:id};
    let collection = "item_list";
    let output = await getData(collection,query);
    res.send(output)
})
//orders
app.get('/Orders',async(req,res) => {
   
    let query = {};
    if(req.query.email){
        query={email:req.query.email}
    }
  
   let collection = "Orders";
    let output = await getData(collection,query);
    res.send(output)
})


//placeOrder

app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    let collection = "Orders";
    console.log(">>>",data)
    let response = await postData(collection,data)
    res.send(response)
})

// Item details {"id":[4,8,21]}

app.post('/womenClothes',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {Cat_id:{$in:req.body.id}};
        let collection = 'item_list';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
})

app.post('/womenFootwear',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {Cat_B_id:{$in:req.body.id}};
        let collection = 'item_list';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
})

app.post('/womenAccessories',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {Cat_C_id:{$in:req.body.id}};
        let collection = 'item_list';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
})

app.post('/menClothes',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {Cat_D_id:{$in:req.body.id}};
        let collection = 'item_list';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
})

app.post('/menFootwear',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {Cat_E_id:{$in:req.body.id}};
        let collection = 'item_list';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
})

app.post('/menAccessories',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {Cat_F_id:{$in:req.body.id}};
        let collection = 'item_list';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
})

app.post('/electronics',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {Cat_G_id:{$in:req.body.id}};
        let collection = 'item_list';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
})

app.post('/grocery',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {Cat_H_id:{$in:req.body.id}};
        let collection = 'item_list';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
})

//update
app.put('/updateOrder',async(req,res) => {
    let collection = 'Orders';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "name":req.body.name
        }
    }
    let output = await updateOrder(collection,condition,data)
    res.send(output)
})

//delete order
app.delete('/deleteOrder',async(req,res) => {
    let collection = 'Orders';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let output = await deleteOrder(collection,condition)
    res.send(output)
})


app.listen(port,(err) => {
    dbConnect()
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})