import React  from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

const CalendarDemo = () => {

    console.log(localizer.endOf(new Date(), 'month'));
    console.log(localizer.startOf(new Date(), 'month'));

    const [calendarData] = React.useState({
        views : [Views.MONTH], // เพิ่มมุมมอง ใส่ Object เพิ่ม เช่น Views.DAY
        startAccessor:"start", // key ของ Object ที่กำหนดเวลาเริ่มของ Event
        endAccessor:"end"   // key ของ Object ที่กำหนดเวลาสิ้นสุดของ Event
    })

    const now = new Date();

    const myEventsList = [
        {
          id: 0,
          title: 'All Day Event very long title',
          allDay: true,
          start: new Date(2022, 7, 0),
          end: new Date(2022, 7, 1),
        },
        {
          id: 1,
          title: 'Long Event',
          start: new Date(2022, 7, 7),
          end: new Date(2022, 7, 10),
        },
      
        {
          id: 2,
          title: 'DTS STARTS',
          start: new Date(2022, 2, 13, 0, 0, 0),
          end: new Date(2022, 2, 20, 0, 0, 0),
        },
      
        {
          id: 3,
          title: 'DTS ENDS',
          start: new Date(2022, 10, 6, 0, 0, 0),
          end: new Date(2022, 10, 13, 0, 0, 0),
        },
      
        {
          id: 4,
          title: 'Some Event',
          start: new Date(2022, 7, 9, 0, 0, 0),
          end: new Date(2022, 7, 10, 0, 0, 0),
        },
        {
          id: 5,
          title: 'Conference',
          start: new Date(2022, 7, 11),
          end: new Date(2022, 7, 13),
          desc: 'Big conference for important people',
        },
        {
          id: 6,
          title: 'Meeting',
          start: new Date(2022, 7, 12, 10, 30, 0, 0),
          end: new Date(2022, 7, 12, 12, 30, 0, 0),
          desc: 'Pre-meeting meeting, to prepare for the meeting',
        },
        {
          id: 7,
          title: 'Lunch',
          start: new Date(2022, 7, 12, 12, 0, 0, 0),
          end: new Date(2022, 7, 12, 13, 0, 0, 0),
          desc: 'Power lunch',
        },
        {
          id: 8,
          title: 'Meeting',
          start: new Date(2022, 7, 12, 14, 0, 0, 0),
          end: new Date(2022, 7, 12, 15, 0, 0, 0),
        },
        {
          id: 9,
          title: 'Happy Hour',
          start: new Date(2022, 7, 12, 17, 0, 0, 0),
          end: new Date(2022, 7, 12, 17, 30, 0, 0),
          desc: 'Most important meal of the day',
        },
        {
          id: 10,
          title: 'Dinner',
          start: new Date(2022, 7, 12, 20, 0, 0, 0),
          end: new Date(2022, 7, 12, 21, 0, 0, 0),
        },
        {
          id: 11,
          title: 'Planning Meeting with Paige',
          start: new Date(2022, 7, 13, 8, 0, 0),
          end: new Date(2022, 7, 13, 10, 30, 0),
        },
        {
          id: 11.1,
          title: 'Inconvenient Conference Call',
          start: new Date(2022, 7, 13, 9, 30, 0),
          end: new Date(2022, 7, 13, 12, 0, 0),
        },
        {
          id: 11.2,
          title: "Project Kickoff - Lou's Shoes",
          start: new Date(2022, 7, 13, 11, 30, 0),
          end: new Date(2022, 7, 13, 14, 0, 0),
        },
        {
          id: 11.3,
          title: 'Quote Follow-up - Tea by Tina',
          start: new Date(2022, 7, 13, 15, 30, 0),
          end: new Date(2022, 7, 13, 16, 0, 0),
        },
        {
          id: 12,
          title: 'Late Night Event',
          start: new Date(2022, 7, 17, 19, 30, 0),
          end: new Date(2022, 7, 18, 2, 0, 0),
        },
        {
          id: 12.5,
          title: 'Late Same Night Event',
          start: new Date(2022, 7, 17, 19, 30, 0),
          end: new Date(2022, 7, 17, 23, 30, 0),
        },
        {
          id: 13,
          title: 'Multi-day Event',
          start: new Date(2022, 7, 20, 19, 30, 0),
          end: new Date(2022, 7, 22, 2, 0, 0),
        },
        {
          id: 14,
          title: 'Today',
          start: new Date(new Date().setHours(new Date().getHours() - 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 3)),
        },
        {
          id: 15,
          title: 'Point in Time Event',
          start: now,
          end: now,
        },
        {
          id: 16,
          title: 'Video Record',
          start: new Date(2022, 7, 14, 15, 30, 0),
          end: new Date(2022, 7, 14, 19, 0, 0),
        },
        {
          id: 17,
          title: 'Dutch Song Producing',
          start: new Date(2022, 7, 14, 16, 30, 0),
          end: new Date(2022, 7, 14, 20, 0, 0),
        },
        {
          id: 18,
          title: 'Itaewon Halloween Meeting',
          start: new Date(2022, 7, 14, 16, 30, 0),
          end: new Date(2022, 7, 14, 17, 30, 0),
        },
        {
          id: 19,
          title: 'Online Coding Test',
          start: new Date(2022, 7, 14, 17, 30, 0),
          end: new Date(2022, 7, 14, 20, 30, 0),
        },
        {
          id: 20,
          title: 'An overlapped Event',
          start: new Date(2022, 7, 14, 17, 0, 0),
          end: new Date(2022, 7, 14, 18, 30, 0),
        },
        {
          id: 21,
          title: 'Phone Interview',
          start: new Date(2022, 7, 14, 17, 0, 0),
          end: new Date(2022, 7, 14, 18, 30, 0),
        },
        {
          id: 22,
          title: 'Cooking Class',
          start: new Date(2022, 7, 14, 17, 30, 0),
          end: new Date(2022, 7, 14, 19, 0, 0),
        },
        {
          id: 23,
          title: 'Go to the gym',
          start: new Date(2022, 7, 14, 18, 30, 0),
          end: new Date(2022, 7, 14, 20, 0, 0),
        },
      ]

  return (
    <div>
      <Calendar
        localizer={localizer}
        {...calendarData}
        events={myEventsList}
        selectable
        toolbar={false}
        onSelectSlot={(info) => {
          //handleOpen(info.start);
        }}
        onSelectEvent={(event) => {
            alert(JSON.stringify(event));
          //handleOpen(event.start);
        }}
        onRangeChange={(range) => {
        }}
        style={{ height: 600 }}
      />
      {JSON.stringify(calendarData)}
    </div>
  );
};

export default CalendarDemo;
