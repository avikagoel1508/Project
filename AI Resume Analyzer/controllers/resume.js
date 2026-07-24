const parsePDF = require("../services/parse");
const analyzeResume=require('../services/gemini')

module.exports.uploadResume = async(req,res)=>{
    try{
        const text = await parsePDF(req.file.path);
        const analysis = await analyzeResume(text);
        res.json(JSON.parse(analysis));
    }catch(err){
        console.log(err);
        res.status(500).send("Error reading PDF");
    }

}


