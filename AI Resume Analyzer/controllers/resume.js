const parsePDF = require("../services/parse");
const analyzeResume = require("../services/gemini");

module.exports.uploadResume = async (req, res) => {
    try {
        const text = await parsePDF(req.file.path);

        const analysis = await analyzeResume(text);

        const analysisData = JSON.parse(analysis);

        res.render("analysis", {
            analysis: analysisData
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error reading PDF");
    }
};

