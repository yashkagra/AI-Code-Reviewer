const aiService = require("../Services/ai.service.js")

module.exports.getReview  =async ( req , res) => {
    const code = req.body.code; 

    if(!code) {
        return res.status(400).send("Give Prompt ")
    }

    const repsone = await aiService(code);

    res.send(repsone)
}
