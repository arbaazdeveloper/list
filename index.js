const express=require('express')
const app=express();
const path=require('path')
const port=process.env.PORT||5000
let list=require('./list')
const cors=require('cors')

app.use(cors())
app.use(express.json())

console.log(__dirname)
app.get('/',(req,res)=>{
    res.json(list)

})
app.post('/page',(req,res)=>{
    const last=list[list.length-1]
    const id=last.id+1
    const newReg={
        id:id,
        name:req.body.name,
        email:req.body.email
    }
   
    list.push(newReg)
    res.json(list)
})

 app.delete('/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    list=list.filter((item)=>item.id !==id)
    res.json(list)
 })


 app.put('/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const obj=list.find((item)=>item.id===id)
    const name=req.body.name
    const email=req.body.email
    Object.assign(obj,{name:name,email:email})
    res.json(obj)
 })
app.get('/page',(req,res)=>{
    res.sendFile(path.join(__dirname)+'/file/index.html')
})

app.listen(port,()=>{
    console.log('the server is satrted')
})