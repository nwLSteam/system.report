import React from "react";

function Error(props: {
	message: string
}) {
    return <strong className={"settings error"}>{props.message}</strong>;
}

export default Error;
