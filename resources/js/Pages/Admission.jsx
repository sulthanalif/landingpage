import React, { useEffect, useRef, useState } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import "datatables.net-responsive";
import "datatables.net-select";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "datatables.net-select-dt/css/select.dataTables.min.css";
import TuitionFees from "../Components/Pages/TuitionFees";
import FloatingRegister from "../Components/Pages/FloatingRegister";

DataTable.use(DT);

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

                <div className="about">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="section_title_container text-center">
                                    <h2 className="section_title">
                                        Tuition Fees
                                    </h2>
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
                            <TuitionFees />

                            <div className="col-lg-12 about_col about_col_left">
                                <div className="about_item">
                                    <div className="about_item_title">
                                        <p>Payment Flexibility</p>
                                    </div>
                                    <div className="about_item_text">
                                        <p>
                                            We offer various payment methods
                                            (bank transfer, credit card,
                                            installments through select
                                            financial partners). Our
                                            administration team is ready to
                                            assist you in arranging the most
                                            suitable payment plan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <SimulationFees />

                <FloatingRegister />
            </Layout>
        </>
    );
};

const Guidelines = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        setIsPlaying(true);
    }, []);

    const handlePlayClick = () => {
        setIsPlaying(true);
    };

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
                                                <ul>
                                                    <li>Birth certificate</li>
                                                    <li>
                                                        Parent/guardian ID card
                                                    </li>
                                                    <li>
                                                        Latest report
                                                        card/transcript
                                                    </li>
                                                    <li>Recent photograph</li>
                                                </ul>
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
                            {!isPlaying ? (
                                <>
                                    <div className="feature_video d-flex flex-column align-items-center justify-content-center">
                                        <div
                                            className="feature_video_background"
                                            style={{
                                                backgroundImage:
                                                    "url(img/logo-content.png)",
                                            }}
                                        />
                                        <button
                                            onClick={handlePlayClick}
                                            className="vimeo feature_video_button"
                                            title="Teaching and Learning Activities (Entrepreneur Got Talent)"
                                            aria-label="Play video"
                                            style={{
                                                cursor: "pointer",
                                                zIndex: 1,
                                                transition:
                                                    "transform 0.3s ease",
                                                background: "none",
                                                border: "none",
                                            }}
                                        >
                                            <img
                                                src="/landing/images/play.png"
                                                alt="Play button"
                                            />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="video-container">
                                    <iframe
                                        ref={videoRef}
                                        width="100%"
                                        height="350"
                                        src="https://www.youtube.com/embed/qyDALPmpyv0?autoplay=1"
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                            <div className="feature-content mt-2">
                                <div className="feature_note">
                                    <h4>Important Notes</h4>
                                    <ul>
                                        <li>
                                            Registration is open throughout the
                                            year as long as quotas are available
                                            for each level.
                                        </li>
                                        <li>
                                            Priority is given to transfer
                                            students from schools with a similar
                                            curriculum (IB/Edexcel).
                                        </li>
                                        <li>
                                            All selection processes consider the
                                            academic potential and
                                            socio-emotional readiness of
                                            students.
                                        </li>
                                    </ul>
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
