import { getWeekDays } from "@/utils/get-weks-days";
import { CaretLeft, CaretRight } from "phosphor-react";
import { CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";

export function Calendar(){
  const shortWeekDays = getWeekDays({ short: true })
  
  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>Fevereiro <span>2023</span></CalendarTitle>
        <CalendarTitle>
          <button><CaretLeft /></button>
          <button><CaretRight /></button>
        </CalendarTitle>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map(weekDay => <th key={weekDay}>{weekDay}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><CalendarDay>1</CalendarDay></td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}