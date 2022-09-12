const express=require("express")
const db=require("./connection")

const app=express()

app.use(express.json())

app.use(express.urlencoded({extended:true}))

const port=5000

app.listen(port,()=>{

    console.log("server started at port 5000")

})
db.connect((err,_res)=>{

    if(!err){

        console.log("db connected")

    }else{

        console.log(err)

    }

})
app.get("/library",(req,res)=>{

    db.query("select * from library",(err,result)=>{

        if(!err){

            res.send(result.rows).status(200)

        }else{

            console.log(err)

            res.status(400)

        }

    })

})
app.post("/library",(req,res)=>{

    const library=req.body

    let insertdata=`insert into library(name,id,year,author)
    values('${library.name}','${library.id}','${library.year}',${library.author})`

    db.query(insertdata,(err,result)=>{

        if(!err){

            console.log("book added Successfully")

            res.send("success").status(200)

        }else{

            console.log("data insertion failed",err)

            res.status(400)

        }

    })

})
app.get("/library/:id",(req,res)=>{
    let search=`select * from library where id='${req.params.id}' or name='${req.params.id}' or author='${req.params.id}' or cast(year as text)='${req.params.id}' or cast(page as text)='${req.params.id}'`
    db.query(search,(err,result)=>{
        if(!err){
            res.send(result.rows).status(200)
        }else{
            res.send("no data found").status(400)
        }        
    })
})
app.delete("/library/:id",(req,res)=>{
    let deleteData=`delete from library where id='${req.params.id}'`
    db.query(deleteData,(err,result)=>{
        if(!err){
            console.log("deleted")
            res.send("success").status(200)
        }else{
            console.log("error")
        }
    })
})