"use client";

import { HistoricalStatus } from "@contracts/HistoricalStatus";
import API from "@data/api";
import React from "react";
import HistoricalElement from "@components/HistoricalElement";
import useSWR from "swr";

function Historical() {
	const { data, error, isLoading } = useSWR<HistoricalStatus>( "/api/status", API.swrFetcher );

	if ( error ) {
		return <div>failed to load</div>;
	}
	if ( isLoading ) {
		return <div>loading...</div>;
	}

	if ( !data ) {
		return <div>Data unreadable.</div>;
	}

	return data.historical.map( p => <HistoricalElement {...p} key={`point-${p.frequencyMinutes}`} /> );
}

export default Historical;
