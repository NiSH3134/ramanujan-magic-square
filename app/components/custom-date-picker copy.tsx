'use client';
import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { Calendar } from 'lucide-react';
import classNames from 'react-day-picker/style.module.css';

export default function CustomDatePicker() {
  const [selected, setSelected] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();

  // Close picker if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Parse input value in dd/MMM/yyyy or dd/MM/yyyy
  const parseDateInput = (value: string) => {
    const dmyRegex = /^(\d{1,2})\/([a-zA-Z]{3})\/(\d{4})$/;
    const dmRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

    let day: number, month: number, year: number;

    const matchMMM = value.match(dmyRegex);
    if (matchMMM) {
      day = parseInt(matchMMM[1]);
      const monStr = matchMMM[2].toLowerCase();
      const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
      month = months.indexOf(monStr);
      year = parseInt(matchMMM[3]);
      if (month >= 0) return new Date(year, month, day);
    }

    const matchMM = value.match(dmRegex);
    if (matchMM) {
      day = parseInt(matchMM[1]);
      month = parseInt(matchMM[2]) - 1;
      year = parseInt(matchMM[3]);
      return new Date(year, month, day);
    }

    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = parseDateInput(e.target.value);
    if (date && date.getFullYear() >= 1900 && date.getFullYear() <= currentYear) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  };

  const handleDaySelect = (date?: Date) => {
    if (!date) return;
    if (date.getFullYear() < 1900 || date.getFullYear() > currentYear) return;
    setSelected(date);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:max-w-sm" ref={inputRef}>
      {/* Input box */}
      <div className="flex items-center bg-[var(--color-primary)] text-[var(--color-secondary)] rounded-lg shadow-[var(--shadow)] p-2 gap-2 w-full">
        <input
          type="text"
          value={
            selected
              ? selected.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })
              : ''
          }
          readOnly
          onChange={handleInputChange}
          placeholder="dd/MMM/yyyy"
          className="flex-1 bg-transparent outline-none text-[var(--color-secondary)] w-full"
        />
        <Calendar
          className="w-6 h-6 cursor-pointer text-[var(--color-accent)]"
          onClick={() => setIsOpen(prev => !prev)}
        />
      </div>

      {/* Calendar popup */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-[var(--color-primary)] text-[var(--color-secondary)] shadow-[var(--shadow)] rounded-lg">

          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleDaySelect}
            startMonth={new Date(1900, 0)}
            endMonth={new Date()}
            captionLayout="dropdown-months"
            classNames={{
              dropdown_root: `${classNames.dropdown_root} bg-[var(--color-primary)] scrollbar-thin scrollbar-thumb-[var(--color-accent)] scrollbar-track-[var(--color-tertiary)]`,
              dropdown: `${classNames.dropdown} bg-[var(--color-primary)]`,
              chevron: 'fill-[var(--color-accent)]',
              today: 'bg-[var(--color-tertiary)] border-[var(--color-accent)] text-[var(--color-primary)]',
              selected: 'bg-[var(--color-accent)] text-[var(--color-primary)] border-[var(--color-accent)]',
            }}
          />


        </div>
      )}
    </div>
  );
}
