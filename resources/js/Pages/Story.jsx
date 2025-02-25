import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import Layout from "../Components/Layout";

const Story = () => {
    useEffect(() => {
        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.type = "text/css";
        link1.href = "/landing/styles/blog.css";

        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.type = "text/css";
        link2.href = "/landing/styles/blog_responsive.css";

        const link3 = document.createElement("link");
        link3.rel = "stylesheet";
        link3.type = "text/css";
        link3.href = "/landing/plugins/video-js/video-js.css";

        document.head.appendChild(link1);
        document.head.appendChild(link2);
        document.head.appendChild(link3);

        const script1 = document.createElement("script");
        script1.src = "/landing/js/blog.js";
        script1.async = true;

        const script2 = document.createElement("script");
        script2.src = "/landing/plugins/video-js/video.min.js";
        script2.async = true;

        const script3 = document.createElement("script");
        script3.src = "/landing/plugins/masonry/masonry.js";
        script3.async = true;
        
        document.body.appendChild(script1);
        document.body.appendChild(script2);
        document.body.appendChild(script3);

        return () => {
            document.head.removeChild(link1);
            document.head.removeChild(link2);
            document.head.removeChild(link3);
            document.body.removeChild(script1);
            document.body.removeChild(script2);
            document.body.removeChild(script3);
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
                                            <li>Story</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="blog">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="blog_post_container">
                                    {/* Blog Post */}
                                    <div className="blog_post trans_200">
                                        <div className="blog_post_image">
                                            <img
                                                src="/landing/images/event_1.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="blog_post_body">
                                            <div className="blog_post_title">
                                                <a href="blog_single.html">
                                                    Here’s What You Need to Know
                                                    About Online Testing
                                                </a>
                                            </div>
                                            <div className="blog_post_meta">
                                                <ul>
                                                    <li>
                                                        <a href="#">admin</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            november 11, 2017
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="blog_post_text">
                                                <p>
                                                    Policy analysts generally
                                                    agree on a need for reform,
                                                    but not on which path
                                                    policymakers should take...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Blog Post */}
                                    <div className="blog_post trans_200">
                                        <div className="blog_post_body">
                                            <div className="blog_post_title">
                                                <a href="blog_single.html">
                                                    With Changing Students and
                                                    Times
                                                </a>
                                            </div>
                                            <div className="blog_post_meta">
                                                <ul>
                                                    <li>
                                                        <a href="#">admin</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            november 11, 2017
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="blog_post_text">
                                                <p>
                                                    Policy analysts generally
                                                    agree on a need for reform,
                                                    but not on which path
                                                    policymakers should take...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Blog Post */}
                                    <div className="blog_post trans_200">
                                        <div className="blog_post_video_container">
                                            <video
                                                className="blog_post_video video-js"
                                                data-setup='{"controls": true, "autoplay": false, "preload": "auto", "poster": "/landing/images/event_2.jpg"}'
                                            >
                                                <source
                                                    src="images/mov_bbb.mp4"
                                                    type="video/mp4"
                                                />
                                                <source
                                                    src="images/mov_bbb.ogg"
                                                    type="video/ogg"
                                                />
                                                Your browser does not support
                                                HTML5 video.
                                            </video>
                                        </div>
                                        <div className="blog_post_body">
                                            <div className="blog_post_title">
                                                <a href="blog_single.html">
                                                    Building Skills Outside the
                                                    Classroom With New Ways
                                                </a>
                                            </div>
                                            <div className="blog_post_meta">
                                                <ul>
                                                    <li>
                                                        <a href="#">admin</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            november 11, 2017
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="blog_post_text">
                                                <p>
                                                    Policy analysts generally
                                                    agree on a need for reform,
                                                    but not on which path
                                                    policymakers should take...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Blog Post */}
                                    <div className="blog_post trans_200">
                                        <div className="blog_post_image">
                                            <img
                                                src="/landing/images/event_2.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="blog_post_body">
                                            <div className="blog_post_title">
                                                <a href="blog_single.html">
                                                    Law Schools Debate a
                                                    Contentious Testing
                                                    Alternative
                                                </a>
                                            </div>
                                            <div className="blog_post_meta">
                                                <ul>
                                                    <li>
                                                        <a href="#">admin</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            november 11, 2017
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="blog_post_text">
                                                <p>
                                                    Policy analysts generally
                                                    agree on a need for reform,
                                                    but not on which path
                                                    policymakers should take...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Blog Post */}
                                    <div className="blog_post trans_200">
                                        <div className="blog_post_video_container">
                                            <video
                                                className="blog_post_video video-js"
                                                data-setup='{"controls": true, "autoplay": false, "preload": "auto", "poster": "/landing/images/event_1.jpg"}'
                                            >
                                                <source
                                                    src="images/mov_bbb.mp4"
                                                    type="video/mp4"
                                                />
                                                <source
                                                    src="images/mov_bbb.ogg"
                                                    type="video/ogg"
                                                />
                                                Your browser does not support
                                                HTML5 video.
                                            </video>
                                        </div>
                                        <div className="blog_post_body">
                                            <div className="blog_post_title">
                                                <a href="blog_single.html">
                                                    Building Skills Outside the
                                                    Classroom With New Ways
                                                </a>
                                            </div>
                                            <div className="blog_post_meta">
                                                <ul>
                                                    <li>
                                                        <a href="#">admin</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            november 11, 2017
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="blog_post_text">
                                                <p>
                                                    Policy analysts generally
                                                    agree on a need for reform,
                                                    but not on which path
                                                    policymakers should take...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Blog Post */}
                                    <div className="blog_post trans_200">
                                        <div className="blog_post_image">
                                            <img
                                                src="/landing/images/event_3.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="blog_post_body">
                                            <div className="blog_post_title">
                                                <a href="blog_single.html">
                                                    Here’s What You Need to Know
                                                    About Online Testing
                                                </a>
                                            </div>
                                            <div className="blog_post_meta">
                                                <ul>
                                                    <li>
                                                        <a href="#">admin</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            november 11, 2017
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="blog_post_text">
                                                <p>
                                                    Policy analysts generally
                                                    agree on a need for reform,
                                                    but not on which path
                                                    policymakers should take...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Blog Post */}
                                    <div className="blog_post trans_200">
                                        <div className="blog_post_body">
                                            <div className="blog_post_title">
                                                <a href="blog_single.html">
                                                    With Changing Students and
                                                    Times
                                                </a>
                                            </div>
                                            <div className="blog_post_meta">
                                                <ul>
                                                    <li>
                                                        <a href="#">admin</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            november 11, 2017
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="blog_post_text">
                                                <p>
                                                    Policy analysts generally
                                                    agree on a need for reform,
                                                    but not on which path
                                                    policymakers should take...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <div className="load_more trans_200">
                                    <a href="#">load more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Story;
