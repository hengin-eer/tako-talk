// import TtsQuestV3Voicevox from '@/lib/TtsQuestV3Voicevox'

import Voicevox from "./Voicevox";

export default function getVoicevox(text: string) {
	const speakerId = 3; // VOICEVOX:ずんだもん（ノーマル）
	const ttsQuestApiKey = 'b94143J3m8u3735';

	const audio = new Voicevox(speakerId, text, ttsQuestApiKey);
	audio.play();
}
