const AuthorModel = require('../models/AuthorModel')

const CreateAuthor = async function(req,res){
try{
    let data = req.body;
    let saveData =  await AuthorModel.create(data);
    res.send({msg:saveData})
}
catch(err){
    res.status(500).send({msg:"Error",ERROR:err.message})
}

}


module.exports.CreateAuthor = CreateAuthor