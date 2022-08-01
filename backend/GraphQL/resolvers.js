const db = require('./db')
const Query = {
  
   //resolver function for projects returns list
   projects:() => db.projects.list(),

   //resolver function for projectByCID
   projectByCID:(root,args,context,info) => {
      //args will contain parameter passed in query
      return db.projects.get(args.id);
   }
}
module.exports = {Query}
