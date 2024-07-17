import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Image from "next/image";

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
      <body className={`${inter.className} relative px-10`}>
        {/* Background Image / Video */}
        <Image
          className="absolute top-0 left-0 w-full h-screen -z-50 brightness-75"
          width={1000}
          height={1000}
          src="/ocean-background.jpg"
          alt="background ocean image"
        />
        {children}
      </body>
    </html>
  );
}
