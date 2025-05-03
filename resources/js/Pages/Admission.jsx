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

                <Guidelines />

                <SchoolVisit />

                <TuitionFees />

                <SimulationFees />
            </Layout>
        </>
    );
};

const Guidelines = () => {
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
                                    Admission Guidelines
                                </h2>
                                {/* <div className="section_subtitle">
                                        <p>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Donec
                                            vel gravida arcu. Vestibulum
                                            feugiat, sapien ultrices fermentum
                                            congue, quam velit venenatis sem
                                        </p>
                                    </div> */}
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
                                                    Filling Out the Registration
                                                    Form
                                                </div>
                                            </div>
                                            <div className="accordion_panel">
                                                <p>
                                                    Fill out the registration
                                                    form online via our website
                                                    or by coming directly to the
                                                    school administration
                                                    office.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="accordion_container">
                                            <div className="accordion d-flex flex-row align-items-center">
                                                <div>
                                                    Uploading Supporting
                                                    Documents
                                                </div>
                                            </div>
                                            <div className="accordion_panel">
                                                <p>
                                                    <ul>
                                                        <li>
                                                            Birth certificate
                                                        </li>
                                                        <li>
                                                            Parent/guardian ID
                                                            card
                                                        </li>
                                                        <li>
                                                            Latest report
                                                            card/transcript
                                                        </li>
                                                        <li>
                                                            Recent photograph
                                                        </li>
                                                    </ul>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="accordion_container">
                                            <div className="accordion d-flex flex-row align-items-center">
                                                <div>
                                                    Interview & Student
                                                    Observation Schedule
                                                    (Written Test)
                                                </div>
                                            </div>
                                            <div className="accordion_panel">
                                                <p>
                                                    Our team will arrange an
                                                    observation or written test
                                                    according to the level of
                                                    education being entered, as
                                                    well as a brief interview
                                                    with prospective students
                                                    and their parents/guardians.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="accordion_container">
                                            <div className="accordion d-flex flex-row align-items-center">
                                                <div>
                                                    Announcement of Selection
                                                    Results
                                                </div>
                                            </div>
                                            <div className="accordion_panel">
                                                <p>
                                                    Selection results will be
                                                    announced via email within
                                                    3-5 working days after the
                                                    interview/observation.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="accordion_container">
                                            <div className="accordion d-flex flex-row align-items-center">
                                                <div>
                                                    Registration & Payment
                                                    Process
                                                </div>
                                            </div>
                                            <div className="accordion_panel">
                                                <p>
                                                    If accepted,
                                                    parents/guardians will
                                                    receive details regarding
                                                    tuition fees and the payment
                                                    procedure. Registration is
                                                    considered complete after
                                                    all administrative matters
                                                    have been finalized.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="accordion_container">
                                            <div className="accordion d-flex flex-row align-items-center">
                                                <div>
                                                    Orientation for Students &
                                                    Parents
                                                </div>
                                            </div>
                                            <div className="accordion_panel">
                                                <p>
                                                    Prospective students and
                                                    their parents/guardians will
                                                    attend an orientation
                                                    session to learn about the
                                                    school environment, learning
                                                    system, and our school
                                                    community.
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
                                        backgroundImage: "url(img/logo.png)",
                                    }}
                                />
                                <a
                                    className="vimeo feature_video_button"
                                    href="https://drive.google.com/file/d/1BhaAAwv7EYI25llurS_OqPZcSGP0EL2n/view?usp=drive_link"
                                    title="Teaching and Learning Activities (Entrepreneur Got Talent)"
                                    target="_blank"
                                >
                                    <img
                                        src="/landing/images/play.png"
                                        alt=""
                                    />
                                </a>
                            </div>
                            <div className="feature-content mt-2">
                                <div className="feature_note">
                                    <h4>Important Notes</h4>
                                    <p>
                                        <ul>
                                            <li>
                                                Registration is open throughout
                                                the year as long as quotas are
                                                available for each level.
                                            </li>
                                            <li>
                                                Priority is given to transfer
                                                students from schools with a
                                                similar curriculum (IB/Edexcel).
                                            </li>
                                            <li>
                                                All selection processes consider
                                                the academic potential and
                                                socio-emotional readiness of
                                                students.
                                            </li>
                                        </ul>
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

