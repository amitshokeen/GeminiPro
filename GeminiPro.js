const fs = require('fs');
const filePath = './0617.json';
let tweets;
const args = process.argv;
let index = args[2];
// const prompt_1 = "Here is some information:"
// const prompt_2 = "Create a title and summary that includes specific facts: who, what, when, where, why and how.\nSummary length: 2 sentences in 1 paragraph\nStyle: News reporter"
const prompt_3 = "Imagine you're a reporter, then summarize into two sentences, considering content specifics and include a short title to your summary:"
const outputFile = 'output_new_prompt.txt';
const originalConsoleLog = console.log;
console.log = function (message) {
  originalConsoleLog.apply(console, arguments);
  fs.appendFileSync(outputFile, `${message}\n`);
};    
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
const MODEL_NAME = "gemini-pro";
const API_KEY = "";

function tweetExtract(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(`Error reading the file: ${err}`, null);
      return;
    }

    try {
      const jsonArray = JSON.parse(data);

      // Extract the second element from each sub-array
      const valuesArray = jsonArray.map((subArray) => subArray[1]);

      callback(null, valuesArray);
    } catch (parseError) {
      callback(`Error parsing JSON: ${parseError}`, null);
    }
  });
}

tweetExtract(filePath, (error, valuesArray) => {
  if (error) {
    console.error(error);
    return;
  }
  //console.log(valuesArray[0]);
  tweets = valuesArray[index];
  async function run() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        //threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        //threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
        //threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_UNSPECIFIED
        threshold: HarmBlockThreshold.BLOCK_NONE
  
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        //threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        //threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
        //threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_UNSPECIFIED
        threshold: HarmBlockThreshold.BLOCK_NONE
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        //threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        //threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
        //threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_UNSPECIFIED
        threshold: HarmBlockThreshold.BLOCK_NONE
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        //threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        //threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH
        //threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_UNSPECIFIED
        threshold: HarmBlockThreshold.BLOCK_NONE
      },
    ];
    
    const parts = [
      //{text: prompt_1 + "\n" + tweets + "\n" + prompt_2},
      {text: prompt_3 + "\n" + tweets},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
  
    const response = result.response;
    console.log("\n" + "|" + index + "|")
    console.log(response.text());
    console.log("______________________________________________________________________________________");


  }
  run();
});
