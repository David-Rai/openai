import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai'
import fetch from 'node-fetch'

dotenv.config()
const app=express()

//Middlewares for json and form parsing
app.use(cors())
app.use(express.json());

//Getting the chat reqponse from ai
app.get('/:name',async (req, res) => {
const content=req.params.name
  const client = new OpenAI({
    baseURL: "https://api.cerebras.ai/v1",
    apiKey:process.env.KEY,
  });
  
  const chatCompletion = await client.chat.completions.create({
    model: "qwen-3-32b",
      messages: [
          {
              role: "user",
              content
          },
      ],
  });
  const text=chatCompletion.choices[0].message.content
  const decodedText = text
  .replace(/\\u003C/g, '<')
  .replace(/\\u003E/g, '>')
  .replace(/\\n/g, '\n')
  .replace(/\\"/g, '"');

res.setHeader("Content-Type", "text/plain");
res.send(decodedText);

  // res.json(chatCompletion.choices[0].message.content);
});


const PORT=process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port PORT`);
});