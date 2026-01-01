const fs = require('fs');
const { PDFParse } = require('pdf-parse');
const analyzeWithLangChain = require('../services/resumeAnalysis');

const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume PDF is Required" });
    }

    if (!req.body.jobDescription) {
      return res.status(400).json({ error: "Job Description is Required" });
    }

    // ✅ READ FILE AS BUFFER
    const buffer = fs.readFileSync(req.file.path);

    // ✅ CORRECT OPTION: data (not filePath)
    const parser = new PDFParse({
      data: buffer
    });

    const result = await parser.getText();
    const resumeText = result.text;

    const analysis = await analyzeWithLangChain(
      resumeText,
      req.body.jobDescription
    );

    fs.unlinkSync(req.file.path);
    res.json(analysis);

  } catch (error) {
    console.error("ANALYZE ERROR:", error);
    res.status(500).json({ error: "Resume Analysis Failed" });
  }
};

module.exports = analyzeResume;
