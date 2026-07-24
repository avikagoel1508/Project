const pdfParse = require("pdf-parse");
const fs = require("fs/promises");
async function parsePDF(filePath){
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);
    console.log(data.numpages);
    return data.text;
}
module.exports = parsePDF;