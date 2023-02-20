import { useState } from "react";
import { CalendarStap } from "./CalendarStap";
import { ConfirmStap } from "./ConfirmStap";

export function ScheduleForm(){
  const [selectDateTime, setSelectDateTime] = useState<Date | null>();
 
  function handleClearSelectedDateTime(){
    setSelectDateTime(null);
  }

  if(selectDateTime){
    return <ConfirmStap schedulingDate={selectDateTime} onCancelConfirmation={handleClearSelectedDateTime} />
  }
  return <CalendarStap onSelectDateTime={setSelectDateTime} />
}