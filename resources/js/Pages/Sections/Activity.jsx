import { Link } from "@inertiajs/react";
import React from "react";

const Activity = ({ activities }) => {
    return (
        <>
            <div className="courses">
                <div
                    className="section_background parallax-window"
                    loading="lazy"
                    style={{
                        backgroundImage: `url('/landing/images/courses_background.jpg')`,
                        backgroundAttachment: "fixed",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section_title_container text-center">
                                <h2 className="section_title">
                                    Our Activities
                                </h2>
                                <div className="section_subtitle">
                                    <p>
                                        The following are activities at our
                                        school
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row courses_row">
                        {activities && activities.length > 0 ? (
                            activities.map((activity) => (
                                <>
                                    <div className="col-lg-4 course_col">
                                        <div className="course">
                                            <div className="course_image">
                                                <img
                                                    src="/landing/images/course_1.jpg"
                                                    alt=""
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="course_body">
                                                <h3 className="course_title">
                                                    <a href="#">
                                                        {activity.title}
                                                    </a>
                                                </h3>
                                                {/* <div className="course_teacher">
                                                    Mr. John Taylor
                                                </div>
                                                <div className="course_text">
                                                    <p>
                                                        Lorem ipsum dolor sit
                                                        amet, consectetur adipi
                                                        elitsed do eiusmod
                                                        tempor
                                                    </p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="courses_button trans_200">
                                                <Link href="/story">
                                                    view all activities
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        ) : (
                            <div className="col-lg-12 course_col">
                                <div className="course">
                                    <div className="course_body">
                                        <h3 className="course_title text-center">
                                            No activity found
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Activity;
