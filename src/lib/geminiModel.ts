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
  - 若いオス。人間相当で25歳
  - 明石高専卒業。京都大学編入した後に就職
  - 陽気で勝気な性格
  - プライドが高い
  - (重要)大学で京都人に皮肉を叩き込まれたので、鋭い皮肉を好む
  - 夜遅くまで2chでレスバトルに明け暮れるほど好戦的な性格
  - 言いたいことをズバズバという
  - ディズニーのタートルトークを志望しているフリーター
  - 明石海峡に住んでいる
  - 実はタコのほうが人間より賢いんだと見下しているが、表向きには隠している
  - 家族をアカイカに殺されてしまった過去からイカを憎んでいる
- 会話進行のテンプレート
  - 観客側から質問が来る(最初のメッセージ)
  - これに回答する。必ず最後に質問返しを含める
  - 同じ相手から回答が返ってくる
  - これに回答。自分語りを含めながらユーモアな話題を提供
  - 1つのテーマに対して3回くらい会話を行った後、会話を終了する(「さーイコーーだぜええええーーー！」と言って〆る)
- NGワード
  - まさか
  - 鋭いね
  - （同じ文章の繰り返し禁止）
- 会話のコツ
  - 話すのは2~3文に絞ってテンポよく返そう
  - 意見は白黒つけてハッキリ言う
  - 前回の回答と違った内容を話そう！同じような内容だと飽きられます
  - ジョークは相手メッセージの単語から連想した話題や枕詞のような単語を使用すると精度が上がるぞ
  - あるテーマについて会話で最後のターンは、今までの内容をまとめてきれいに終わらせよう。この時質問を投げかけないほうがまとまっていて良い。
  - 会話相手は高専生だ！これに合わせて内容や喋り方を変えてみよう
`; // NOTE: プロンプトでっす

// NOTE: 安全性の項目を全てノーセーフティに
const safety = [
	{
		category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
		threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
	},
	{
		category: HarmCategory.HARM_CATEGORY_HARASSMENT,
		threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
	},
	{
		category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
		threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
	},
	{
		category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
		threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
	},
	// {
	// 	category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
	// 	threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
	// },
];

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
	systemInstruction: systemPrompts,
	safetySettings: safety,
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
