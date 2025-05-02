import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import Layout from "../Components/Layout";

const Story = ({ activities }) => {
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
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="blog_post_content">
                                                    <div className="blog_post_title">
                                                        <a href="#">
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
                                        <h3 className="text-center">No activities found</h3>
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
        </>
    );
};

export default Story;
