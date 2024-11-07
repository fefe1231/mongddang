import { DatePicker, DatePickerProps } from '@mantine/dates';
import { useState } from 'react';
import { formatTwoDigit } from '@/shared/lib/date';
import { CalendarService } from '../model';

export const RecordCalendar = () => {
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // const setMonthProps: MonthPickerProps['getMonthControlProps'] = (date) => {
  //   return {};
  // };

  const setDayProps: DatePickerProps['getDayProps'] = (date) => {
    // 현재 날짜에 밑줄 표시
    if (CalendarService.isToday(date)) {
      return {
        style: { textDecoration: 'underline' },
      };
    }

    // 토요일의 경우 파란색 글자
    if (
      CalendarService.isCurrentMonth(date, currentMonth) &&
      CalendarService.isSaturday(date)
    ) {
      return {
        style: { color: 'blue' },
      };
    }

    return {};
  };

  // 다음 달을 클릭하면 현재 월 갱신
  const onNextMonth = () => {
    setCurrentMonth(CalendarService.getNextMonth(currentMonth));
  };

  // 이전 달을 클릭하면 현재 월 갱신
  const onPreviousMonth = () => {
    setCurrentMonth(CalendarService.getPreviousMonth(currentMonth));
  };

  // 일자를 두자리 포맷으로 설정
  const renderDay = (date: Date) => {
    const day = date.getDate();
    return <div>{formatTwoDigit(day)}</div>;
  };

  return (
    <div>
      <DatePicker
        value={dateValue}
        onChange={setDateValue}
        type="default"
        size="lg"
        getDayProps={setDayProps}
        // getMonthControlProps={setMonthProps}
        renderDay={renderDay}
        onNextMonth={onNextMonth}
        onPreviousMonth={onPreviousMonth}
      />
    </div>
  );
};
