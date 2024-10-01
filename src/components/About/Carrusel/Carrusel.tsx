import { useEffect, useState, useCallback } from "react";

interface ICardInfo {
    name: string;
    img: string;
    position: string;
    linkGit: string;
    linkLin: string;
}

interface props {
    data: ICardInfo[];
    autoplay: boolean;
    autoplayTime: number;
}

const Carousel: React.FC<props> = ({ data, autoplay, autoplayTime }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [stopAutoPlay, setStopAutoPlay] = useState(false);

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(() => {
                selectNewImage(selectedIndex, data);
            }, autoplayTime);
            return () => {
                clearInterval(interval);
            };
        }
    });

    const selectNewImage = (index: number, images: ICardInfo[], next = true) => {
        const condition = next ? selectedIndex >= images.length - 1 : selectedIndex <= 0;
        const nextIndex = next
            ? condition
                ? 0
                : selectedIndex + 1
            : condition
            ? images.length - 1
            : selectedIndex - 1;

        setSelectedIndex(nextIndex);
    };

    const selectImageFromIndex = (index: number) => {
        setStopAutoPlay(true);
        setSelectedIndex(index);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center mb-3 w-screen">
                <div className=" flex justify-center overflow-hidden relative mask-image-custom w-full h-[450px] md:h-[350px]">
                    {data.map((data, index) => (
                        <div key={index}>
                            <div
                                key={index}
                                className={`w-[300px] h-[400px] md:w-[600px] md:h-[300px] bg-black-0 rounded-[32px] shadow-xl font-gabarito text-white-0 flex flex-col md:flex-row items-center transition-opacity duration-1000 ease-in-out ${
                                    selectedIndex === index ? "animate-slide-card" : "hidden"
                                }`}
                            >
                                <div className="md:w-[50%] flex justify-center items-center pt-7 md:pt-0">
                                    <img
                                        src={data.img}
                                        alt={`Foto de ${data.name}`}
                                        className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2 md:w-[50%] pt-5 md:pt-0 items-center md:items-start">
                                    <p className="font-semibold text-[25px] md:text-[30px]">{data.name}</p>
                                    <p className="font-semibold text-[20px] text-blue-0">{data.position}</p>
                                    <div className="flex space-x-4 pt-2 md:pt-8">
                                        <a target="_blank" href={data.linkGit}>
                                            <img src="github logo.svg" className="w-10" />
                                        </a>
                                        <a target="_blank" href={data.linkLin}>
                                            <img src="logo linkedin.svg" className="w-10" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex w-16 justify-around">
                {data.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => selectImageFromIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                            selectedIndex === index ? "bg-green" : "bg-white"
                        } cursor-pointer`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
