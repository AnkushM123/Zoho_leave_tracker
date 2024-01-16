require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const userRoute = require('./routes/userRoute');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/user", userRoute);

mongoose.connect(process.env.MONGODB_URI)
  .then(async function () {
    app.listen(3000, () => console.log("server is running on 3000"));
    console.log("connect to db");
  })
  .catch((err) => console.log(err))