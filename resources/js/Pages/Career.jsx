import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";
import CareerItem from "../Components/Pages/CareerItem";
import useApi from "../Hooks/response";

const Career = () => {
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

    const { data: careers, loading, error, get: getCareers } = useApi("careers");

    const handleRefresh = () => {
        getCareers();
    };

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
                                            <li>Career</li>
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
                                        Join To Our Career
                                    </h2>
                                    {/* <div className="section_subtitle">
                                        <p>
                                            Discover our team of certified and
                                            experienced teachers dedicated to
                                            unlocking every student's potential
                                            through personalized guidance and
                                            innovative teaching methods.
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="row features_row">
                            {careers && careers?.careers.map((career) => (
                                <CareerItem key={career.id} career={career} />
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Career;
