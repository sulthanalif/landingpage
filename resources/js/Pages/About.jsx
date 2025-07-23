import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";
import useApi from "../Hooks/response";

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

                <HistorySection />

                <ValueSection />

                <CoreValueSection />

                <AdvantageSection />
            </Layout>
        </>
    );
};

const HistorySection = () => {
    return (
        <div className="features pt-5">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="section_title_container text-center">
                            <h2 className="section_title">
                                About Us
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="row features_row mt-3">
                    <div className="col-lg-6">
                        <img
                            src="/landing/images/our_history.png"
                            alt=""
                            loading="lazy"
                            className="img-fluid mx-auto d-block"
                        />
                    </div>
                    <div className="col-lg-6 feature_col">
                        <div className="feature trans_400 py-5">
                            <h2 className="feature_title">
                                Lia Stephanie School Profile: Cultivating Character and Faith for a Bright Future
                            </h2>
                            <hr className="feature_line" />
                            <div className="feature_text mt-3 text-justify">
                                <p>
                                    Lia Stephanie School, a dedicated educational institution under the auspices of the Lia Stephanie Education Foundation, is committed to providing quality education focused on the academic, character, and spiritual development of students. Strategically located at Taman Surya V Blok EE2 No. 20-27, Pegadungan, Kalideres District, West Jakarta, the school offers a conducive and inspiring learning environment for its students. With the motto "Cultivate Character, Nurture Faith," Lia Stephanie School is committed to being a second home for students, a place where they can learn and grow into better individuals. This institution also strives to provide the right educational platform to develop students' potential both academically and non-academically, as well as to enhance the professionalism of teachers and staff.
                                </p>
                            </div>
                            <h2 className="feature_title mt-5">
                                History and Development
                            </h2>
                            <hr className="feature_line" />
                            <div className="feature_text mt-3 text-justify">
                                <p>
                                    Founded in 1999, Lia Stephanie School began its journey by focusing on early childhood education. Along with increasing public trust and the need for continuous quality education, the school developed rapidly. The Primary School (SD) level began operations around 2003-2004, followed by the establishment of the Junior High School (SMP) and Senior High School (SMA) in 2009. To answer global challenges, SDS Lia Stephanie Global School was then established in 2019, offering an international curriculum.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ValueSection = () => {
    return (
        <div className="about">
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
                                Vision, Mission, and Values
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
                <div className="row features_row">
                    <div className="col-lg-6 pb-3">
                        <div className="card feature-card h-100 border-0 shadow-sm mx-2 py-3">
                            <div className="card-body text-center p-4">
                                <h3 className="feature-title h5 mb-3">
                                    Our Vision
                                </h3>
                                <p className="feature-text mb-0 text-justify font-italic">
                                    "To produce the nation's successors who bring change to the world with a global perspective, entrepreneurial spirit, and character in the Catholic faith."
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 pb-3">
                        <div className="card feature-card h-100 border-0 shadow-sm mx-2 py-3">
                            <div className="card-body text-center p-4">
                                <h3 className="feature-title h5 mb-3">
                                    Our Mission
                                </h3>
                                <ul className="feature-text mb-0 text-justify feature_list_number">
                                    <li>Developing students' talents to become creative, innovative, and resilient individuals for the glory of God, through an open curriculum and life-skill development.</li>
                                    <li>Arousing Pancasila values in students, for the creation of a caring, tolerant, and well-mannered society through P5 learning.</li>
                                    <li>Forming innovative, transformative, creative, and critical students through an open learning system between students and teaching staff.</li>
                                    <li>Cultivating resilience and ethical values of integrity in students through transformative learning integrated with intellectual, spiritual, and emotional intelligence.</li>
                                    <li>Becoming the school of choice for students that offers real community learning experiences in society, keeping up with the times.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 pb-3">
                        <div className="card feature-card h-100 border-0 shadow-sm mx-2 py-3">
                            <div className="card-body text-center p-4">
                                <h3 className="feature-title h5 mb-3">
                                    Our Objectives
                                </h3>
                                <ul className="feature-text mb-0 text-justify feature_list_number">
                                    <li>To become an Entrepreneurial School that creates resilient students and provides solutions to the community in facing changing times.</li>
                                    <li>To provide integrated and realistic education for students to find their passion, identity, and life purpose.</li>
                                    <li>To produce world-class students who still maintain Catholic and apostolic human values and have a high national spirit.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 pb-3">
                        <div className="card feature-card h-100 border-0 shadow-sm mx-2 py-3">
                            <div className="card-body text-center p-4">
                                <h3 className="feature-title h5 mb-3">
                                    Our Values
                                </h3>
                                <ul className="feature-text mb-0 text-justify feature_list_circle">
                                    <li><strong>E</strong>ncouraging students to become the best version of themselves</li>
                                    <li><strong>N</strong>ourishing every student's development</li>
                                    <li><strong>T</strong>idy and disciplined</li>
                                    <li><strong>R</strong>especting everyone</li>
                                    <li><strong>E</strong>laborating every program with vendors</li>
                                    <li><strong>P</strong>utting God first in everyday life</li>
                                    <li><strong>R</strong>esponsible in all works I do</li>
                                    <li><strong>E</strong>xcellent in every responsibility I am trusted</li>
                                    <li><strong>N</strong>ever delaying what needs to be done</li>
                                    <li><strong>E</strong>veryone is important regardless of age and position in our school</li>
                                    <li><strong>U</strong>nity and diversity</li>
                                    <li><strong>R</strong>eason in every action I make</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CoreValueSection = () => {
    return (
        <div className="about">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="section_title_container text-center">
                            <h2 className="section_title">
                                Core Values
                            </h2>
                            <div className="section_subtitle">
                                <p>
                                    Lia Stephanie School upholds the values of
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-3 pb-3">
                        <div className="card feature-card h-100 border-0 shadow-sm mx-2">
                            <div className="card-body text-center p-4">
                                <div className="feature-icon mb-4">
                                    <img
                                        src="/landing/images/icon_value1.png"
                                        alt="caption"
                                        loading="lazy"
                                        className="img-fluid"
                                        style={{ height: "60px" }}
                                    />
                                </div>
                                <h3 className="feature-title h5 mb-3">
                                    Quality of Education
                                </h3>
                                <p className="feature-text mb-0">
                                    Providing the best educational standards.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 pb-3">
                        <div className="card feature-card h-100 border-0 shadow-sm mx-2">
                            <div className="card-body text-center p-4">
                                <div className="feature-icon mb-4">
                                    <img
                                        src="/landing/images/icon_value2.png"
                                        alt="caption"
                                        loading="lazy"
                                        className="img-fluid"
                                        style={{ height: "60px" }}
                                    />
                                </div>
                                <h3 className="feature-title h5 mb-3">
                                    Innovation
                                </h3>
                                <p className="feature-text mb-0">
                                    Continuously innovating in teaching and learning methods.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 pb-3">
                        <div className="card feature-card h-100 border-0 shadow-sm mx-2">
                            <div className="card-body text-center p-4">
                                <div className="feature-icon mb-4">
                                    <img
                                        src="/landing/images/icon_value3.png"
                                        alt="caption"
                                        loading="lazy"
                                        className="img-fluid"
                                        style={{ height: "60px" }}
                                    />
                                </div>
                                <h3 className="feature-title h5 mb-3">
                                    Integrity & Responsibility
                                </h3>
                                <p className="feature-text mb-0">
                                    Instilling honesty and a sense of responsibility.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 pb-3">
                        <div className="card feature-card h-100 border-0 shadow-sm mx-2">
                            <div className="card-body text-center p-4">
                                <div className="feature-icon mb-4">
                                    <img
                                        src="/landing/images/icon_value4.png"
                                        alt="caption"
                                        loading="lazy"
                                        className="img-fluid"
                                        style={{ height: "60px" }}
                                    />
                                </div>
                                <h3 className="feature-title h5 mb-3">
                                    Spirituality
                                </h3>
                                <p className="feature-text mb-0">
                                    Developing students' spiritual side.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AdvantageSection = () => {
    const { data: facilities, get: getFacilities } = useApi("facilities");

    useEffect(() => {
        getFacilities();
    }, []);

    return (
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
                                School Facilities
                            </h2>
                            <div className="section_subtitle">
                                <p>
                                    To support optimal teaching and learning processes, Lia Stephanie School provides various adequate facilities, including
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    {facilities?.facilities.map((facility) => (
                        <div className="col-lg-4 pb-3" key={facility.id}>
                            <div className="card feature-card h-100 border-0 shadow-sm mx-2">
                                <div className="card-body text-center p-4">
                                    <div className="feature-image mb-4">
                                        <img
                                            src={facility.image ? `storage/${facility.image}` : "/landing/images/facilities/icon_classroom.png"}
                                            alt={facility.title}
                                            loading="lazy"
                                            className="img-fluid"
                                            style={{ height: "200px" }}
                                        />
                                    </div>
                                    <h3 className="feature-title h5 mb-3">
                                        {facility.title}
                                    </h3>
                                    <p className="feature-text mb-0">
                                        {facility.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row features_row my-5">
                    <div className="col-lg-6 pb-3">
                        <div className="card feature-card h-100 border-0 shadow-sm mx-2 py-3">
                            <div className="card-body text-center p-4">
                                <h3 className="feature-title h5 mb-3">
                                    Flagship Programs
                                </h3>
                                <ul className="feature-text mb-0 text-justify feature_list_circle">
                                    <li>Comprehensive and competency-based curriculum.</li>
                                    <li>Diverse extracurricular programs, such as sports, arts, and science clubs.</li>
                                    <li>Character and leadership development activities.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 pb-3">
                        <div className="card feature-card h-100 border-0 shadow-sm mx-2 py-3">
                            <div className="card-body text-center p-4">
                                <h3 className="feature-title h5 mb-3">
                                    Advantages
                                </h3>
                                <ul className="feature-text mb-0 text-justify feature_list_circle">
                                    <li>Conducive and supportive learning environment.</li>
                                    <li>Qualified and experienced teachers.</li>
                                    <li>Focus on student character and skill development.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
