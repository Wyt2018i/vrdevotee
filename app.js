const express=require('express');
const bodyParser=require('body-parser');
const PORT=process.env.PORT||8080;
const user=require('./routes/userFunctions');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/user',user);
app.listen(PORT,()=>{
  console.log('server started');
});
