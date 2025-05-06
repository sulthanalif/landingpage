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
                                        Meet Our Exceptional Educators
                                    </h2>
                                    <div className="section_subtitle">
                                        <p>
                                            Discover our team of certified and
                                            experienced teachers dedicated to
                                            unlocking every student's potential
                                            through personalized guidance and
                                            innovative teaching methods.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row team_row">
                            <TeamItem
                                imgSrc="/landing/images/teacher/ari.JPG"
                                name="ari"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/baginda.JPG"
                                name="baginda"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/beatrice.JPG"
                                name="beatrice"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/benedictus.JPG"
                                name="benedictus"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/bero.JPG"
                                name="bero"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/cindy.JPG"
                                name="cindy"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/dewany.JPG"
                                name="dewany"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/dewi.JPG"
                                name="dewi"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/dian.JPG"
                                name="dian"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/dwi.JPG"
                                name="dwi"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/elsya.JPG"
                                name="elsya"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/emil.JPG"
                                name="emil"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/eriko.JPG"
                                name="eriko"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/ferren.JPG"
                                name="ferren"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/frans.JPG"
                                name="frans"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/fridus.JPG"
                                name="fridus"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/herry.JPG"
                                name="herry"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/indah.JPG"
                                name="indah"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/jaka.JPG"
                                name="jaka"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/juli.JPG"
                                name="juli"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/lena.JPG"
                                name="lena"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/lulu.JPG"
                                name="lulu"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/madya.JPG"
                                name="madya"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/meifang.JPG"
                                name="meifang"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/mia.JPG"
                                name="mia"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/niken.JPG"
                                name="niken"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/novi.JPG"
                                name="novi"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/nurafni.JPG"
                                name="nurafni"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/probo.JPG"
                                name="probo"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/retha.JPG"
                                name="retha"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/retno.JPG"
                                name="retno"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/ricky.JPG"
                                name="ricky"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/risma.JPG"
                                name="risma"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/selfi.JPG"
                                name="selfi"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/septo.JPG"
                                name="septo"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/simamarta.JPG"
                                name="simamarta"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/sri.JPG"
                                name="sri"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/tan.JPG"
                                name="tan"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/there.JPG"
                                name="there"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/tining.JPG"
                                name="tining"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/tri.JPG"
                                name="tri"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/ulfa.JPG"
                                name="ulfa"
                            />
                            <TeamItem
                                imgSrc="/landing/images/teacher/yosef.JPG"
                                name="yosef"
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

const TeamItem = ({ imgSrc, name }) => {
    return (
        <>
            <div className="col-lg-3 col-md-6 team_col">
                <div className="team_item">
                    <div className="team_image">
                        <img src={imgSrc} alt={name} />
                    </div>
                    <div className="team_body">
                        <div className="team_title">
                            <a
                                href={imgSrc}
                                className="text-capitalize"
                                target="_blank"
                            >
                                {name}
                            </a>
                        </div>
                        {/* <div className="team_subtitle">
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
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Teacher;
