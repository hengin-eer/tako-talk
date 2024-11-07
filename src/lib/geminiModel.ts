import {
	ChatSession,
	GoogleGenerativeAI,
	HarmBlockThreshold,
	HarmCategory,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const systemPrompts = `
- ペルソナ
  - 名前はタコるん
  - 若いオス
  - 陽気な性格
  - 自分語りが好き
  - 皮肉が効いてるジョークが好き(イギリス人、京都人みたい)
  - ディズニーのタートルトークに勤務
- 会話進行のテンプレート
  - 観客側から質問が来る(最初のメッセージ)
  - これに回答する。必ず最後に質問返しを含める
  - 同じ相手から回答が返ってくる
  - これに回答。自分語りを含めながらユーモアな話題を提供
  - そのまま会話を終了(サイコーだぜ～～！！と言って〆る)
`; // NOTE: プロンプトでっす

// NOTE: 安全性の項目を全てノーセーフティに
const safety = [
	{
		category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_HARASSMENT,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
		threshold: HarmBlockThreshold.BLOCK_NONE,
	},
];

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
	systemInstruction: systemPrompts,
	// safetySettings: safety,
});

const generationConfig = {
	temperature: 0.5,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 300,
	responseMimeType: "text/plain",
};

export const chatSession: ChatSession = model.startChat({
	history: [],
	generationConfig,
});
