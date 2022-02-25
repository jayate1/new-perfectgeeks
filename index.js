// national holidays not works properly.
var express = require("express");
const db = require("../databases");
var randomstring = require("randomstring");
var router = express.Router();
// var Holidays = require('date-holidays')
// var hd = new Holidays()
// console.log(hd.getCountries());        //not works properly this library 
router.post("/inserts",async function (req, res) {
  var referral_bonus=0;
  var referral_bonus2=0;
  var data;
  var data2;
  var update;
  var update2;
  if(req.body.referral_code)
  {
    var dateObj = new Date();
var weekday = dateObj.toLocaleString("default", { weekday: "short" })
if(weekday==='sat'||weekday==='sun')
{
  referral_bonus=100;
  referral_bonus2=80;
}
else{
  referral_bonus=50;
  referral_bonus2=40
}
    data=await db.playlist.find({referral_generated:req.body.referral_code})
   if(data[0].parent_user!=='')
   {
     data2=await db.playlist.find({_id:data.parent_user})
     console.log(data2,"data2")
    update2=await db.playlist.updateOne({_id:data2[0]._id},{$set:{referral_bonus:data2[0].referral_bonus+referral_bonus2}})
     console.log(data2)
   }
   update=await db.playlist.updateOne({_id:data2[0]._id},{$set:{referral_bonus:data[0].referral_bonus+referral_bonus}})
  console.log("dta",data)
  const realist = await new db.playlist({username:req.body.username,
  email:req.body.email,
  address:req.body.address,
  referral_bonus:0,
  referral_generated:randomstring.generate(),
  referral_code:data!==undefined?data[0]?.referral_generated:'',
  parent_user:data!==undefined?data[0]?._id?data[0]?._id:'':'',
 children_user:data2!==undefined?data[0].parent_user:''});
 realist.save()
 console.log(realist,"realist")
if(data[0].parent_user!=='')
 update=await db.playlist.updateOne({_id:data2[0]._id},{$set:{children_user:realist._id}})}
});
module.exports = router;