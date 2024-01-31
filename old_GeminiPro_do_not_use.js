// node --version # Should be >= 18
// npm install @google/generative-ai
const { tweetExtract } = require("./GeminiPro");
const filePath = './0617.json';

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyBBlyTq4QKtmSJTMT51X3A2hFvc7vr4DUw";

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

  const prompt_1 = "Here is some information:"
  const prompt_2 = "Create a title and summary that includes specific facts: who, what, when, where, why and how.\nSummary length: 2 sentences in 1 paragraph\nStyle: News reporter"
  
  
  
  //let tweets = 



  const parts = [
    //{text: "Here is some information:\n1. The US is starting to behave like a psychotic, obsessed ex-girlfriend:\n\nWest pressured many countries against attending 2023-SPIEF — Russian Foreign Ministry\n\nST. PETERSBURG, June 17. /TASS/. Moscow has information about how the West actually exerted pressure on every country,… https://t.co/5hMVtZc48N\n\n2. Spy plane to patrol English Channel 24/7 to  catch migrant smugglersSpy plane to\nAND WHAT WILL THIS ACHIEVE?\n https://t.co/1LvxeFSj8J\n\n3. 🍻 Drunk Russian soldiers in Melitopol shoot at FSB officers\n\nhttps://t.co/4vYopngmUR\n\n4. News from Mordor. This is rather hilarious! \n\n“Peskov said that the task of demilitarization of Ukraine has factually been fulfilled\n\nAccording to the press secretary of the President of the Russian Federation, Kiev is using fewer and fewer of its own weapons.”\n\nI guess all… https://t.co/zAJyBSfauA\n\n5. The tactics deployed, thus far, by Ukraine in this counter offensive are outrageous and a total dereliction of duty. They are suffering enormous totally unnecessary losses. Ukraine has zero air support. They stand no chance. Someone needs to be held accountable for this outrage.\n\n6. He’s more of a patriot leader than anyone we have here.\n\n7. @PearceAlan1962 Its fascinating how the tables are turning.  It is Russia that speaks for families, children, religious faith,  decency etc. Russia bans Genetically modified foods,  gender mutilation and woke lunacy.   \nI read more about the war in Ukraine, which was started by Western allies…\n\n8. I don’t care what the New York Times or any other official in Biden’s intelligence team says:\n\nThe US blew up the Nordstrom’s pipelines. Ukraine does NOTHING without US approval.\n\n9. French media visited Russian positions. This made Ukraine very angry for some reason.\n\nIt contains some interesting images.\n\n(the auto-translated subtitles are imperfect) https://t.co/7mHbZKYivy\n\n10. #Putin showed a draft peace treaty with #Ukraine, approved by representatives of #Kyiv: #Russia has never refused to negotiate. A whole series of talks between Russia and Ukraine took place in #Turkey to develop confidence-building measures and prepare the text of the treaty 🔽 https://t.co/vhNjhB9YK4\n\n11. South Africa's \"peace mission\" in just 12 hours in Kyiv: 1) denied the reality of a Russian missile attack; 2) told Zelensky to \"de-escalate\" his counter-offensive; 3) alienated most Ukrainians, including those who witnessed the missile attack, as this headline shows:\n\n12. An anti War speech from over 100 years ago highlighting how Capitalism and Corporate Media have always supported War - There's money to be made from it.-\"War comes inspite of the people. When Wall Street says War the Press says War and the pulpit promptly follows with its Amen\"..\n\n13. Oopsy\n\n14. ⚡️ Russian governor claims drone attack on oil refinery in Bryansk Oblast. \n\nBryansk Oblast Governor Alexander Bogomaz claimed drones attacked the Druzhba oil refinery overnight. He alleged three drones were shot down by the Russian air defense, accusing Ukraine of the attack.\n\n15. ⚡️Russia has never abandoned talks on Ukraine — Putin https://t.co/tmWAf9K6uX\n\n16. The M202, Fliegerfaust, and FrankenFaust are now on the peculiar body of water 😊 https://t.co/YFfQx1OfXW\n\n17. Pro-Kiev Trolls: \"Bandera's followers didn't collude with the Nazis in the Holocaust! That's Soviet propaganda!\"\n\nPoland's Institute of National Remembrance (hardly a \"pro-Russian\" source, especially considering the new \"Russian influence commission\"):\n\nhttps://t.co/bVKwd0cPR0 https://t.co/PCGBNVITkJ\n\n18. American armored personnel carrier M113 is done fighting in Ukraine\n\n@ukr_leaks_eng https://t.co/BEVkqX1XOA\n\n19. Ramaphosa: We heard rocket attacks\nPress: The African delegation sheltered during a rocket attack\nRamaphosa’s spokesperson: Rockets what rockets?\nThe 🇿🇦gov is so used to downplaying Russia’s war crimes, @SpokespersonRSA forgot he’s supposed to act impartial on the ‘peace mission’\n\n20. 🇷🇺🇦🇺 Russia continues to burn NATO equipment: Australian MRAP Bushmaster, after the battle with Russian fighters\nWell done Albo. Sending taxpayer funded military aid to Nazis in Ukraine to attack innocent Ukrainians and Russians. \nDid we vote for that ?\n\nThe majority of the world… https://t.co/KomwiaBXtw\n\n21. Ukrainian stumbles upon a grisly discovery: a Russian that was beaten to death with a large hammer. Either the Wagnerites did it or the Russian regulars got “inspired”.\n\nTranslation: “ We took many enemy positions but we haven't yet seen such fuckery, it's insane. Looks like they… https://t.co/k38h6hGQbI\n\n22. There are claims, which we can't verify and would question, that Ukraine is down to its last 50k to 70k forces.\n\nIf and we stress if that is true, the war will be over in 2 months.\n\nWe shall see soon enough if that is the case.\n\n23. Interesting people live in Irkutsk, Russia.\n#Russians https://t.co/bAOox9bUE4\n\n24. Russians presented cherries from the occupied Ukrainian city of Melitopol at the International Economic Forum in St. Petersburg yesterday, the cups clearly saying “Zaporizhzhia Region”. \n\nStealing pretty well represents Russian economic strategy 🙄 https://t.co/biJYJQJbKQ\nCreate a title and summary that includes specific facts: who, what, when, where, why and how.\nSummary length: 2 sentences in 1 paragraph\nStyle: News reporter\n"},
    {text: prompt_1 + "\n" + tweets + "\n" + prompt_2},
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  console.log(response.text());
}

run();