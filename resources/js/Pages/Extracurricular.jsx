import React, { useEffect } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";

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
                            <div className="col-lg-4 mb-4">
                                <div className="about_item card px-3 pb-3">
                                    <div className="about_item_image">
                                        <img
                                            src="/landing/images/extracurricular/basket.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="about_item_title">
                                        <p className="text-center">Basketball</p>
                                    </div>
                                    <div className="about_item_text">
                                        <p className="text-justify">
                                            The basketball extracurricular
                                            program serves as a platform for
                                            students with interest and talent in
                                            basketball. This program not only
                                            aims to develop technical skills
                                            like dribbling, passing, and
                                            shooting, but also instills values
                                            of sportsmanship, teamwork, and
                                            discipline. Through regular training
                                            and friendly matches, students are
                                            encouraged to grow into resilient,
                                            confident athletes with a champion's
                                            mentality.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <div className="about_item card px-3 pb-3">
                                    <div className="about_item_image">
                                        <img
                                            src="/landing/images/edexcel.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="about_item_title">
                                        <p className="text-center">Futsal</p>
                                    </div>
                                    <div className="about_item_text">
                                        <p className="text-justify">
                                            Futsal is one of the most popular
                                            extracurricular activities among
                                            students. In this program, students
                                            train to develop futsal skills
                                            including basic techniques, game
                                            strategies, and teamwork. Beyond
                                            improving physical fitness, futsal
                                            teaches the importance of
                                            solidarity, mental toughness, and
                                            healthy competitive spirit. This
                                            activity provides the perfect outlet
                                            for students' energy and sports
                                            talents.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <div className="about_item card px-3 pb-3">
                                    <div className="about_item_image">
                                        <img
                                            src="/landing/images/edexcel.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="about_item_title">
                                        <p className="text-center">Art and Craft</p>
                                    </div>
                                    <div className="about_item_text">
                                        <p className="text-justify">
                                            Art and Craft is an extracurricular
                                            program that offers unlimited
                                            creative space for students. Here,
                                            students learn various handicraft
                                            techniques such as origami,
                                            upcycling crafts, decoupage, and
                                            other 3D art forms. This activity
                                            not only sharpens fine motor skills
                                            and imagination, but also cultivates
                                            patience, attention to detail, and
                                            creative confidence. Each artwork
                                            reflects students' unique expression
                                            and creativity.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <div className="about_item card px-3 pb-3">
                                    <div className="about_item_image">
                                        <img
                                            src="/landing/images/extracurricular/painting.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="about_item_title">
                                        <p className="text-center">Painting</p>
                                    </div>
                                    <div className="about_item_text">
                                        <p className="text-justify">
                                            In the Painting extracurricular,
                                            students explore the world of colors
                                            and forms through various painting
                                            media. Using techniques like
                                            watercolor, acrylic, and pastel,
                                            students develop their visual and
                                            artistic abilities. This program
                                            provides a space for students to
                                            express emotions, ideas, and
                                            perspectives through meaningful
                                            artworks. Painting not only builds
                                            aesthetic appreciation but also
                                            enriches creative and original
                                            thinking.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <div className="about_item card px-3 pb-3">
                                    <div className="about_item_image">
                                        <img
                                            src="/landing/images/edexcel.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="about_item_title">
                                        <p className="text-center">Choir</p>
                                    </div>
                                    <div className="about_item_text">
                                        <p className="text-justify">
                                            Choir is an extracurricular activity
                                            for students with interest in vocal
                                            music. Participants learn to sing
                                            harmoniously in groups, understand
                                            vocal techniques, read musical
                                            scores, and perform confidently in
                                            public. Through choir, students
                                            learn about cooperation, discipline,
                                            and artistic sensitivity. The
                                            program also fosters togetherness
                                            and appreciation for musical arts.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <div className="about_item card px-3 pb-3">
                                    <div className="about_item_image">
                                        <img
                                            src="/landing/images/edexcel.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="about_item_title">
                                        <p className="text-center">Robotics (Kindergarten)</p>
                                    </div>
                                    <div className="about_item_text">
                                        <p className="text-justify">
                                            The Robotics extracurricular for
                                            kindergarteners introduces
                                            technology and science in fun,
                                            engaging ways. Through simple
                                            activities like assembling toy
                                            robots, recognizing shapes and
                                            colors, and learning basic
                                            instructions, children develop
                                            creative and logical thinking from
                                            an early age. This program helps
                                            train fine motor skills,
                                            concentration, and problem-solving
                                            abilities through play. With teacher
                                            guidance, children learn while
                                            exploring the exciting, imaginative
                                            world of basic robotics!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <div className="about_item card px-3 pb-3">
                                    <div className="about_item_image">
                                        <img
                                            src="/landing/images/extracurricular/dance.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="about_item_title">
                                        <p className="text-center">Modern Dance</p>
                                    </div>
                                    <div className="about_item_text">
                                        <p className="text-justify">
                                            Modern Dance serves as a creative
                                            and dynamic form of self-expression.
                                            Students explore various dance
                                            styles like hip hop, K-pop, and
                                            contemporary, while developing
                                            choreography and stage performance
                                            skills. Through regular practice and
                                            performances at school events or
                                            competitions, students not only
                                            refine their dancing abilities but
                                            also learn teamwork, discipline, and
                                            stage confidence. Modern dance
                                            provides teenagers a space to
                                            develop talents, strengthen positive
                                            character traits, and build
                                            self-confidence in a fun, supportive
                                            environment.
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

export default Extracurricular;
