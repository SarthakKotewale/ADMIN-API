const express = require("express");
const app = express();

const connectDB = require('./connect')
//connected to mongo
connectDB();

//Routers
const adminRouter = require('./routes/admin')
const productRouter = require('./routes/product') 
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')

const PORT = process.env.PORT;

require("./models/userDetail");

//middleware
app.use(express.json());

// static files from uploads
app.use('/uploads', express.static('uploads'));

app.use('/user', userRouter.router)
app.use('/admin', adminRouter.router)
app.use('/', productRouter.router)
app.use('/categories', categoryRouter.router)


app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
