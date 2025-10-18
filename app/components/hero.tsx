'use client';
import React, { forwardRef, useRef, useState } from 'react';
import CustomDatePicker from './custom-date-picker';
import { generateMagicSquare } from '../utils/generate-magic-square';

type HeroProps = {
  // optional: you can pass a callback if needed
};


const Hero = forwardRef<HTMLElement, HeroProps>((props, ref) => {
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [magicSquare, setMagicSquare] = useState<number[][]>([]);

  const [magicConstant, setmagicConstant] = useState<number>(0);

  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const highlightOptions: { [key: number]: number[] } = {
    0: [],
    1: [0, 1, 2, 3],
    2: [4, 5, 6, 7],
    3: [8, 9, 10, 11],
    4: [12, 13, 14, 15],
    5: [0, 4, 8, 12],
    6: [1, 5, 9, 13],
    7: [2, 6, 10, 14],
    8: [3, 7, 11, 15],
    9: [0, 5, 10, 15],
    10: [3, 6, 9, 12],
    11: [0, 3, 12, 15],
    12: [4, 8, 7, 11],
    13: [1, 2, 13, 14],
    14: [5, 6, 9, 10]
  };


  var interval: any;

  const startHighlightInterval = () => {
    endHighlightInterval();
    interval = setInterval(() => {
      setHighlightIndex(oldIndex => {
        if (oldIndex >= 14) { endHighlightInterval(); return 0; }
        return oldIndex + 1;
      });
    }, 2 * 1000); // 5 seconds
  }

  const endHighlightInterval = () => {
    setHighlightIndex(0);
    if (interval) {
      clearInterval(interval);
    }
  }


  const handleDateChange = (date: Date) => {
    setDob(date);
    if (date) {
      var res = generateMagicSquare(date);
      const square = res.square
      setMagicSquare(square);
      setmagicConstant(res.magicConstant);
      startHighlightInterval();
    } else {
      setMagicSquare([]);
      setmagicConstant(0);
      endHighlightInterval();
    }
  };

  return (
    <section
      ref={ref}
      className="h-screen w-full flex flex-col items-center justify-center gap-6 px-4 md:px-0 bg-[var(--color-primary)]"
    >
      <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-secondary)] text-center">
        Select Your DOB
      </h1>

      {/* Picker container fixes width/padding */}
      <div className="w-full md:w-80">
        <CustomDatePicker selectedDate={dob} onDateChange={handleDateChange} />
      </div>

      {/* Magic Square */}
      {magicSquare.length > 0 ? (
        <div className="mt-8 grid grid-cols-4 grid-rows-4 gap-2 md:gap-4">
          {magicSquare.flat().map((val, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20  text-[var(--color-primary)] font-semibold rounded-md shadow-[var(--shadow)] hover:bg-[var(--color-accent)] transition-colors cursor-pointer

                  ${highlightOptions[highlightIndex].includes(idx) ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-tertiary)]'}
                `}
            >
              {val}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center gap-2 w-full max-w-sm p-6 bg-[var(--color-tertiary)] text-[var(--color-primary)] rounded-lg shadow-[var(--shadow)]">
          <p className="text-center font-medium text-lg md:text-xl">
            Select your Date of Birth to generate your
            <br />
            <span className="font-bold">Ramanujan Magic Square</span>
          </p>
          <p className="text-center text-sm md:text-base text-[var(--color-secodary)] mt-2">
            Each square is unique to your DOB
          </p>
        </div>
      )}

      {magicSquare.length > 0 && (
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-secondary)] rounded-lg shadow-[var(--shadow)] w-min">
            <p className="text-center text-lg md:text-xl font-semibold">
              Magic Constant
            </p>
            <p className="text-center text-2xl md:text-3xl font-extrabold mt-1">
              {magicConstant}
            </p>
          </div>
        </div>
      )}



      {false && dob && (
        <p className="mt-4 text-[var(--color-secondary)] text-center">
          Selected DOB: {dob?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
        </p>
      )}
    </section>
  );
});

export default Hero;