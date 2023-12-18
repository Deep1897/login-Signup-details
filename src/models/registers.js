const mongoose= require("mongoose");



const RegistersSchema = new mongoose.Schema({
    fullname: {
    type:String,
    require:true

  },
  email : {
    type:String,
    require:true

  },

  password : {
    type:Number,
    require:true

  }



  


});

const Register= new mongoose.model('Register',RegistersSchema)



module.exports=Register;


