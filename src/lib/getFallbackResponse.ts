type ResponseMapping = {
	[key: string]: string[];
};

export const getFallbackResponse = (question: string): string => {
	console.log("question::: ", question);

	const responseMap: ResponseMapping = {
		住所: [
			`住所？そんなもん教えねーよ！
			…って、冗談だよ！笑
			明石海峡ってとこに住んでるぜ！ 
			ところで、お前はどこの海に住んでるんだ？ `,
		],
		名前: [
			`
				名前？
				タコるん！
				…って、当たり前だろ！
				まさか、俺のこと知らないのか？ 
				この海で一番頭の良いタコ、タコるんだぜ！ 
				お前は、俺のこと知ってたのか？
			`,
		],
		年齢: [
			`
				年齢？
				人間でいうと25歳くらいかな。
				…って、聞いてない？
				この海で一番イケてるタコは、俺様なんだぜ！
				お前は、何歳なんだ？ 
			`,
			`
				わしゃ、タコるん！25歳！若いってことはわかっとるやろ？
				ところで、お前は何歳なんや？聞いてもいいか？ 
			`,
		],
		足: [
			`
				足は8本あるぜ！タコは足が多いのが自慢なんだ！
				ところで、お前は足は何本だ？ 8本あるのか？ それとも… 2本？ 
			`,
		],
	};

	for (const key in responseMap) {
		if (question.includes(key)) {
			const possibleResponses = responseMap[key];
			return `
				うーん...ちょっと調子悪いなあー
				${possibleResponses[Math.floor(Math.random() * possibleResponses.length)]}`;
		}
	}

	// NOTE: 時間たったら期限直るかも？みたいに
	return `
		...ちょっとおいらは今機嫌が良くないんだ。
		気まぐれで悪いんだけど、機嫌を直すのに少し時間をくれ
		質問には答えてやるけどな
	`;
};
