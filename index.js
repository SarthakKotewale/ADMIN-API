const express = require("express");
const app = express();
const PORT = process.env.PORT;

const connectDB = require('./connect')
//connected to mongo
connectDB();


require("./models/userDetail");

//middleware
app.use(express.json());

// static files from uploads
app.use('/uploads', express.static('uploads'));


//Admin routes
const adminRouter = require('./routes/admin')
app.use('/admin', adminRouter.router)

//Product routes
const productRouter = require('./routes/product')
app.use('/', productRouter.router)

//User routes
const userRouter = require('./routes/user')
app.use('/user', userRouter.router)

// Category routes
const categoryRouter = require('./routes/category')
app.use('/categories', categoryRouter.router)











app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
