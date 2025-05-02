import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";

const Curriculum = () => {
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
                                            <li>Curriculum</li>
                                            <li>Explanation</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <SchoolProgram />

                <OurGoal />
            </Layout>
        </>
    );
};

const SchoolProgram = () => {
    return (
        <>
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
                                    Lia Stephanie Education Programs
                                </h2>
                                <div className="section_subtitle">
                                    <p className="font-italic">
                                        Forming a Generation that Fears God,
                                        Loves Fellow Humans and the Environment,
                                        is Creative, and Entrepreneurial
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row feature_row">
                        {/* Feature Content */}
                        <div className="col-lg-6 feature_col">
                            <div className="feature_content">
                                <h3 className="mb-3">Our Learning Approach</h3>
                                {/* Accordions */}
                                <div className="accordions">
                                    <div className="elements_accordions">
                                        <div className="accordion_container">
                                            <div className="accordion d-flex flex-row align-items-center active">
                                                <div>Integrated Curriculum</div>
                                            </div>
                                            <div className="accordion_panel">
                                                <p>
                                                    Combines the National
                                                    Curriculum with a
                                                    21st-century learning
                                                    approach:{" "}
                                                    <i>
                                                        critical thinking,
                                                        collaboration,
                                                        creativity,
                                                    </i>{" "}
                                                    and
                                                    <i>communication</i>.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="accordion_container">
                                            <div className="accordion d-flex flex-row align-items-center">
                                                <div>
                                                    Technology Integration
                                                </div>
                                            </div>
                                            <div className="accordion_panel">
                                                <p>
                                                    Students are accustomed to
                                                    using digital devices to
                                                    support the learning
                                                    process, from e-learning,
                                                    hybrid classes, to online
                                                    learning platforms.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="accordion_container">
                                            <div className="accordion d-flex flex-row align-items-center">
                                                <div>
                                                    Project-Based Learning
                                                </div>
                                            </div>
                                            <div className="accordion_panel">
                                                <p>
                                                    Trains students to
                                                    understand concepts, solve
                                                    real-world problems, and
                                                    present the results of their
                                                    work independently or in
                                                    teams.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="accordion_container">
                                            <div className="accordion d-flex flex-row align-items-center">
                                                <div>
                                                    Character Education & Global
                                                    Insight
                                                </div>
                                            </div>
                                            <div className="accordion_panel">
                                                <p>
                                                    Through social, religious,
                                                    and international programs,
                                                    we instill moral values and
                                                    foster a global perspective
                                                    in students from an early
                                                    age.
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
                                        backgroundImage: "url(/img/logo.png)",
                                    }}
                                />
                                <a
                                    className="vimeo feature_video_button"
                                    href="https://drive.google.com/file/d/14SY6mxL8ly_iRpHK-a82wyRlOlQGQIJq/view?usp=drive_link"
                                    title="Teaching and Learning Activities (Entrepreneur Got Talent)"
                                    target="_blank"
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
        </>
    );
};

