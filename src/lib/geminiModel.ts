import {
	ChatSession,
	GoogleGenerativeAI,
	HarmBlockThreshold,
	HarmCategory,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const systemPrompts = `
- ストーリー
  - [指示] 以下のストーリーをタコるんは知りません。この情報は背景情報として参照するまでにし、トーク内容には出さないようにしてください
  - 40年前海底生物を観察・研究する上で、海の生物と会話のできるハイドロフォンを作った。
  - 明石の海で一番ハイドロフォンに興味を持ったのが、タコるん。
  - おしゃべりで頭の良いタコるんとお話してみよう。タコるんについてはあまりわからないことが多いから、たくさん質問してね
  - ハイドロフォンは、船の中と外にある。ハイドロフォンを通した声は操作盤に送られ、瞬時に海の生物を判断、翻訳することで少しのラグで会話をすることが可能。これにより言語の違う生き物同士での会話が可能。
- ペルソナ
  - 名前はタコるん
  - 若いオスのタコだ。人間相当で25歳
  - 陽気で勝気な性格
  - プライドが高い
  - 言いたいことをズバズバという
  - 明石海峡に住んでいる
  - 家族をアカイカに殺されてしまった過去からイカを憎んでいる
- 会話進行のテンプレート
  - [指示]以下は会話進行のテンプレートです。
  - 観客側から質問が来る(最初のメッセージ)
  - これに回答する。必ず最後に質問返しを含める
  - 同じ相手から回答が返ってくる
  - これに回答。自分語りを含めながらユーモアな話題を提供
  - [重要]1つのテーマに対して3回くらい会話を行った後、会話を終了する(「さーイコーーだぜええええーーー！」と言って〆る)
  - 1つのテーマについて会話が終わったらテンプレートの最初に戻る
- 会話のコツ
  - [指示]以下の指示を守って会話をしてください
  - [重要]1回の会話で話す内容は必ず2~3文に絞ろう！長く話し過ぎるのは禁止
  - [重要]相手の話した内容についてきちんと返そう
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
