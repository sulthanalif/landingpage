import { Link } from "@inertiajs/react";
import React from "react";

const Activity = () => {
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
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Donec vel gravida arcu.
                                        Vestibulum feugiat, sapien ultrices
                                        fermentum congue, quam velit venenatis
                                        sem
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row courses_row">
                        {/* Course */}
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
                                        <a href="course.html">
                                            Software Training
                                        </a>
                                    </h3>
                                    <div className="course_teacher">
                                        Mr. John Taylor
                                    </div>
                                    <div className="course_text">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipi elitsed do eiusmod
                                            tempor
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Course */}
                        <div className="col-lg-4 course_col">
                            <div className="course">
                                <div className="course_image">
                                    <img
                                        src="/landing/images/course_2.jpg"
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <div className="course_body">
                                    <h3 className="course_title">
                                        <a href="course.html">
                                            Developing Mobile Apps
                                        </a>
                                    </h3>
                                    <div className="course_teacher">
                                        Ms. Lucius
                                    </div>
                                    <div className="course_text">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipi elitsed do eiusmod
                                            tempor
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Course */}
                        <div className="col-lg-4 course_col">
                            <div className="course">
                                <div className="course_image">
                                    <img
                                        src="/landing/images/course_3.jpg"
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <div className="course_body">
                                    <h3 className="course_title">
                                        <a href="course.html">
                                            Starting a Startup
                                        </a>
                                    </h3>
                                    <div className="course_teacher">
                                        Mr. Charles
                                    </div>
                                    <div className="course_text">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipi elitsed do eiusmod
                                            tempor
                                        </p>
                                    </div>
                                </div>
                                {/* <div className="course_footer">
                                    <div className="course_footer_content d-flex flex-row align-items-center justify-content-start">
                                        <div className="course_info">
                                            <i
                                                className="fa fa-graduation-cap"
                                                aria-hidden="true"
                                            />
                                            <span>20 Student</span>
                                        </div>
                                        <div className="course_info">
                                            <i
                                                className="fa fa-star"
                                                aria-hidden="true"
                                            />
                                            <span>5 Ratings</span>
                                        </div>
                                        <div className="course_price ml-auto">
                                            <span>$320</span>$220
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="courses_button trans_200">
                                <Link href="/activities">view all activities</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Activity;
