import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link, usePage } from "@inertiajs/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarAcademic = ({ calendars }) => {
    useEffect(() => {
        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.type = "text/css";
        link1.href = "/landing/styles/about.css";

        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.type = "text/css";
        link2.href = "/landing/styles/about_responsive.css";

        document.head.appendChild(link1);
        document.head.appendChild(link2);

        const script = document.createElement("script");
        script.src = "/landing/js/about.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.head.removeChild(link1);
            document.head.removeChild(link2);
            document.body.removeChild(script);
        };
    }, []);

    // const events = [{ title: "Meeting", start: new Date(), color: "#378006" }];

    const calendarData = calendars || [];

    const events = calendarData
        .map((calendar) => {
            try {
                const startDate = new Date(calendar.start_date);
                const endDate = new Date(calendar.end_date);

                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                    console.error("Invalid date format", calendar);
                    return null;
                }

                const durationInDays =
                    Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) +
                    1;

                let endDateFormatted = calendar.end_date;
                if (durationInDays > 1) {
                    const end = new Date(endDate);
                    end.setDate(end.getDate() + 1);
                    endDateFormatted = end.toISOString().split("T")[0];
                }

                return {
                    id: calendar.id,
                    title: calendar.label || calendar.description,
                    start: calendar.start_date,
                    end: endDateFormatted,
                    color: calendar.code,
                    textColor: "white",
                    extendedProps: {
                        description: calendar.description,
                        status: calendar.status,
                        duration:
                            durationInDays > 1
                                ? `${durationInDays} days`
                                : "1 day",
                    },
                    allDay: true,
                };
            } catch (error) {
                console.error(
                    "Error processing calendar event:",
                    calendar,
                    error
                );
                return null;
            }
        })
        .filter((event) => event !== null);

    function getColorClass(cssClass) {
        const colorMap = {
            "blue-200": "#93c5fd",
            "amber-200": "#fcd34d",
            "red-200": "#fca5a5",
            "green-200": "#86efac",
            "purple-200": "#d8b4fe",
        };
        return colorMap[cssClass] || "#378006";
    }

    return (
        <>
            <Layout>
                <div className="home">
                    <div className="breadcrumbs_container">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="breadcrumbs">
                                        <ul>
                                            <li>
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li>Curriculum</li>
                                            <li>Calendar Academic</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="feature">
                    <div
                        className="feature_background"
                        style={{
                            backgroundImage:
                                "url(/landing/images/courses_background.jpg)",
                        }}
                    />
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="section_title_container text-center">
                                    <h2 className="section_title">
                                        Calendar Academic
                                    </h2>
                                    <div className="section_subtitle">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Donec
                                            vel gravida arcu. Vestibulum
                                            feugiat, sapien ultrices fermentum
                                            congue, quam velit venenatis sem
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row feature_row">
                            <div className="col-lg-12 feature_col">
                                <div className="feature_content">
                                    <FullCalendar
                                        plugins={[
                                            dayGridPlugin,
                                            timeGridPlugin,
                                            interactionPlugin,
                                        ]}
                                        headerToolbar={{
                                            left: "prev,next today",
                                            center: "title",
                                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                                        }}
                                        initialView="dayGridMonth"
                                        weekends={true}
                                        events={events}
                                        // eventContent={renderEventContent}
                                        eventClick={handleEventClick}
                                        eventDisplay="block"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

function renderEventContent(eventInfo) {
    const start = new Date(eventInfo.event.start);
    const end = eventInfo.event.end ? new Date(eventInfo.event.end) : start;
    const isMultiDay = (end - start) > 86400000; // Lebih dari 1 hari

    return (
        <div className="fc-event-content">
            <div className="fc-event-title">{eventInfo.event.title}</div>
            {isMultiDay && (
                <div className="fc-event-days">
                    {Math.ceil((end - start) / 86400000)} days
                </div>
            )}
        </div>
    );
}

function handleEventClick(info) {
    const start = info.event.start?.toLocaleDateString() || 'N/A';
    const end = info.event.end ? 
        new Date(info.event.end.getTime() - 86400000).toLocaleDateString() : 
        start;
    
    alert(
        `Event: ${info.event.title}\n` +
        `Start: ${start}\n` +
        `End: ${end}\n` +
        `Description: ${info.event.extendedProps.description || 'No description'}`
    );
}

export default CalendarAcademic;
