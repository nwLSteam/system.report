import React from "react";

export enum SystemListElementType {
	ENABLED,
	DISABLED,
	DISABLED_MAJOR
}

function SystemListElement( props: {
	enabled: SystemListElementType,
	name: string
} ) {
	return <li className={( () => {
		switch ( props.enabled ) {
			case SystemListElementType.DISABLED:
				return "settings element disabled";
			case SystemListElementType.ENABLED:
				return "settings element enabled";
			case SystemListElementType.DISABLED_MAJOR:
				return "settings element major";
		}
	} )()}>
		{
			props.name
		}
	</li>;
}

export default SystemListElement;
