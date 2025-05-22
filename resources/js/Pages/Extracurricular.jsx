import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";
import useApi from "../Hooks/response";

const Extracurricular = () => {
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
        data: extracurriculars,
        loading,
        error,
        get: getExtracurriculars,
    } = useApi("extra");

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
                                            <li>Extracurricular</li>
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
                                        Explore Your Passions
                                    </h2>
                                    <div className="section_subtitle">
                                        <p>
                                            Complementing academic excellence
                                            with skill development
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-5">
                            {loading ? (
                                <div className="col-12 text-center py-5">
                                    <div
                                        className="spinner-border text-primary"
                                        role="status"
                                    >
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="col-12 text-center py-5">
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                </div>
                            ) : extracurriculars &&
                              extracurriculars.extracurriculars.length > 0 ? (
                                extracurriculars.extracurriculars.map(
                                    (extra) => (
                                        <div className="col-lg-4 mb-4 d-flex" key={extra.id}>
                                            <div className="card about_item px-3 pb-3 flex-grow-1">
                                                <div className="about_item_image">
                                                    <img
                                                        src={`/storage/${extra.image}`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="about_item_title">
                                                    <p className="text-center">
                                                        {extra.name}
                                                    </p>
                                                </div>
                                                <div className="about_item_text">
                                                    <p
                                                        className="text-justify"
                                                        dangerouslySetInnerHTML={{
                                                            __html: extra.description,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <div className="col-12 text-center py-5">
                                    <div className="alert alert-info">
                                        No extracurriculars data available
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Extracurricular;
