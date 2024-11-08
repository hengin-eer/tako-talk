"use client";

import { FC, KeyboardEvent, useMemo, useState } from "react";
import { useKeyPress } from "react-use";

type keyState = "waiting" | "listening";

type Props = {
	firstAction: Function;
	secondAction: Function;
};

const ControllKeyAction: FC<Props> = ({
	firstAction,
	secondAction,
}) => {
	const [keyState, setKeyState] = useState<keyState>("waiting");
	const [pressed, keyEvent] = useKeyPress("Enter");

	const keyStateToJP = {
		waiting: "ボタンを押してからお話してくれ！",
		listening: "聞いているぜ！終わったらボタンを押してくれ",
	};

	console.log(keyEvent);

	useMemo(() => {
		if (pressed) {
			if (keyState == "waiting") {
				firstAction();
				setKeyState("listening");
			}

			if (keyState === "listening") {
				secondAction();
				setKeyState("waiting");
			}
		}
	}, [pressed, keyEvent]);

	return (
		<div className="flex items-center gap-1 px-4 py-2 rounded-full bg-white">
			<div className="text-lg iconify svg-spinners--gooey-balls-2" />
			<div>{keyStateToJP[keyState]}</div>
		</div>
	);
};

export default ControllKeyAction;
