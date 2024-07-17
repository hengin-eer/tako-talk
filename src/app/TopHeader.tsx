import Image from "next/image";
import { FC } from "react";

export const TopHeader: FC = () => {
    return (
        <header className="pt-10 flex flex-col items-center">
            <Image
                className="lg:w-[400px] sm:w-[300px] drop-shadow-lg"
                width={1000}
                height={750}
                src="/logo.png"
                alt="Tako Talk Hero Image"
            />
            <h1 className="pt-8 text-white text-4xl font-bold">Tako Talk | タコさんとフリー雑談</h1>
        </header>
    )
}