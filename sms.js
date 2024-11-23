const twilio = require('twilio')
const express = require ('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv/config')
const token = process.env.account_token
const sid = process.env.account_sid

const client = twilio(sid,token)

app.use(bodyParser.json())
app.post('/sms',(req,res)=>{
   const {message,number} = req.body 
   console.log(message,number);
        client.messages.create({
            body : message,
            to : number,
            from : process.env.number
        }).then(()=>{
            res.status(200).send("Message sent successfully.")
        }).catch((err)=>{
            console.error(err);
            res.status(400).send("Message sent failed")
        })
})


app.listen(3000,()=>{
    console.log("Server running on port 3000")
})




