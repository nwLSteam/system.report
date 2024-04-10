import React from "react";
import module from "./Refresh.module.scss";

function Refresh( props: {
	last_refresh: Date
	action: () => void;
} ) {
	return <div className={module.body}>
		Last refresh: {props.last_refresh.toLocaleTimeString()}.
		<button type={"button"} className={module.button} onClick={props.action}>Refresh now?</button>
	</div>;
}

export default Refresh;
