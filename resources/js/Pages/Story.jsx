import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";

const Story = ({ activities }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const addCacheBuster = (url) => {
            return `${url}?v=${Date.now()}`;
        };

        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.type = "text/css";
        link1.href = addCacheBuster("/landing/styles/blog.css");

        const link2 = document.createElement("link");
        link2.rel = "stylesheet";
        link2.type = "text/css";
        link2.href = addCacheBuster("/landing/styles/blog_responsive.css");

        const link3 = document.createElement("link");
        link3.rel = "stylesheet";
        link3.type = "text/css";
        link3.href = addCacheBuster("/landing/plugins/video-js/video-js.css");

        document.head.appendChild(link1);
        document.head.appendChild(link2);
        document.head.appendChild(link3);

        Promise.all([
            new Promise((resolve) => (link1.onload = resolve)),
            new Promise((resolve) => (link2.onload = resolve)),
            new Promise((resolve) => (link3.onload = resolve)),
        ]).then(() => {
            setIsLoaded(true);

            const script1 = document.createElement("script");
            script1.src = addCacheBuster("/landing/js/blog.js");
            script1.async = true;

            const script2 = document.createElement("script");
            script2.src = addCacheBuster(
                "/landing/plugins/video-js/video.min.js"
            );
            script2.async = true;

            const script3 = document.createElement("script");
            script3.src = addCacheBuster("/landing/plugins/masonry/masonry.js");
            script3.async = true;

            document.body.appendChild(script1);
            document.body.appendChild(script2);
            document.body.appendChild(script3);

            return () => {
                [script1, script2, script3].forEach((script) => {
                    if (document.body.contains(script)) {
                        document.body.removeChild(script);
                    }
                });
            };
        });

        return () => {
            [link1, link2, link3].forEach((link) => {
                if (document.head.contains(link)) {
                    document.head.removeChild(link);
                }
            });
        };
    }, []);

    if (!isLoaded) {
        return (
            <Layout>
                <div className="preloader">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </Layout>
        );
    }

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
                                {activities && activities.length > 0 ? (
                                    activities.map((activity) => (
                                        <div
                                            className="blog_post"
                                            key={activity.id}
                                        >
                                            <div className="blog_post_image">
                                                <img
                                                    src={
                                                        activity.image
                                                            ? `/storage/${activity.image}`
                                                            : "/landing/images/event_1.jpg"
                                                    }
                                                    alt={activity.title}
                                                />
                                            </div>
                                            <div className="blog_post_content">
                                                <div className="blog_post_title">
                                                    <a
                                                        href="#"
                                                        className="text-center"
                                                    >
                                                        {activity.title}
                                                    </a>
                                                </div>
                                                {/* <div className="blog_post_text">
                                                        <p>
                                                            {activity.description}
                                                        </p>
                                                    </div> */}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h3 className="text-center">
                                        No activities found
                                    </h3>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
                            <div className="col text-center">
                                <div className="load_more trans_200">
                                    <a href="#">load more</a>
                                </div>
                            </div>
                        </div> */}
                </div>
            </div>
        </Layout>
    );
};

export default Story;
