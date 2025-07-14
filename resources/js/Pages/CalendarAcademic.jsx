import React, { useEffect, useRef, useState } from "react";
import Layout from "../Components/Layout";
import { Link, usePage } from "@inertiajs/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import useApi from "../Hooks/response";

const CalendarAcademic = () => {
    const styleRefs = useRef([]);
    const scriptRefs = useRef([]);

    useEffect(() => {
        const addFile = (type, attributes, target) => {
            const file = document.createElement(type);
            Object.entries(attributes).forEach(([key, value]) => {
                file[key] = value;
            });
            target.appendChild(file);
            return file;
        };

        styleRefs.current = [
            addFile(
                "link",
                { rel: "stylesheet", href: "/landing/styles/about.css" },
                document.head
            ),
            addFile(
                "link",
                {
                    rel: "stylesheet",
                    href: "/landing/styles/about_responsive.css",
                },
                document.head
            ),
        ];

        scriptRefs.current = [
            addFile(
                "script",
                { src: "/landing/js/about.js", async: true },
                document.body
            ),
        ];

        return () => {
            styleRefs.current.forEach(
                (file) => file && file.parentNode.removeChild(file)
            );
            scriptRefs.current.forEach(
                (file) => file && file.parentNode.removeChild(file)
            );
        };
    }, []);

    // const events = [{ title: "Meeting", start: new Date(), color: "#378006" }];

    const { data: calendars, get: getCalendars } = useApi("calendars");

    useEffect(() => {
        getCalendars();
    }, []);

    const calendarData = Array.isArray(calendars?.calendars) ? calendars.calendars : [];

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

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const uniqueCategories = [];
        const seen = new Set();

        calendarData.forEach(item => {
            const key = item.category + "-" + item.code;
            if (!seen.has(key)) {
                uniqueCategories.push({ category: item.category, code: item.code });
                seen.add(key);
            }
        });

        setCategories(uniqueCategories);
    }, [calendarData]);

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
                                            The following is the academic calendar at our school.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row feature_row mt-3">
                            <div className="mb-3">
                                <h4>Calendar Categories:</h4>
                                <ul className="category-list pt-0">
                                    {categories.map((item, index) => (
                                        <li key={index} className="category-item">
                                            <div
                                                className="category-color"
                                                style={{ backgroundColor: item.code }}
                                            />
                                            <p className="category-name">{item.category}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-3">
                                <h5 className="font-italic text-muted">Note: Tentative Schedule - We reserve the right to change or alter herein schedule as needed</h5>
                            </div>
                            <div className="col-lg-12 feature_col">
                                <div className="feature_content notranslate">
                                    <FullCalendar
                                        plugins={[
                                            dayGridPlugin,
                                            timeGridPlugin,
                                            interactionPlugin,
                                        ]}
                                        headerToolbar={{
                                            left: "prev,next",
                                            center: "title",
                                            right: "today",
                                        }}
                                        initialView="dayGridMonth"
                                        weekends={true}
                                        events={events}
                                        // eventContent={renderEventContent}
                                        eventClick={handleEventClick}
                                        eventDisplay="block"
                                        height={"auto"}
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
