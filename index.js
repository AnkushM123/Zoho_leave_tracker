require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const registerRoute = require('./routes/registerRoute')
const loginRoute = require('./routes/loginRoute');
const userRoute = require('./routes/userRoute');
const roleRoute = require('./routes/roleRoute');

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/user", userRoute);
app.use("/role", roleRoute);

mongoose.connect(process.env.MONGODB_URI)
  .then(async function () {
    app.listen(3000, () => console.log("server is running on 3000"));
    console.log("connect to db");
  })
  .catch((err) => console.log(err))