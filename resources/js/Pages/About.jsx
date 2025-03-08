import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";

const About = () => {
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
                                            <li>About</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="features pt-0">
                    <div className="container">
                        <div className="row features_row">
                            <div className="col-lg-6">
                                <img
                                    src="/landing/images/our_history.png"
                                    alt=""
                                    loading="lazy"
                                    className="img-fluid mx-auto d-block"
                                />
                            </div>
                            <div className="col-lg-6 feature_col">
                                <div className="feature trans_400">
                                    <h2 className="feature_title">
                                        Our History
                                    </h2>
                                    <hr className="feature_line" />
                                    <div className="feature_text mt-3 text-justify">
                                        <p>
                                            Lia Stephanie Catholic School (LSCS)
                                            was established by Lia Stephanie
                                            Foundation in 1999. Initially, the
                                            school was located in a small
                                            shophouse in West Jakarta with the
                                            primary focus in providing quality
                                            early childhood education programs.
                                            Three school levels were offered at
                                            the same time, ie Nursery, Playgroup
                                            and Kindergarten with fewer than 10
                                            students enrolled.
                                        </p>
                                        <p>
                                            After 3 years of growing and
                                            nurturing young students, LSCS
                                            managed to increase students
                                            enrolment and decide to expand to a
                                            bigger capacity. The building was
                                            still within a short distance (less
                                            than 3 km away) from its previous
                                            location and would be home to LSCS’
                                            students for a few years to come.
                                        </p>
                                        <p>
                                            As demands for quality education
                                            continued to rise, LSCS then built
                                            another school in 2004 to
                                            accommodate the need for elementary
                                            level students. Later in 2009, LSCS
                                            also extended its provision for
                                            Junior and Senior High School
                                            programs by expanding to a bigger
                                            facility at Taman Surya V, West
                                            Jakarta.
                                        </p>
                                        <p>
                                            Since its inception, LSCS has
                                            committed to a pedagogical and
                                            Christian philosophy that speaks for
                                            parents and children. Despite its
                                            humble beginning, LSCS is now one of
                                            the leading Catholic schools in West
                                            Jakarta region with over 150
                                            graduates, pursuing higher academic
                                            levels in Indonesia or worldwide.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="feature">
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
                                        Our History
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
                            <div className="col-lg-6 feature_col">
                                <div className="feature_content">
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
                                </div>
                            </div>
                            <div className="col-lg-6 feature_col">
                                <div className="feature_video d-flex flex-column align-items-center justify-content-center">
                                    <div
                                        className="feature_video_background"
                                        style={{
                                            backgroundImage:
                                                "url(/landing/images/our_history.png)",
                                        }}
                                    />
                                    <a
                                        className="vimeo feature_video_button"
                                        href="https://player.vimeo.com/video/99340873?title=0"
                                        title="OH, PORTUGAL - IN 4K - Basti Hansen - Stock Footage"
                                    >
                                        <img src="/landing/images/play.png" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="about">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="section_title_container text-center">
                                    <h2 className="section_title">
                                        Our Visions and Missions
                                    </h2>
                                    {/* <div className="section_subtitle">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Donec
                                            vel gravida arcu Vestibulum
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="row about_row">
                            <div className="col-lg-5 about_col about_col_left">
                                <div className="about_item">
                                    <div className="about_item_title">
                                        <a href="#">Our Visions</a>
                                    </div>
                                    <div className="about_item_text">
                                        <p>
                                            To develop a religious, innovative
                                            and creative mindset through
                                            learning in school. Meanwhile, our
                                            goal is to provide guidance for our
                                            students in order to achieve the
                                            future helps by the help of our
                                            teachers together with God’s Grace.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 about_col about_col_middle">
                                <div className="about_item">
                                    {/* <div className="about_item_image">
                                        <img src="images/about_2.jpg" alt="" />
                                    </div> */}
                                    <div className="about_item_title">
                                        <a href="#">Our Missions</a>
                                    </div>
                                    <div className="about_item_text">
                                        <p>
                                            To be a second home for the students
                                            where they can learn and train to
                                            become a better person. Second is to
                                            provide facilities for the teachers
                                            and staffs to improve their skills,
                                            professionalism and willing to
                                            serve. Third is to provide a proper
                                            educational platform to develop the
                                            students in both academic and
                                            non-academic.
                                        </p>
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

export default About;
