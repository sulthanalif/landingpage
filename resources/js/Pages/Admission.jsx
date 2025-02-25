import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";

const Admission = () => {
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
                                            <li>Admission</li>
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
                                        Admission Guidelines
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
                            {/* Feature Content */}
                            <div className="col-lg-6 feature_col">
                                <div className="feature_content">
                                    {/* Accordions */}
                                    <div className="accordions">
                                        <div className="elements_accordions">
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center active">
                                                    <div>
                                                        Award for Best School
                                                        2017
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Lorem Ipsum has been the
                                                        industry's standard
                                                        dummy text ever since
                                                        the 1500s, when an
                                                        unknown printer took a
                                                        galley of type and
                                                        scrambled it to make a
                                                        type specimen book.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>
                                                        You’re learning from the
                                                        best.
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Lorem Ipsum has been the
                                                        industry's standard
                                                        dummy text ever since
                                                        the 1500s, when an
                                                        unknown printer took a
                                                        galley of type and
                                                        scrambled it to make a
                                                        type specimen book.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>
                                                        Our degrees are
                                                        recognized worldwide.
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Lorem Ipsum has been the
                                                        industry's standard
                                                        dummy text ever since
                                                        the 1500s, when an
                                                        unknown printer took a
                                                        galley of type and
                                                        scrambled it to make a
                                                        type specimen book.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="accordion_container">
                                                <div className="accordion d-flex flex-row align-items-center">
                                                    <div>
                                                        We encourage our
                                                        students to go global.
                                                    </div>
                                                </div>
                                                <div className="accordion_panel">
                                                    <p>
                                                        Lorem Ipsum has been the
                                                        industry's standard
                                                        dummy text ever since
                                                        the 1500s, when an
                                                        unknown printer took a
                                                        galley of type and
                                                        scrambled it to make a
                                                        type specimen book.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Accordions End */}
                                </div>
                            </div>
                            {/* Feature Video */}
                            <div className="col-lg-6 feature_col">
                                <div className="feature_video d-flex flex-column align-items-center justify-content-center">
                                    <div
                                        className="feature_video_background"
                                        style={{
                                            backgroundImage:
                                                "url(/landing/images/video.jpg)",
                                        }}
                                    />
                                    <a
                                        className="vimeo feature_video_button"
                                        href="https://player.vimeo.com/video/99340873?title=0"
                                        title="OH, PORTUGAL - IN 4K - Basti Hansen - Stock Footage"
                                    >
                                        <img
                                            src="/landing/images/play.png"
                                            alt=""
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Admission;
