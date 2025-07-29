const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const listingSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    
    image: {
  url: {
    type: String,
    default: "https://images.unsplash.com/photo-1720884413532-59289875c3e1?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1720884413532-59289875c3e1?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v,
  },
  filename: String, // optional
},

    description:String,
    price: Number,
    location: String,
    country:String,

});

const Listing=mongoose.model("Listing", listingSchema);
module.exports=Listing;
