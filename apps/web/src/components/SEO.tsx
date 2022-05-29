import { Text, VisuallyHidden } from "@chakra-ui/react";
import Head from "next/head";
import React, { FC } from "react";

type Props = {
    description?: string;
    title?: string;
    image?: string;
    url?: string;
    video?: string;
    data?: any;
};
const defaults = {
    title: "Sidharth Sahni",
    description:
        "Sidharth is a full-stack developer and a student based in New Delhi with a passion to build and innovate. He loves planning, reading, and exploring the vast world of programming what problems it could solve for me and for the around me. Currently a student at BPIT and working on Closet.",
    image: "/images/avatar.webp",
    url: "https://sidharthsahni.com",
};
const SEO: FC<Props> = ({
    title = defaults.title,
    description = defaults.description,
    image = defaults.image,
    url = defaults.url,
    video = "",
    data = {},
}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="title" content={title} />
                <link rel="icon" href="/icons/logo.png" />
                <meta name="description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={defaults.url + image} />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={url} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
                <meta property="twitter:image" content={image} />
                {video && (
                    <>
                        <meta property="og:video:url" content={video} />
                        <meta property="twitter:video:url" content={video} />
                    </>
                )}
            </Head>
            <VisuallyHidden>
                <h1>{title}</h1>
                <p>{description}</p>
                <Text as={"code"}>{JSON.stringify(data)}</Text>
            </VisuallyHidden>
        </>
    );
};

export default SEO;
