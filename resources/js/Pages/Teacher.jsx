import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";

const Teacher = () => {
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
                                            <li>Teacher</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="team">
                    <div
                        className="team_background parallax-window"
                        data-parallax="scroll"
                        data-speed="0.8"
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
                                        The Best Tutors in Town
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
                        <div className="row team_row">
                            {/* Team Item */}
                            <div className="col-lg-3 col-md-6 team_col">
                                <div className="team_item">
                                    <div className="team_image">
                                        <img src="/landing/images/team_1.jpg" alt="" />
                                    </div>
                                    <div className="team_body">
                                        <div className="team_title">
                                            <a href="#">Jacke Masito</a>
                                        </div>
                                        <div className="team_subtitle">
                                            Marketing &amp; Management
                                        </div>
                                        <div className="social_list">
                                            <ul>
                                                <li>
                                                    <a href="#">
                                                        <i
                                                            className="fa fa-facebook"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i
                                                            className="fa fa-twitter"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i
                                                            className="fa fa-google-plus"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Team Item */}
                            <div className="col-lg-3 col-md-6 team_col">
                                <div className="team_item">
                                    <div className="team_image">
                                        <img src="/landing/images/team_2.jpg" alt="" />
                                    </div>
                                    <div className="team_body">
                                        <div className="team_title">
                                            <a href="#">William James</a>
                                        </div>
                                        <div className="team_subtitle">
                                            Designer &amp; Website
                                        </div>
                                        <div className="social_list">
                                            <ul>
                                                <li>
                                                    <a href="#">
                                                        <i
                                                            className="fa fa-facebook"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i
                                                            className="fa fa-twitter"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i
                                                            className="fa fa-google-plus"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Team Item */}
                            <div className="col-lg-3 col-md-6 team_col">
                                <div className="team_item">
                                    <div className="team_image">
                                        <img src="/landing/images/team_1.jpg" alt="" />
                                    </div>
                                    <div className="team_body">
                                        <div className="team_title">
                                            <a href="#">John Tyler</a>
                                        </div>
                                        <div className="team_subtitle">
                                            Quantum mechanics
                                        </div>
                                        <div className="social_list">
                                            <ul>
                                                <li>
                                                    <a href="#">
                                                        <i
                                                            className="fa fa-facebook"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i
                                                            className="fa fa-twitter"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i
                                                            className="fa fa-google-plus"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Team Item */}
                            <div className="col-lg-3 col-md-6 team_col">
                                <div className="team_item">
                                    <div className="team_image">
                                        <img src="/landing/images/team_2.jpg" alt="" />
                                    </div>
                                    <div className="team_body">
                                        <div className="team_title">
                                            <a href="#">Veronica Vahn</a>
                                        </div>
                                        <div className="team_subtitle">
                                            Math &amp; Physics
                                        </div>
                                        <div className="social_list">
                                            <ul>
                                                <li>
                                                    <a href="#">
                                                        <i
                                                            className="fa fa-facebook"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i
                                                            className="fa fa-twitter"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i
                                                            className="fa fa-google-plus"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Teacher;
