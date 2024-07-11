import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";



//Connections and Listeneres
const PORT =process.env.PORT ||5000
connectToDatabase()
  .then(()=>{
    app.listen(PORT, () => console.log("Server Open and connected the Database"));
  })
  .catch((err)=> console.log(err));

