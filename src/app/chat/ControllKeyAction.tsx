import { FC, KeyboardEvent, useState } from "react";

type keyState = "waiting" | "listening" | "chating";

type Props = {
	firstAction: Function;
	secondAction: Function;
	thirdAction: Function;
};

const ControllKeyAction: FC<Props> = ({
	firstAction,
	secondAction,
	thirdAction,
}) => {
	const [keyState, setKeyState] = useState<keyState>("waiting");

	const handler = (e: KeyboardEvent<HTMLDivElement>) => {
		const key = e.key;
		console.log("⌨⌨⌨", key);

		if (key === "Enter") {
			if (keyState == "waiting") {
				firstAction();
				setKeyState("listening");
			}

			if (keyState === "listening") {
				secondAction();
				setKeyState("chating");
			}

			if (keyState === "chating") {
				thirdAction();
				setKeyState("waiting");
			}
		}
	};

	return (
		<div
			tabIndex={0} // `div`要素がフォーカスを受けられるようにする
			onKeyDown={(e) => handler(e)}
		></div>
	);
};

export default ControllKeyAction;
