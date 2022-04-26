const authorModel= require("../Controller/")



const createauthor = async function(req,res){

let data = req.data;
let authorData = await authorModel.create(data);
console.log(author.newAtribute);
res.send({msg:authorData})

}