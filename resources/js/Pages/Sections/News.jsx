import { Link } from "@inertiajs/react";
import React from "react";
import useApi from "../../Hooks/response";

const News = () => {
    const limitText = (html, limit = 50) => {
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

    const limitTextFirst = (html, limit = 150) => {
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

    const {
        data: datas,
        loading,
        error,
        get: getDatas,
    } = useApi("getDataHome");

    const posts = datas?.posts;

    const handleRefresh = () => {
        getDatas();
    };

    return (
        <div className="news">
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
                            <h2 className="section_title">Latest News</h2>
                            <div className="section_subtitle">
                                <p>
                                    Stay updated with our latest articles and
                                    insights.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="row news_row">
                        <div className="col-lg-12 news_col text-center py-5">
                            <div
                                className="spinner-border text-secondary"
                                role="status"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="col-lg-12 news_col text-center py-5">
                        <div className="alert alert-danger">{error}</div>
                    </div>
                ) : posts && posts.data.length > 0 ? (
                    <>
                        {" "}
                        <div className="row news_row">
                            <div className="col-lg-7 news_col">
                                <div className="news_post_large_container">
                                    <div className="news_post_large">
                                        <div className="news_post_image">
                                            <img
                                                src={
                                                    posts.data[0]?.image
                                                        ? "/storage/" +
                                                        posts.data[0].image
                                                        : "/img/logo.png"
                                                }
                                                alt={posts.data[0]?.title}
                                                loading="lazy"
                                                style={{
                                                    maxHeight: "300px",
                                                    maxWidth: "690px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        <div className="news_post_large_title">
                                            <Link
                                                href={`/news/${posts.data[0]?.slug}`}
                                            >
                                                {posts.data[0]?.title}
                                            </Link>
                                        </div>
                                        <div className="news_post_meta">
                                            <ul>
                                                <li>
                                                    <Link href={`/news?categoryId=${encodeURIComponent(posts.data[0]?.category.id)}`}>
                                                        {
                                                            posts.data[0]
                                                                ?.category.name
                                                        }
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        {new Date(
                                                            posts.data[0]?.updated_at
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
                                        <div className="news_post_text">
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: limitTextFirst(
                                                        posts.data[0]?.body
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div className="news_post_link">
                                            <Link
                                                href={`/news/${posts.data[0]?.slug}`}
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-5 news_col">
                                <div className="news_posts_small">
                                    {posts.data.slice(1).map((post) => (
                                        <div
                                            key={post.id}
                                            className="news_post_small"
                                        >
                                            <div className="news_post_small_title">
                                                <a href={`/news/${post.slug}`}>
                                                    {post.title}
                                                </a>
                                            </div>
                                            <div className="news_post_meta">
                                                <ul>
                                                    <li>
                                                        <a href="#">
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
                                            <div className="news_post_text">
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: limitText(
                                                            post.body
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {posts.data.length > 4 && (
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <div className="courses_button trans_200">
                                        <Link href="/news">view all news</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="row news_row">
                        <div className="col-lg-12 news_col">
                            <div className="text-center">
                                <h4 className="text-gray-500">
                                    No news available.
                                </h4>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
