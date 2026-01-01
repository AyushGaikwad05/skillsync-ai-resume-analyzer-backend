const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { PromptTemplate } = require('@langchain/core/prompts');
const { LLMChain } = require('langchain/chains');

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: 'gemini-2.5-flash',
  temperature: 0.2
});

const prompt = new PromptTemplate({
  inputVariables: ['resume', 'job'],
  template: `
You are an ATS resume analyzer.

Analyze the resume against the job description and return ONLY valid JSON.

Resume:
{resume}

Job Description:
{job}

Return JSON in this exact format:
{{
  "atsScore": 0,
  "matchingSkills": [],
  "missingSkills": [],
  "suggestions": []
}}
`
});

const chain = new LLMChain({
  llm: model,
  prompt
});

async function analyze(resumeText, jobText) {
  const result = await chain.call({
    resume: resumeText,
    job: jobText
  });

  const jsonMatch = result.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Invalid JSON response from Gemini');
  }

  return JSON.parse(jsonMatch[0]);
}

module.exports = analyze;
