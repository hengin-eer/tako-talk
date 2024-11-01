"use client";

import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type Props = {};

const Speech: FC<Props> = () => {
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [text, setText] = useState<string>("Hello, world");
	const [transcript, setTranscript] = useState<string>("");

	let recognition: SpeechRecognition | null;
	if (typeof window !== "undefined") {
		recognition = new webkitSpeechRecognition();
		recognition.lang = "ja-JP";
		recognition.continuous = true;
		recognition.interimResults = true;
	}

	const handleListen = () => {
		if (!recognition) return;

		if (isRecording) {
			recognition.start();
		} else {
			recognition.stop();
			setText("");
		}

		setIsRecording((prev) => !prev);

		if (recognition) {
			recognition.onresult = (event) => {
				const results = event.results;
				for (let i = event.resultIndex; i < results.length; i++) {
					if (results[i].isFinal) {
						setText((prevText) => prevText + results[i][0].transcript);
						setTranscript("");
					} else {
						setTranscript(results[i][0].transcript);
					}
				}
			};
		}
	};

	return (
		<div className="flex flex-col gap-5 text-white">
			<Label>isRecording: {String(isRecording)}</Label>
			<Label>途中経過： {transcript}</Label>
			<Label>全文： {text}</Label>
			<Button onClick={() => handleListen()}>
				{isRecording ? "停止" : "録音開始"}
			</Button>
		</div>
	);
};

export default Speech;
