const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const userRoute = require('./routes/userRoute');
const loginRout=require('./routes/loginRoute');
const roleRoute=require('./routes/roleRoute');
const leaveTypeRoute=require('./routes/leaveTypeRoute');
const requestRoute=require('./routes/requestRoute');
const registerRoute=require('./routes/registerRoute')
const leave=require('./routes/leaveRoute')

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/user", userRoute);
app.use("/login", loginRout);
app.use("/role", roleRoute);
app.use("/leaveType",leaveTypeRoute);
app.use("/request",requestRoute);
app.use("/register", registerRoute);
app.use('/leave',leave);

mongoose.connect('mongodb://127.0.0.1:27017/Zoho')
  .then(async function () {
    app.listen(3000, () => console.log("server is running"));
    console.log("connect to db");
  })
  .catch((err) => console.log(err))   
    