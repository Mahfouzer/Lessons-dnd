import React from "react";
import { Days } from "../../Models/Days.model";
import { Banner, DayInfo, WeekContainer } from "./WeekSchedule.styled";

export default function WeekScheduleHeader() {
  const renderDaysName = () =>
    Array.from({ length: 7 }).map((el, ind) => (
      <DayInfo key={Days[ind]}>{Days[ind]}</DayInfo>
    ));
  return (
    <header>
      <WeekContainer>
        {renderDaysName()}
        </WeekContainer>
      <Banner>Weekdays</Banner>
    </header>
  );
}
