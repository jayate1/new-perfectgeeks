const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/perfectgeeks',{
useNewUrlParser:true,
useUnifiedTopology:true}).then( ()=> console.log('connection successful')).catch((err)=>console.log("err"+err));

const playlistSchema=new mongoose.Schema({
 username:String,
 email:String,
 address:String,
 referral_bonus:Number,
 referral_generated:String,
 referral_code:String,
 parent_user:String,
children_user:String
})

const playlist=new mongoose.model("playlist",playlistSchema)


module.exports={playlist}

 
// router.post("/inserts", function (req, res) {
//   const realist = new playlist({username:'jayate1999',
//   email:'jayate1999jaiswal@gmail.com',
//   address:'gt road lai bazar gopiganj',
//   referral_bonus:0,
//   referral_generated:randomstring.generate(),
//   referral_code:'',
//   parent_user:'',
//  children_user:''});
//  realist.save()
// });