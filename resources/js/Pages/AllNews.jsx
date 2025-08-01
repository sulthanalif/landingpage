import { Link } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../Components/Layout";
import useApi from "../Hooks/response";

const AllNews = () => {
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

    const { data: posts, loading, error, get: getPosts } = useApi("posts");

    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const categoryId = params.get("categoryId");

        if (categoryId) {
            setSelectedCategory(categoryId);
        }
    }, []);

    // Filter data berdasarkan selectedCategory
    useEffect(() => {
        if (!selectedCategory) {
            setFilteredPosts(posts?.posts || []);
        } else {
            setFilteredPosts(
                posts?.posts?.filter(
                    (post) => String(post.category.id) === selectedCategory
                ) || []
            );
        }
    }, [selectedCategory, posts]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(String(categoryId));
    };

    const handleRefresh = () => {
        getPosts();
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

            <div className="courses">
                <div
                    className="section_background parallax-window"
                    loading="lazy"
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
                                <h2 className="section_title">Our News</h2>
                                <div className="section_subtitle">
                                    <p>
                                        Stay updated with our latest articles
                                        and insights.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-lg-3 text-secondary">
                            <select
                                name="category"
                                className="form-control text-secondary"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="">All</option>
                                {posts?.categories.map((category) => (
                                    <option value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="col-lg-12 text-center py-5">
                            <div
                                className="spinner-border text-secondary"
                                role="status"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="col-lg-12 text-center py-5">
                            <div className="alert alert-danger">{error}</div>
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        <>
                            {" "}
                            <div className="row courses_row">
                                {filteredPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="blog_post trans_200 col-lg-4 col-md-6"
                                    >
                                        <div className="blog_post_image" style={{ position: "relative" }}>
                                            <img
                                                src={
                                                    post.image
                                                        ? `/storage/${post.image}`
                                                        : "/img/logo.png"
                                                }
                                                alt={post.title}
                                                loading="lazy"
                                                style={{
                                                    width: "auto",
                                                    height: "250px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            {new Date(post.published_at) > new Date() && (
                                                <span
                                                    style={{
                                                        position: "absolute",
                                                        right: "15px",
                                                        bottom: "10px",
                                                        backgroundColor: "#14bdee",
                                                        color: "#fff",
                                                        padding: "3px 6px",
                                                        borderRadius: "5px",
                                                        fontWeight: "bold",
                                                        fontSize: "11px",
                                                    }}
                                                >
                                                    Upcoming Event
                                                </span>
                                            )}
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
                                                        <a
                                                            href="/news"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleCategoryClick(
                                                                    post
                                                                        .category
                                                                        .id
                                                                );
                                                            }}
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            {post.category.name}
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
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="col-lg-12 course_col mt-4">
                            <div className="course">
                                <div className="course_body">
                                    <h3 className="course_title text-center">
                                        No news found.
                                    </h3>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AllNews;
