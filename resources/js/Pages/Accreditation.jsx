import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";
import useApi from "../Hooks/response";

const Accreditation = () => {
    const [activeTab, setActiveTab] = useState(null);

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

    const {
        data: accreditations,
        loading,
        error,
        get: getAccreditations,
    } = useApi("accreditations");

    useEffect(() => {
        if (accreditations?.accreditations?.length > 0 && activeTab === null) {
            setActiveTab(accreditations.accreditations[0].id);
        }
    }, [accreditations, activeTab]);

    const handleRefresh = () => {
        getAccreditations();
    };

    return (
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
                        {loading ? (
                            <div className="col-12 text-center py-5">
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                >
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="col-12 text-center py-5">
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            </div>
                        ) : accreditations &&
                          accreditations.accreditations.length > 0 ? (
                            <>
                                <div className="col-lg-3 feature_col mt-lg-3">
                                    <div className="feature_content">
                                        <div
                                            className="list-group"
                                            id="list-tab"
                                            role="tablist"
                                        >
                                            {accreditations.accreditations.map(
                                                (accreditation) => (
                                                    <a
                                                        key={accreditation.id}
                                                        className={`list-group-item list-group-item-action ${
                                                            activeTab ===
                                                            accreditation.id
                                                                ? "active"
                                                                : ""
                                                        }`}
                                                        id={`list-${accreditation.id}-list`}
                                                        data-toggle="list"
                                                        href={`#list-${accreditation.id}`}
                                                        role="tab"
                                                        aria-controls={
                                                            accreditation.id
                                                        }
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setActiveTab(
                                                                accreditation.id
                                                            );
                                                        }}
                                                    >
                                                        {accreditation.title}
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-9 feature_col">
                                    <div className="feature_content">
                                        <div
                                            className="tab-content"
                                            id="nav-tabContent"
                                        >
                                            {accreditations.accreditations.map(
                                                (accreditation) => (
                                                    <div
                                                        key={accreditation.id}
                                                        className={`tab-pane fade ${
                                                            activeTab ===
                                                            accreditation.id
                                                                ? "show active"
                                                                : ""
                                                        }`}
                                                        id={`list-${accreditation.id}`}
                                                        role="tabpanel"
                                                        aria-labelledby={`list-${accreditation.id}-list`}
                                                    >
                                                        <div className="feature_note">
                                                            <h3 className="card-title">
                                                                {
                                                                    accreditation.title
                                                                }
                                                            </h3>
                                                            <p className="card-text">
                                                                {
                                                                    accreditation.description
                                                                }
                                                            </p>
                                                            <img
                                                                src={`/storage/${accreditation.file}`}
                                                                className="img-fluid"
                                                                alt={
                                                                    accreditation.title
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="col-12 text-center py-5">
                                <div className="alert alert-secondary font-weight-bold h3">
                                    No accreditation data available
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Accreditation;
