import { GlobalAlert } from "bungie-api-ts/core";
import React from "react";
import "./Alerts.scss";

function Alerts( props: {
	alerts: GlobalAlert[]
} ) {
	return <>
		<h2>Alerts in effect:</h2>
		<div className={"alerts"}>
			{props.alerts.map( alert => <div key={alert.AlertKey}
			                                 className={"alert alert--" + alert.AlertLevel}>
				<h3 className={"alert__heading"}>{alert.AlertType === 0 ? "Global Alert" : "Streaming Alert"}</h3>
				<div className={"alert__message"}>{alert.AlertHtml}</div>
				<div className={"alert__footer"}>
					<a href={alert.AlertLink} target={"_blank"}
					   rel={"noreferrer"}>More info</a> &ndash; posted {alert.AlertTimestamp}
				</div>
			</div> )}
		</div>
	</>;
}

export default Alerts;
