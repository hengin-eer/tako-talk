import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Top | Tako Talk",
	description: "ター●ルトークのような様々な雑談を楽しもう!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body
				className={`${inter.className} relative w-full min-h-screen h-full px-10 bg-black`}
			>
				<video
					className="absolute top-0 left-0 w-full h-full object-cover -z-50"
					src="/ocean-background.mp4"
					autoPlay
					loop
					muted
					playsInline
				/>
				{children}
			</body>
		</html>
	);
}
