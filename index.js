require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute')
const roleRoute = require('./routes/roleRoute');

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/role", roleRoute);

mongoose.connect(process.env.MONGODB_URI)
  .then(async function () {
    app.listen(3000);
  })
  .catch((err) => {
    throw Error(err);
  });