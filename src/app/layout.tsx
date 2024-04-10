import type { Metadata, Viewport } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import React from "react";

const openSans = Open_Sans( { subsets: [ "latin" ] } );

export const metadata: Metadata = {
	metadataBase: new URL( process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: "https://system.report" ),

	title: "System Report",
	applicationName: "System Report",
	description: "Check the current status of the Bungie API systems.",

	icons: [
		{
			sizes: "32x32",
			url: "/favicons/favicon-32x32.png",
		},
		{
			sizes: "16x16",
			url: "/favicons/favicon-16x16.png",
		},
		{
			rel: "shortcut icon",
			url: "/favicons/favicon.ico",
		},
		{
			rel: "apple-touch-icon",
			sizes: "180x180",
			url: "/favicons/apple-touch-icon.png",
		},
		{
			rel: "mask-icon",
			url: "/favicons/safari-pinned-tab.svg",
			color: "#6a36d6",
		},
	],

	openGraph: {
		type: "website",
		title: "Bungie API System Report",
		description: "Check the current status of the Bungie API systems.",
		images: "/favicons/favicon-32x32.png",
	},

	appleWebApp: {
		title: "System Report",
	},

	other: {
		"msapplication-TileColor": "#603cba",
		"msapplication-config": "/manifest.webmanifest",
	},
};

export const viewport: Viewport = {
	themeColor: "#121212",
};

export default function RootLayout(
	{
		children,
	}: Readonly<{
		children: React.ReactNode;
	}>,
) {
	return (
		<html lang="en">
		<body className={openSans.className}>{children}</body>
		</html>
	);
}
