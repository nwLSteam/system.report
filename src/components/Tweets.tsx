import { TweetResponse } from "@contracts/Tweets";
import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useSWR from "swr";
import Image from "next/image";

import s from "./Tweets.module.scss";

const API_URL = "/api/tweets/BungieHelp";
const fetcher = ( url: string ) => fetch( url ).then( ( res ) => res.json() );

function Tweets( props: {
	user: string
} ) {
	const { data, error, isLoading } = useSWR<TweetResponse>( API_URL, fetcher );

	if ( error ) {
		return <div>failed to load</div>;
	}
	if ( isLoading || !data ) {
		return <div>loading...</div>;
	}

	const settings: Settings = {
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		className: s.root,
		arrows: false,
		dots: true,
		dotsClass: `slick-dots ${s.dots}`,
	};

	const tweets = data.slice( 0, 5 );

	const TweetDivs = tweets.map( tweet => {
		const date = new Date( tweet.created_at + "+00:00" );

		return <a key={tweet.id} className={s.block}>
			<div className={s.header}>
				<div className={s.avatarWrapper}>
					<Image src={tweet.profile_image_url}
					       className={s.avatar}
					       width={48}
					       height={48}
					       alt={`${tweet.user} profile picture`}
					/>
				</div>
				<div className={s.headerText}>
					<div className={s.date}>{date.toLocaleString()}</div>
					<div className={s.username}>@{tweet.user}</div>
				</div>
			</div>
			<div className={s.body}>
				{tweet.text}
			</div>

		</a>;
	} );

	return <Slider {...settings}>{TweetDivs}</Slider>;
}

export default Tweets;
