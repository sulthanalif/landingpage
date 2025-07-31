import React, { useEffect, useRef, useState } from "react";
import Layout from "../Components/Layout";
import { Link } from "@inertiajs/react";
import useApi from "../Hooks/response";

const DetailNews = ({ slug }) => {
    const styleRefs = useRef([]);
    const scriptRefs = useRef([]);
    const [isLoaded, setIsLoaded] = useState(false);

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

        setIsLoaded(true);

        return () => {
            styleRefs.current.forEach(
                (file) => file && file.parentNode.removeChild(file)
            );
            scriptRefs.current.forEach(
                (file) => file && file.parentNode.removeChild(file)
            );
        };
    }, []);

    const { data, loading, error, get: getData } = useApi(`post/${slug}`);
    const post = data?.post;
    const latest = data?.latest || [];
    const categories = data?.categories || [];
    const upcomings = data?.upcomings || [];

    const handleRefresh = () => {
        getData();
    };

    if (!isLoaded || loading) {
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

    if (error) {
        return (
            <Layout>
                <div className="alert alert-danger">
                    Failed to load news data.
                    <button onClick={handleRefresh}>Try again</button>
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
                                        <li>
                                            <Link href="/news">News</Link>
                                        </li>
                                        <li>{post?.title || "Detail News"}</li>
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
                            {post ? (
                                <div className="blog_content">
                                    <div className="blog_title">
                                        {post.title}
                                    </div>
                                    <div className="blog_sub_title">
                                        {post.sub_title || "No subtitle"}
                                    </div>
                                    <div className="blog_meta">
                                        <ul>
                                            <li>
                                                Post on{" "}
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
                                            {post.category && (
                                                <li>
                                                    In{" "}
                                                    <Link href={`/news?categoryId=${encodeURIComponent(post.category.id)}`}>
                                                        {post.category.name}
                                                    </Link>
                                                </li>
                                            )}
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
                                        className="blog_text mt-3"
                                        dangerouslySetInnerHTML={{
                                            __html: post.body,
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="alert alert-warning">
                                    Post not found
                                </div>
                            )}

                            <div className="blog_extra d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                                <div className="blog_social ml-lg-auto">
                                    <span>Follow Us: </span>
                                    <ul>
                                        <li>
                                            <a
                                                href="https://www.facebook.com/pages/category/Community/Lia-Stephanie-School-115071265257740/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i
                                                    className="fa-brands fa-facebook"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.instagram.com/liastephanieschool/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i
                                                    className="fa-brands fa-instagram"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://wa.me/+6281310602139"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i
                                                    className="fa-brands fa-whatsapp"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.tiktok.com/@lia.stephanie1?_t=ZS-8yUUdR5HfHc&_r=1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i
                                                    className="fa-brands fa-tiktok"
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
                                {/* Upcoming News */}
                                <div className="sidebar_section">
                                    <div className="sidebar_section_title">
                                        Upcoming News
                                    </div>
                                    <div className="sidebar_latest">
                                        {upcomings.length > 0 ? (
                                            upcomings.map((data) => (
                                                <div
                                                    className="latest d-flex flex-row align-items-start justify-content-start"
                                                    key={data.id}
                                                >
                                                    <div className="latest_image">
                                                        <div>
                                                            <img
                                                                src={
                                                                    data.image
                                                                        ? `/storage/${data.image}`
                                                                        : "/landing/images/event_1.jpg"
                                                                }
                                                                alt={data.title}
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="latest_content">
                                                        <div className="latest_title">
                                                            <Link
                                                                href={`/news/${data.slug}`}
                                                            >
                                                                {data.title}
                                                            </Link>
                                                        </div>
                                                        <div className="latest_date">
                                                            {new Date(
                                                                data.updated_at
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
                                            ))
                                        ) : (
                                            <div className="text-muted">
                                                No latest news
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Latest News */}
                                <div className="sidebar_section">
                                    <div className="sidebar_section_title">
                                        Latest News
                                    </div>
                                    <div className="sidebar_latest">
                                        {latest.length > 0 ? (
                                            latest.map((latepost) => (
                                                <div
                                                    className="latest d-flex flex-row align-items-start justify-content-start"
                                                    key={latepost.id}
                                                >
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
                                            ))
                                        ) : (
                                            <div className="text-muted">
                                                No latest news
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Categories */}
                                <div className="sidebar_section">
                                    <div className="sidebar_section_title">
                                        Categories
                                    </div>
                                    <div className="sidebar_categories">
                                        <ul className="categories_list">
                                            {categories.map((category) => (
                                                <li key={category.id}>
                                                    <Link
                                                        className="clearfix"
                                                        href={`/news?categoryId=${encodeURIComponent(category.id)}`}
                                                    >
                                                        {category.name}
                                                        <span>({category.posts_count})</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
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
