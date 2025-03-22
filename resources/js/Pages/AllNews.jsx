import { Link } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";
import Layout from "../Components/Layout";

const AllNews = ({ posts }) => {
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
                                        <li>News</li>
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
                                {Array.isArray(posts) && posts.length > 0 ? (
                                    posts.map((post) => (
                                        <div
                                            key={post.id}
                                            className="blog_post trans_200"
                                        >
                                            <div className="blog_post_image">
                                                <img
                                                    src={
                                                        post.image
                                                            ? `/storage/${post.image}`
                                                            : "/landing/images/event_1.jpg"
                                                    }
                                                    alt={post.title}
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Konten Post */}
                                            <div className="blog_post_body">
                                                <div className="blog_post_title">
                                                    <Link
                                                        href={`/news/${post.slug}`}
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </div>
                                                <div className="blog_post_meta">
                                                    <ul>
                                                        <li>
                                                            <a href="#">
                                                                {post.user.name}
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                {new Date(
                                                                    post.updated_at
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
                                                <div className="blog_post_text">
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: limitText(
                                                                post.body
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center">No news found.</p>
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

export default AllNews;
