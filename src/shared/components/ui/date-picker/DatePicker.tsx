'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AppButton } from '../button/AppButton';

interface DatePickerProps {
  value?: {
    day?: number;
    month?: number;
    year?: number;
  };
  onChange: (date: { day: number; month: number; year: number }) => void;
  minYear?: number;
  maxYear?: number;
}

export function DatePicker({
  value = {},
  onChange,
  minYear = 1900,
  maxYear = new Date().getFullYear(),
}: DatePickerProps) {
  const [step, setStep] = useState<'day' | 'month' | 'year'>('day');
  const [selectedDay, setSelectedDay] = useState(value.day);
  const [selectedMonth, setSelectedMonth] = useState(value.month || new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(value.year || new Date().getFullYear());

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay();

  const days = useMemo(() => {
    const arr = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      arr.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      arr.push(i);
    }
    return arr;
  }, [daysInMonth, firstDayOfMonth]);

  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  const years = useMemo(() => {
    const arr = [];
    for (let i = maxYear; i >= minYear; i--) {
      arr.push(i);
    }
    return arr;
  }, [minYear, maxYear]);

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    setStep('month');
  };

  const handleMonthSelect = (month: number) => {
    setSelectedMonth(month);
    setStep('year');
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    onChange({ day: selectedDay!, month: selectedMonth, year });
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Day selection step
  if (step === 'day') {
    return (
      <div className='space-y-4'>
        <div className='flex items-center justify-between gap-2'>
          <button
            type='button'
            onClick={handlePrevMonth}
            className='text-muted-foreground hover:text-foreground p-1 transition-colors'>
            <ChevronLeft className='h-4 w-4' />
          </button>
          <button type='button' className='text-primary pointer-events-none flex-1 text-center text-sm font-semibold'>
            {months[selectedMonth - 1]} {selectedYear}
          </button>
          <button
            type='button'
            onClick={handleNextMonth}
            className='text-muted-foreground hover:text-foreground p-1 transition-colors'>
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>

        <div className='grid grid-cols-7 gap-1'>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className='text-muted-foreground text-center text-xs font-semibold'>
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <button
              key={index}
              type='button'
              onClick={() => day && handleDaySelect(day)}
              disabled={!day}
              className={`h-8 rounded-md text-sm font-medium transition-colors ${
                !day
                  ? 'text-muted-foreground/30 cursor-default'
                  : selectedDay === day && value.month === selectedMonth && value.year === selectedYear
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-foreground'
              }`}>
              {day}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Month selection step
  if (step === 'month') {
    return (
      <div className='space-y-4'>
        <div>
          <p className='mb-4 text-center text-sm font-semibold'>Select Month</p>
          <div className='grid grid-cols-3 gap-2'>
            {months.map((month, index) => (
              <AppButton
                key={month}
                type='button'
                variant={selectedMonth === index + 1 ? 'default' : 'outline'}
                size='sm'
                onClick={() => handleMonthSelect(index + 1)}
                className='h-10 text-xs'>
                {month.slice(0, 3)}
              </AppButton>
            ))}
          </div>
        </div>

        <button
          type='button'
          onClick={() => setStep('day')}
          className='text-primary hover:text-primary/80 w-full text-xs transition-colors'>
          ← Back
        </button>
      </div>
    );
  }

  // Year selection step
  return (
    <div className='space-y-4'>
      <div>
        <p className='mb-4 text-center text-sm font-semibold'>Select Year</p>
        <div className='grid max-h-64 grid-cols-4 gap-2 overflow-y-auto'>
          {years.map((year) => (
            <AppButton
              key={year}
              type='button'
              variant={selectedYear === year ? 'default' : 'outline'}
              size='sm'
              onClick={() => handleYearSelect(year)}
              className='h-8 text-xs'>
              {year}
            </AppButton>
          ))}
        </div>
      </div>

      <button
        type='button'
        onClick={() => setStep('month')}
        className='text-primary hover:text-primary/80 w-full text-xs transition-colors'>
        ← Back
      </button>
    </div>
  );
}
