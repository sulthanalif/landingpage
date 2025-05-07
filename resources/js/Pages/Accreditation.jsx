import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";

const Accreditation = () => {
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
                                            <li>Accreditation</li>
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
                                        Our Accreditation Excellence
                                    </h2>
                                    <div className="section_subtitle">
                                        <p>
                                            Validating our commitment to quality
                                            education through recognized
                                            accreditation
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row feature_row">
                            {/* Feature Content */}
                            <div className="col-lg-3 feature_col">
                                <div className="feature_content">
                                    <div
                                        class="list-group"
                                        id="list-tab"
                                        role="tablist"
                                    >
                                        <a
                                            class="list-group-item list-group-item-action active"
                                            id="list-sma-list"
                                            data-toggle="list"
                                            href="#list-sma"
                                            role="tab"
                                            aria-controls="sma"
                                        >
                                            Senior High School
                                        </a>
                                        <a
                                            class="list-group-item list-group-item-action"
                                            id="list-smp-list"
                                            data-toggle="list"
                                            href="#list-smp"
                                            role="tab"
                                            aria-controls="smp"
                                        >
                                            Junior High School
                                        </a>
                                        <a
                                            class="list-group-item list-group-item-action"
                                            id="list-sd-list"
                                            data-toggle="list"
                                            href="#list-sd"
                                            role="tab"
                                            aria-controls="sd"
                                        >
                                            Elementary School
                                        </a>
                                        <a
                                            class="list-group-item list-group-item-action"
                                            id="list-edexcel-list"
                                            data-toggle="list"
                                            href="#list-edexcel"
                                            role="tab"
                                            aria-controls="edexcel"
                                        >
                                            Edexcel Certificate
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* Feature Video */}
                            <div className="col-lg-9 feature_col">
                                <div className="feature_content">
                                    <div
                                        class="tab-content"
                                        id="nav-tabContent"
                                    >
                                        <div
                                            class="tab-pane fade show active"
                                            id="list-sma"
                                            role="tabpanel"
                                            aria-labelledby="list-sma-list"
                                        >
                                            <img
                                                src="/landing/images/accreditation/akre-sma.jpg"
                                                className="img-fluid"
                                                alt="Accreditation SMA"
                                            />
                                        </div>
                                        <div
                                            class="tab-pane fade"
                                            id="list-smp"
                                            role="tabpanel"
                                            aria-labelledby="list-smp-list"
                                        >
                                            <img
                                                src="/landing/images/accreditation/akre-smp.jpg"
                                                className="img-fluid"
                                                alt="Accreditation SMP"
                                            />
                                        </div>
                                        <div
                                            class="tab-pane fade"
                                            id="list-sd"
                                            role="tabpanel"
                                            aria-labelledby="list-sd-list"
                                        >
                                            <img
                                                src="/landing/images/accreditation/akre-sd.jpg"
                                                className="img-fluid"
                                                alt="Accreditation SD"
                                            />
                                        </div>
                                        <div
                                            class="tab-pane fade"
                                            id="list-edexcel"
                                            role="tabpanel"
                                            aria-labelledby="list-edexcel-list"
                                        >
                                            <img
                                                src="/landing/images/accreditation/sertif-edexcel.jpg"
                                                className="img-fluid"
                                                alt="Sertifikat Edexcel"
                                            />
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

export default Accreditation;
