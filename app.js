const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing= require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const cors = require('cors');
const wrapAsync=require("./utils/wrapAsync.js")
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema}=require("./schema.js");

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust')
}

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.use(cors());

app.get("/",(req ,res)=>{
    res.send("hi i am root");
});

const validateListing= (req, res, next)=>{
   let {error}=listingSchema.validate(req.body);
    
    if (error) {
        throw new ExpressError(400,error);
    } else{
        next();
    }
};

//index route

app.get("/listings", wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({})
    res.render("listings/index.ejs", {allListings});
}));


//new route

app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs")
})
// show route

app.get("/listings/:id", wrapAsync(async(req, res)=>{
    let {id }= req.params;
    const listing=await Listing.findById(id);
     if (!listing) {
      return next(new ExpressError(404, "Listing not found!"));
    }

    res.render("listings/show.ejs", {listing});
}));

//create route

app.post("/listings",validateListing,
    wrapAsync( async(req,res,next)=>{
    
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    
    })
);

//edit route

app.get("/listings/:id/edit",wrapAsync( async(req, res)=>{
    let {id }= req.params;
    id=id.trim();
   const listing=await Listing.findById(id);
   res.render("listings/edit.ejs", {listing});
}))

//update route

app.put("/listings/:id" , 
    validateListing,
    wrapAsync(async(req,res)=>{  
    let{id}=req.params;
    id=id.trim();
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listings/${id}`);
})
);

//delete route
app.delete("/listings/:id", wrapAsync(async(req, res)=>{
    let{id}=req.params;
    id=id.trim();
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}))


/*app.get("/testListing",async(req, res)=>{
    let sampleListing= new Listing({
        title: "my new villa",
        description:"by the beach",
        price: 1200,
        location:"calangute, Goa",
        country:"India"
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing ")
});*/

// 404 handler (catch-all)
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

// Generic error handler
app.use((err, req, res, next) => {
  let { statuscode = 500, message = "Something went wrong" } = err;
  res.status(statuscode).render("error.ejs", {message});
  //res.status(statuscode).send(message);
});






app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
});