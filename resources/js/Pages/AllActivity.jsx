import { Link } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";
import Layout from "../Components/Layout";

const AllActivity = ({ activities }) => {
    const styleRefs = useRef([]);
    const scriptRefs = useRef([]);

    useEffect(() => {
        const addFile = (type, attributes, target) => {
            const file = document.createElement(type);
            Object.entries(attributes).forEach(([key, value]) => {
                file[key] = value;
            });
            target.appendChild(file);
            return file;
        };

        styleRefs.current = [
            addFile(
                "link",
                { rel: "stylesheet", href: "/landing/styles/blog.css" },
                document.head
            ),
            addFile(
                "link",
                {
                    rel: "stylesheet",
                    href: "/landing/styles/blog_responsive.css",
                },
                document.head
            ),
        ];

        scriptRefs.current = [
            addFile(
                "script",
                { src: "/landing/js/blog.js", async: true },
                document.body
            ),
            addFile(
                "script",
                { src: "/landing/plugins/masonry/masonry.js", async: true },
                document.body
            ),
        ];

        return () => {
            styleRefs.current.forEach(
                (file) => file && file.parentNode.removeChild(file)
            );
            scriptRefs.current.forEach(
                (file) => file && file.parentNode.removeChild(file)
            );
        };
    }, []);

    const limitText = (html, limit = 150) => {
        if (!html) return "";

        const sanitizedHtml = html.replace(/<img[^>]*>/g, "");

        const tempElement = document.createElement("div");
        tempElement.innerHTML = sanitizedHtml;
        const textContent =
            tempElement.textContent || tempElement.innerText || "";

        return textContent.length > limit
            ? textContent.substring(0, limit) + "..."
            : textContent;
    };

    return (
        <Layout>
            {/* Breadcrumbs */}
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
                                        <li>Activities</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Section */}
            <div className="blog">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="blog_post_container">
                                {Array.isArray(activities) && activities.length > 0 ? (
                                    activities.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="blog_post trans_200"
                                        >
                                            <div className="blog_post_image">
                                                <img
                                                    src={
                                                        activity.image
                                                            ? `/storage/${activity.image}`
                                                            : "/landing/images/event_1.jpg"
                                                    }
                                                    alt={activity.title}
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Konten Post */}
                                            <div className="blog_post_body">
                                                <div className="blog_post_title">
                                                    <a
                                                        href={`#`}
                                                    >
                                                        {activity.title}
                                                    </a>
                                                </div>
                                                <div className="blog_post_meta">
                                                    <ul>
                                                        <li>
                                                            <a href="#">
                                                                Admin
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                {new Date(
                                                                    activity.date
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        month: "long",
                                                                        day: "numeric",
                                                                        year: "numeric",
                                                                    }
                                                                )}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center">
                                        No activities found.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col text-center">
                            <div className="load_more trans_200">
                                <a href="#">Load More</a>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </Layout>
    );
};

export default AllActivity;
