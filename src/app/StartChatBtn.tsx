import Link from "next/link";
import { FC } from "react"

export const StartChatBtn: FC = () => {
	return (
		<button
			className="px-5 py-3 rounded-md bg-teal-500 hover:bg-teal-400 text-black shadow-md"
		>
			<Link href="/chat">
				チャットを始める
			</Link>
		</button>
	)
}
