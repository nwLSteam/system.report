import { HistoricalStatus, HistoricalStatusPoint } from "@contracts/HistoricalStatus";
import React from "react";

import s from "./HistoricalElement.module.scss";


const _elementBar = ( props: {
	systems?: HistoricalStatusPoint
} ) => {
	const systems = props.systems;

	if ( !systems ) {
		return <div className={s.unknown} />;
	}

	return <div className={s.element}>{/* TODO */}</div>;
};

function HistoricalElement( props: HistoricalStatus["historical"][number] ) {
	return <div className={s.root}>
		<h3>Last {props.frequencyMinutes * props.maxPoints} minutes:</h3>
		<div className={s.container}>
			{Array( props.maxPoints ).fill(0).map(
				( _, n ) => <_elementBar
					systems={props.statusPoints[n]}
					key={`updater-${props.frequencyMinutes}-n${n}`}
				/>,
			)}
		</div>
	</div>;
}

export default HistoricalElement;
