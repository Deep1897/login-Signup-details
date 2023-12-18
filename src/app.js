const express=require("express");
const path=require("path");
const app= express();
require("./db/conn");
const hbs=require("hbs");
const register= require("./models/registers")
// let RegistersSchema=require("./models/registers")
const mongoose= require("mongoose");
const multer=require("multer");



const port= process.env.PORT || 4000

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partial_path=path.join(__dirname,"../templates/partials");
console.log(template_path);



app.use(express.static(static_path));
app.set("view engine","ejs");
app.set("views",template_path);
hbs.registerPartials(partial_path);

app.use(express.urlencoded({extended:false}));


// const storage = multer.diskStorage({
//     destination: (req, file, cb ) => {
//       cb(null,"../images/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname+"_"+ Date.now()+"_"+file.originalname)
//     },
// });


// var upload=multer({
//     storage:storage,
// }).single("image");











let alldata =  register.find().then((data) => {
        
           console.log(data);
   })





// app.use(express.static('public'))

app.get("/",(req,res)=>{

    res.render("index",{success:''})
})

// app.get("/register",(req,res)=>{

//     res.render("register")
// })


app.post("/getdata",async (req,res)=>{

 try {

    const pass=req.body.password;
    const cpass=req.body.cpassword;
    if(pass===cpass){
const empdata= new register({


         fullname:req.body.fullname,
         email:req.body.email,
         password:req.body.password,

        })

        console.log(empdata.image);
          
        const postdata= await empdata.save();
        // res.render("getdata");
        // console.log(find_data);
        register.find().then((data) => {
            res.render('getdata', {record : data})
           
           })
       


    }else{
        res.render("index",{success:'   Incorrect Password'})
    }
    
 } catch (error) {
    console.log(error)
 }
    
})

app.get("/getdata",(req,res)=>{


    register.find().then((data) => {
        res.render('getdata', {record : data})
       
       })



})




// app.get("/",(req,res)=>{

//     res.send("Hi i am deep ra singh")
// })


app.get("/edit/:id",async (req,res,next)=>{
    // console.log(req.params.id);
    id=req.params.id;
    // res.render("edit");
    let programmer = ''
    try {
        programmer = await register.findById(id) //fetching by ID
       res.render('edit',{data:programmer})
    } catch (err) {
          console.log(err)    }

    // res.send(programmer) //sending the response

    
})

// app.get("/getdata",(req,res)=>{
//     res.render("getdata");
// })

app.post("/update/:id", async(req,res)=>{
    let id=req.params.id;
    console.log("updateid"+ req.params.id);
    try {

        await register.findByIdAndUpdate(id, {
            fullname:req.body.fullname,
            email:req.body.email,
            password:req.body.password
        })
        
        register.find().then((data) => {
        
            res.render('getdata',{record:data})
    })
    
      
    
        
    } catch (error) {
        console.log(error);
    }
   



    // await register.findByIdAndUpdate(id, {
    //     fullname:req.body.fullname,
    //     email:req.body.email,
    //     password:req.body.password

    // },(err,result)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         req.session.message={
    //             type:'success',
    //             message:'user updated successfully'
    //         };

    //         res.redirect('/');
    //     }
    // })


})


// app.get("/delete/:id",async (req,res)=>{
//     let id=req.params.id;
//      try {

//         await register.findByIdAndRemove(id,(err,result)=>{

//             if(err){
//              console.log(err);
//             }else
//             {
//              console.log(result);
//             }
//             res.redirect("getdata")
//          })
        
//      } catch (error) {
//         console.log(error);
//      }
     
// })


// app.delete('/delete/:id',function(req,res){
    
//     var idRemove = String(req.params.id);
//     console.log(idRemove);//this part is working 
//     var user = new register(req.body);
//              console.log(user)//this part is working 

//             user.findByIdAndRemove({id :idRemove},(err, doc) => {
//                 if (!err)
//                     res.status(200).send(doc);
//                 else {
//                     res.status(500).send(err)
// //showing error here telling me that user.findByIdAndRemove is not a function
//                 }

//             })

// });



// app.get("/delete/:id", function(req, res){
//     console.log(req.params.id)
//     let removeId=req.params.id;
//     RegistersSchema.findByIdAndRemove({id:removeId}, function(err){
//       if(err){
//         res.redirect("/delete");
//       } else {
//                 res.redirect("/delete");
//       }
//     });
// });



app.get('/delete/:id', async (req,res) =>{
    
    var idRemove = String(req.params.id);
    console.log(idRemove);//this part is working 
    console.log(register);
    console.log(alldata);
    var user = new register(req.body);
             console.log(user)//this part is working 
             try {

                await register.findByIdAndDelete(idRemove)
               
                

                register.find().then((data) => {
        
                    res.render('getdata',{record:data})
            })
            
                
            } catch (error) {
                console.log(error);
            }

            

});


app.get("/login",(req,res)=>{


     register.find().then((data) => {
        
                    res.render('login',{success:''})
            })
            
})

app.post("/logindesc",(req,res)=>{
    const cemail=req.body.email;
    const lpass=req.body.password;
    // console.log(cemail,lpass);

    try {
        register.find().then((data) => {
            message=""
            data.forEach(e => {
    
                // console.log(e.email,e.password,cemail,lpass);
                if(e.email==cemail && e.password==lpass){
                    message="    Login successfull"
                     res.render("login",{success:message})
                   console.log("loginsuccess");
                   
                }else{

                }
                
    
                // console.log(e.email,e.password);
                
            });
    
            message="     Invalid incredentials";
            // res.send(message)
            res.render("login",{success:message})
    })
    

    } catch (error) {
        console.log(error);
    }

    
})

app.listen(port,()=>{
    console.log(`running on port ${port}`)
})
