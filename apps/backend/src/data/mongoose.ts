import {connect, Schema, model} from "mongoose";

async function main() {
   // connect to mongodb
   const dbURI = "mongodb://localhost:27017/SIS_DB";
   connect(dbURI)
     .then(() => console.log('connected to db'));
};

const userSchema = new Schema({
  fullName: String,
  password: String,
  email: String,
  created: {type: Date, default: Date.now}
})


const courseSchema = new Schema({
  name: String,
  totalUnits: Number,
  description: String,
  created: { type: Date, default: Date.now },
});

const UserDB = model('User' , userSchema);
const CourseDB = model('Course', courseSchema);


export { main, CourseDB, UserDB };