const SchoolVisit = () => {
    return (
        <>
            <div className="newsletter">
                <div
                    className="newsletter_background parallax-window"
                    style={{
                        backgroundImage: `url('landing/images/newsletter.jpg')`,
                        backgroundAttachment: "fixed",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="newsletter_container d-flex flex-lg-row flex-column align-items-center justify-content-start">
                                {/* Newsletter Content */}
                                <div className="newsletter_content text-lg-left text-center">
                                    <div className="newsletter_title">
                                        Schedule a School Visit
                                    </div>
                                    <div className="newsletter_subtitle">
                                        We encourage prospective parents to take
                                        a school tour before registering.
                                        Contact our admissions team at
                                        0811-8880-678 or email
                                        marketing@lscs.sch.id for more
                                        information.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const TuitionFees = () => {
    return (
        <>
            <div className="about">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section_title_container text-center">
                                <h2 className="section_title">Tuition Fees</h2>
                                <div className="section_subtitle">
                                    <p>
                                        The Best Investment for Your Child's
                                        Future
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row about_row">
                        <div className="col-lg-12 about_col about_col_left">
                            <div className="about_item">
                                <div className="about_item_text">
                                    <p>
                                        At Lia Stephanie, we understand that
                                        choosing an education is a significant
                                        decision for every family. Therefore, we
                                        are committed to providing transparency
                                        and flexibility in our fee structure, so
                                        you can plan your child's education
                                        carefully.
                                        <br />
                                        The listed fees reflect the quality of
                                        education, adequate facilities, and a
                                        learning environment that fosters the
                                        academic, emotional, and character
                                        development of students.
                                    </p>
                                    <h4 className="text-center py-4">
                                        <strong>Tuition Fee Structure for the 2025/2026 Academic Year</strong>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        {/* About Item */}
                        <div className="col-lg-6 about_col about_col_left">
                            <div className="about_item">
                                <div className="about_item_image">
                                    <img
                                        src="/landing/images/national-program.png"
                                        alt=""
                                    />
                                </div>
                                <div className="about_item_title text-center">
                                    <a
                                        href="/landing/images/national-program.png"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        National Program{" "}
                                        <strong>(Edexcel)</strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 about_col about_col_left">
                            <div className="about_item">
                                <div className="about_item_image">
                                    <img
                                        src="/landing/images/global-program.png"
                                        alt=""
                                    />
                                </div>
                                <div className="about_item_title text-center">
                                    <a
                                        href="/landing/images/global-program.png"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Global Program{" "}
                                        <strong>(IB Curricula)</strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 about_col about_col_left">
                            <div className="about_item">
                                <div className="about_item_title">
                                    <p>Payment Flexibility</p>
                                </div>
                                <div className="about_item_text">
                                    <p>
                                        We offer various payment methods (bank
                                        transfer, credit card, installments
                                        through select financial partners). Our
                                        administration team is ready to assist
                                        you in arranging the most suitable
                                        payment plan.
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

const SimulationFees = () => {
    return (
        <>
            <div className="newsletter">
                <div
                    className="newsletter_background parallax-window"
                    style={{
                        backgroundImage: `url('landing/images/newsletter.jpg')`,
                        backgroundAttachment: "fixed",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="newsletter_container d-flex flex-lg-row flex-column align-items-center justify-content-start">
                                {/* Newsletter Content */}
                                <div className="newsletter_content text-lg-left text-center">
                                    <div className="newsletter_title">
                                        Need a Fee Simulation?
                                    </div>
                                    <div className="newsletter_subtitle">
                                        Our Admissions team is ready to help you
                                        with cost estimates and schedule a
                                        consultation.
                                    </div>
                                </div>
                                <div className="newsletter_form_container ml-lg-auto">
                                    <div className="newsletter_form d-flex flex-row align-items-center justify-content-end">
                                        <button
                                            type="button"
                                            className="newsletter_button"
                                            onClick={() => {
                                                window.open(
                                                    "https://wa.me/+628118880678",
                                                    "_blank",
                                                    "noopener,noreferrer"
                                                );
                                            }}
                                        >
                                            <i
                                                className="fa fa-whatsapp mr-2"
                                                aria-hidden="true"
                                            />
                                            Call Us
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admission;
