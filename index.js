const express = require("express");
const app = express();
const connectDB = require('./connect')

// const swaggerUi = require('swagger-ui-express')
// const swaggerSpec = require('./swaggerOptions')


//Routers
const adminRouter = require('./routes/admin')
const productRouter = require('./routes/product') 
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')

const PORT = process.env.PORT;

require("./models/userDetail");

//middleware
app.use(express.json());

// Swagger API documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// static files from uploads
app.use('/uploads', express.static('uploads'));

app.use('/user', userRouter.router)
app.use('/admin', adminRouter.router)
app.use('/', productRouter.router)
app.use('/categories', categoryRouter.router)

//connected to mongo
connectDB();


app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
