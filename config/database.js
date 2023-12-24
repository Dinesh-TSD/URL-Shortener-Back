const mongoose =require("mongoose")

const connectDatabase=()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        
    }).then(con =>{
        console.log(`Mongodb connected to the host :${con.connection.host} `);
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports=connectDatabase; 