const OurGoal = () => {
    return (
        <>
            <div className="about">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section_title_container text-center">
                                <h2 className="section_title">
                                    Our Goal: Not Just High Scores, But Children
                                    Who Are Ready to Face the World
                                </h2>
                                <div className="section_subtitle">
                                    <p>
                                        Every program is designed so that
                                        students are not only academically
                                        excellent, but also mentally and
                                        socially ready for their future.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row about_row">
                        {/* About Item */}
                        <div className="col-lg-12 about_col about_col_left mb-3">
                            <div className="about_item">
                                <div className="about_item_title">
                                    <p>
                                        <strong>
                                            International Education Program
                                        </strong>
                                        <br />
                                        <small>
                                            <i>
                                                Becoming Part of the World,
                                                Starts from Here
                                            </i>
                                        </small>
                                    </p>
                                </div>
                                <div className="about_item_text">
                                    <p>
                                        At Lia Stephanie, we believe that
                                        quality education equips children for a
                                        global future. Therefore, our
                                        international programs,{" "}
                                        <strong>Edexcel</strong> and
                                        <strong>
                                            International Baccalaureate (IB)
                                        </strong>{" "}
                                        are the main pillars to prepare
                                        academically excellent and
                                        globally-minded students.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 about_col about_col_left card py-4 mx-lg-4">
                            <div className="about_item">
                                <div className="about_item_image">
                                    <img
                                        src="/landing/images/about_1.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="about_item_title">
                                    <p>Edexcel Curriculum</p>
                                    <small className="font-italic">
                                        Academically Challenging British
                                        Curriculum for Global Citizens
                                    </small>
                                </div>
                                <div className="about_item_text">
                                    <p>
                                        Edexcel is a rigorous English curriculum
                                        focused on in-depth mastery of academic
                                        material and relevant skills. Suitable
                                        for students who wish to continue their
                                        education at top world universities.{" "}
                                        <br />
                                        <strong>Key Stages:</strong>
                                        <ul>
                                            <li>
                                                <strong>
                                                    Lower Secondary (Key Stage
                                                    3)
                                                </strong>
                                                – Ages 11-14 years
                                            </li>
                                            <li>
                                                <strong>
                                                    IGCSE (Key Stage 4)
                                                </strong>
                                                – Ages 14-16 years
                                            </li>
                                            <li>
                                                <strong>
                                                    A-Level (Key Stage 5)
                                                </strong>
                                                – Ages 16-18 years
                                            </li>
                                        </ul>
                                        <strong>Edexcel Advantages:</strong>
                                        <ul>
                                            <li>
                                                Relevant and well-structured
                                                learning materials
                                            </li>
                                            <li>
                                                Internationally benchmarked
                                                assessment
                                            </li>
                                            <li>
                                                Focus on analytical and academic
                                                skills
                                            </li>
                                            <li>
                                                Recognized by over 150 countries
                                                and leading universities
                                            </li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 about_col about_col_left card py-4 mx-lg-4">
                            <div className="about_item">
                                <div className="about_item_image">
                                    <img
                                        src="/landing/images/about_1.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="about_item_title">
                                    <p>
                                        International Baccalaureate (IB)
                                        Programme
                                    </p>
                                    <small className="font-italic">
                                        A Holistic Education that Develops
                                        Inquirers, Thinkers, Communicators, and
                                        Caring Individuals
                                    </small>
                                </div>
                                <div className="about_item_text">
                                    <p>
                                        The IB Programme is known for its
                                        emphasis on inquiry, life skills, and
                                        global social awareness. We offer the
                                        following IB programmes:
                                        <ul>
                                            <li>
                                                <strong>
                                                    Primary Years Programme
                                                    (PYP)
                                                </strong>
                                                – Ages 3-12 years
                                            </li>
                                            <li>
                                                <strong>
                                                    Middle Years Programme (MYP)
                                                </strong>
                                                – Ages 11-16 years
                                            </li>
                                            <li>
                                                <strong>
                                                    Diploma Programme (DP)
                                                </strong>
                                                – Ages 16-19 years
                                            </li>
                                        </ul>
                                        <strong>IB Philosophy:</strong>
                                        <ul>
                                            <li>
                                                <i>Inquiry-based learning</i>
                                                (student-centered, based on
                                                curiosity)
                                            </li>
                                            <li>
                                                Focus on developing inquiring,
                                                reflective, and caring learners
                                            </li>
                                            <li>
                                                Emphasis on interdisciplinary
                                                learning in science, social
                                                studies, and humanities
                                            </li>
                                            <li>
                                                Posters
                                                international-mindedness,
                                                empathy, and global
                                                responsibility
                                            </li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 about_col about_col_left">
                            <div className="about_item">
                                <div className="about_item_title">
                                    <p>
                                        Two Pathways, One Goal: The Best Future
                                        for Your Child
                                    </p>
                                </div>
                                <div className="about_item_text">
                                    <p>
                                        Just like the Edexcel and IB pathways,
                                        we aim for students to become lifelong
                                        learners, globally competitive, and
                                        possess strong moral values in their
                                        lives.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Curriculum;
