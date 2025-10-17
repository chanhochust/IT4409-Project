'use client';
import React, { useState } from 'react';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

const QUESTIONS: Question[] = [
  {
    text: 'React hook dùng để quản lý state trong function component?',
    options: ['useMemo', 'useEffect', 'useState', 'useRef'],
    correctAnswer: 'useState',
  },
  {
    text: 'TypeScript là phần mở rộng của ngôn ngữ nào?',
    options: ['Python', 'Java', 'JavaScript', 'C#'],
    correctAnswer: 'JavaScript',
  },
  {
    text: 'Phương thức nào dùng để lặp qua mảng và tạo JSX?',
    options: ['reduce', 'map', 'filter', 'find'],
    correctAnswer: 'map',
  },
];

export default function QuizAppExercise() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[index];
  if (!q) return null;

  function handleSelect(option: string) {
    if (selected !== null) return;
    setSelected(option);

    if (!q) return null;
    if (option === q.correctAnswer) setScore(score + 1);
  }

  function handleNext() {
    if (selected === null) return;
    if (index + 1 < QUESTIONS.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  }

  function handleRestart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <h1 className='mb-4 text-2xl font-semibold'>Quiz</h1>

      {!done ? (
        <div className='space-y-4'>
          <div className='text-sm text-gray-600'>
            Câu {index + 1}/{QUESTIONS.length}
          </div>
          <div className='text-lg font-medium'>{q.text}</div>

          <div className='grid gap-3'>
            {q.options.map((op) => {
              const isCorrect = op === q.correctAnswer;
              const isSelected = op === selected;
              const showState = selected !== null;
              const base = 'w-full rounded-md border px-4 py-2 text-left transition';
              const neutral = 'border-gray-300 hover:bg-gray-50';
              const correct = 'border-green-300 bg-green-50 text-green-700';
              const wrong = 'border-red-300 bg-red-50 text-red-700';
              const cls =
                showState && isCorrect
                  ? `${base} ${correct}`
                  : showState && isSelected && !isCorrect
                    ? `${base} ${wrong}`
                    : `${base} ${neutral}`;

              return (
                <button key={op} className={cls} onClick={() => handleSelect(op)} disabled={selected !== null}>
                  {op}
                </button>
              );
            })}
          </div>

          <div className='flex items-center justify-between'>
            <div className='text-sm text-gray-600'>Điểm: {score}</div>
            <button
              onClick={handleNext}
              disabled={selected === null}
              className='rounded-md bg-gray-900 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300'>
              {index + 1 < QUESTIONS.length ? 'Câu tiếp' : 'Xem kết quả'}
            </button>
          </div>
        </div>
      ) : (
        <div className='space-y-4'>
          <div className='text-xl font-semibold'>
            Kết quả: {score}/{QUESTIONS.length}
          </div>
          <button onClick={handleRestart} className='rounded-md border border-gray-300 px-4 py-2'>
            Làm lại
          </button>
        </div>
      )}
    </div>
  );
}
