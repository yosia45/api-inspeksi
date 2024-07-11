// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
//   }
  
  const express = require("express");
  const cors = require("cors");
  const app = express();
  const routes = require("./routes/index");
  const port = process.env.PORT || 3000;
  
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(routes);
  
  console.log(process.env.NODE_ENV)
  console.log(port)
  console.log(process.env.DATABASE_DEVELOPMENT_USERNAME)

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });