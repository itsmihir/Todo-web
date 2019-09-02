const express = require('express');
const app = express();

var Datastore = require('nedb');
var dblist = new Datastore('database.db');
dblist.loadDatabase();

app.use(express.static('public'));
app.use(express.json({limit:'3mb'}));

app.listen(8080,()=>console.log('listening at port 8080'));

app.get('/all',(request,response)=>
{
    dblist.find({},function(err,docs)
    {
        response.json(docs);
    })
})


app.post('/removeall',(request,response)=>
{
    
    dblist.remove({}, { multi: true }, function (err, numRemoved) {
    });
})

app.post('/remove',(request,response)=>
{
    const arr = request.body;
    console.log(arr);
    //const c = "hi";
     for(let i=0;i<arr.length;i++)
     {
         console.log(arr[i])
        dblist.remove({data:arr[i]},function(err,docs){})
    }
})

app.post('/database',(request,response)=>
{

const data = request.body.val;
console.log(data);
dblist.insert({data},function(err,docs){})


})