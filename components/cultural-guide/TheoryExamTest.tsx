import React, { useState } from 'react';
import SEO from './SEO';

const questions = [
    { question: "حق تقدم با کیست؟", options: ["راست", "چپ", "پلیس"], answer: 0 },
    { question: "سرعت مجاز در شهر؟", options: ["30", "50", "100"], answer: 1 },
];

const TheoryExamTest: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const handleAnswer = (index: number) => {
        if (index === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            alert(`آزمون تمام شد. امتیاز شما: ${score + (index === questions[currentQuestion].answer ? 1 : 0)}`);
        }
    };

    return (
        <div className="p-6">
            <SEO title="شبیه‌ساز آزمون تئوری رانندگی اتریش" description="نمونه سوالات آزمون تئوری گواهینامه رانندگی اتریش به همراه ترجمه فارسی" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">آزمون تئوری رانندگی</h2>
            
            <div className="bg-stone-100 p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-4">{questions[currentQuestion].question}</h3>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                    <button key={index} onClick={() => handleAnswer(index)} className="block w-full text-right p-3 bg-white rounded shadow text-stone-700 hover:bg-stone-200">
                        {option}
                    </button>
                ))}
              </div>
            </div>
        </div>
    );
};
export default TheoryExamTest;
