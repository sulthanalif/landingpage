import React, { useEffect, useRef } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";

const DetailNews = ({ post, latest }) => {
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
                { rel: "stylesheet", href: "/landing/styles/blog_single.css" },
                document.head
            ),
            addFile(
                "link",
                {
                    rel: "stylesheet",
                    href: "/landing/styles/blog_single_responsive.css",
                },
                document.head
            ),
        ];

        scriptRefs.current = [
            addFile(
                "script",
                { src: "/landing/js/blog_single.js", async: true },
                document.body
            ),
            addFile(
                "script",
                {
                    src: "/landing/plugins/colorbox/jquery.colorbox-min.js",
                    async: true,
                },
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
                                        <li>
                                            <Link href="/news">News</Link>
                                        </li>
                                        <li>Detail News</li>
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
                        {/* Blog Content */}
                        <div className="col-lg-8">
                            <div className="blog_content">
                                <div className="blog_title">{post.title}</div>
                                <div className="blog_meta">
                                    <ul>
                                        <li>
                                            Post on{" "}
                                            <a href="#">
                                                {new Date(
                                                    post.updated_at
                                                ).toLocaleDateString("en-US", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </a>
                                        </li>
                                        <li>
                                            By <a href="#">{post.user.name}</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="blog_image">
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
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: post.body,
                                    }}
                                />
                            </div>
                            <div className="blog_extra d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                                {/* <div className="blog_tags">
                                    <span>Tags: </span>
                                    <ul>
                                        <li>
                                            <a href="#">Education</a>,{" "}
                                        </li>
                                        <li>
                                            <a href="#">Math</a>,{" "}
                                        </li>
                                        <li>
                                            <a href="#">Food</a>,{" "}
                                        </li>
                                        <li>
                                            <a href="#">Schools</a>,{" "}
                                        </li>
                                        <li>
                                            <a href="#">Religion</a>,{" "}
                                        </li>
                                    </ul>
                                </div> */}
                                <div className="blog_social ml-lg-auto">
                                    <span>Follow Us: </span>
                                    <ul>
                                        <li>
                                            <a href="https://www.facebook.com/pages/category/Community/Lia-Stephanie-School-115071265257740/" target="_blank">
                                                <i
                                                    className="fa fa-facebook"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/liastephanieschool/" target="_blank">
                                                <i
                                                    className="fa fa-instagram"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://wa.me/+6281310602139" target="_blank">
                                                <i
                                                    className="fa fa-whatsapp"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://lsgs.quintal.id/" target="_blank">
                                                <i
                                                    className="fa fa-leanpub"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Blog Sidebar */}
                        <div className="col-lg-4">
                            <div className="sidebar">
                                {/* Latest News */}
                                <div className="sidebar_section">
                                    <div className="sidebar_section_title">
                                        Latest News
                                    </div>
                                    <div className="sidebar_latest">
                                        {/* Latest Course */}
                                        {Array.isArray(latest) &&
                                            latest.map((latepost) => (
                                                <div className="latest d-flex flex-row align-items-start justify-content-start">
                                                    <div className="latest_image">
                                                        <div>
                                                            <img
                                                                src={
                                                                    latepost.image
                                                                        ? `/storage/${latepost.image}`
                                                                        : "/landing/images/event_1.jpg"
                                                                }
                                                                alt={
                                                                    latepost.title
                                                                }
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="latest_content">
                                                        <div className="latest_title">
                                                            <Link
                                                                href={`/news/${latepost.slug}`}
                                                            >
                                                                {latepost.title}
                                                            </Link>
                                                        </div>
                                                        <div className="latest_date">
                                                            {new Date(
                                                                latepost.updated_at
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    month: "long",
                                                                    day: "numeric",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DetailNews;
