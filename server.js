const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://harshavardhinimp_db_user:5fUhQAGjCcPoCfZ8@cluster0.lq8mwh4.mongodb.net/?appName=Cluster0")
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.error("Error connecting to MongoDB", err);
});
const userSchema = new mongoose.Schema({
   name:String,
   price:Number,
   description:String,
   image:String
});
const User = mongoose.model("User",userSchema);
const OrderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});
const Order = mongoose.model("Order", OrderSchema);
app.post("/orders", async (req, res) => {
    const { productId } = req.body;
    if (!productId) {
        return res.status(400).send("Please provide productId");
    }
    const newOrder = new Order({ productId });
    await newOrder.save();
    res.send(newOrder);
});

app.get("/orders", async (req, res) => {
    const orders = await Order.find().populate('productId');
    res.send(orders);
});

app.get("/getproducts", async (req,res)=>{
    const users = await User.find();
    res.send(users);
});
app.get("/getproducts/:id", async (req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    if(!user){
        return res.status(404).send("User not found");
    }
    res.send(user);
});
app.delete("/delete/:id", async (req,res)=>{
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if(!user){
        return res.status(404).send("User not found");
    }
    res.send(user);
});

app.post("/products", async (req,res)=>{
    const {name,price,description,image} = req.body;
    if(!name || !price || !description || !image){
        return res.status(400).send("Please provide all fields");
    }
    const newUser = new User({name, price, description, image});
    await newUser.save();
    res.send(newUser);
});
app.post("/manyproducts", async (req,res)=>{

    const products = req.body;

    const result = await User.insertMany(products);

    res.send(result);
});

app.listen(8000 ,()=>{
    console.log("Server listening on port 8000");
});














































// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// app.use(express.json());
// const result =[ {
//     id:1,
//     name:"John",
//     age:30
// }
// ]
// mongoose.connect("mongodb+srv://harshavardhinimp_db_user:5fUhQAGjCcPoCfZ8@cluster0.lq8mwh4.mongodb.net/?appName=Cluster0").then(()=>{
//     console.log("Connected to MongoDB");
// }).catch((err)=>{
//     console.error("Error connecting to MongoDB", err);
// });

// const userSchma = new mongoose.Schema({
//    name:{
//     type: String,
//     required: true,
//     minlength: 3,
//     maxlength: 30,
//     trim: true,

//    },
//    price:Number,
//    description:String,
//    image:String
// });

// const User = mongoose.model("User",userSchma);

// // app.post("/user",(req,res)=>{
// //     const newuser ={
// //         id:2,
// //         name:"Jane",
// //         age:25
// //     }
    
// //     result.push(newuser);

// //     res.send(result);
// // });

// // app.post("/user",(req,res)=>{
// //     result.push(req.body);
// //     res.send(result);
// // });

// app.post("/user", async (req,res)=>{
//     const {name,price,description,image} = req.body;
//     if(!name || !price || !description || !image){
//         return res.status(400).send("Please provide all fields");
//     }
//     const newUser = new User({name, price, description, image});
//     await newUser.save();
//     res.send(newUser);
// });

// app.get("/getproducts", async (req,res)=>{
//     const users = await User.find();
//     res.send(users);
// });

// app.delete("/delete/:id", async (req,res)=>{
//     const {id} = req.params;
//     const user = await User.findByIdAndDelete(id);
//     if(!user){
//         return res.status(404).send("User not found");
//     }
//     res.send(user);
// });

// app.get("/",(req,res)=>{
//     res.send("Hello");
// });
// app.get("/about",(req,res)=>{   
//     res.send("This is the about page");
// });

// app.listen(3000 ,()=>{
//     console.log("Server is listening");
// });
