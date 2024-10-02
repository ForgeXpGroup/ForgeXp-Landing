import { useState } from "react";
import preguntas from "./preguntas.json"

interface FAQItem {
  id: number;
  question: string;
  response: string;
}

const FAQs: React.FC = () => {
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);

  const handleOnClick = (id: number) => {
    setActiveQuestionId((prevId) => (prevId === id ? null : id));
  };

  const questions: FAQItem[] = preguntas;

  return (
    <div
      id="preguntasFrecuentes"
      className="w-full flex flex-col py-20 items-center bg-blue-0 px-4 font-gabarito font-semibold"
    >
      <h2 className="mb-10 text-white-0 text-[30px]">Preguntas frecuentes</h2>

      {questions.map((item) => (
        <div key={item.id} className="w-full mb-4 max-w-6xl  overflow-hidden bg-black-0 rounded-[32px]">
          <div
            className="w-full flex justify-between items-center cursor-pointer  px-6 py-8 "
            onClick={() => handleOnClick(item.id)}
          >
            <p className={`text-lg lg:text-xl ${activeQuestionId === item.id ? "text-red-0" : "text-white-0"}`}>
              {item.question}
            </p>
            <span className={`transition-rotate duration-300 ${activeQuestionId === item.id ? "rotate-180" : ""}`}>
              <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 10.675L7.625 8.3C7.44167 8.11667 7.2125 8.025 6.9375 8.025C6.6625 8.025 6.425 8.11667 6.225 8.3C6.025 8.5 5.925 8.7375 5.925 9.0125C5.925 9.2875 6.025 9.525 6.225 9.725L9.3 12.8C9.5 13 9.73333 13.1 10 13.1C10.2667 13.1 10.5 13 10.7 12.8L13.8 9.7C14 9.5 14.0958 9.26667 14.0875 9C14.0792 8.73333 13.975 8.5 13.775 8.3C13.575 8.11667 13.3417 8.02083 13.075 8.0125C12.8083 8.00417 12.575 8.1 12.375 8.3L10 10.675ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                  fill="#EF233C"
                />
              </svg>
            </span>
          </div>

          <div
            className={`bg-black-0 transition-max-height duration-300 overflow-hidden ${
              activeQuestionId === item.id ? "max-h-[200px] md:max-h-[80px] " : "max-h-0"
            }`}
          >
            <p className="text-white-0 pb-6 px-6 font-medium">{item.response}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
