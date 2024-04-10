import { CoreSettingsConfiguration } from "bungie-api-ts/core";
import React, { ReactElement } from "react";
import "./Settings.scss";
import SystemListElement, { SystemListElementType } from "./SystemListElement";

const MAJOR_SYSTEMS: string[] = [
	"Destiny2",
	"D2Vendors",
	"D2PublicMilestones",
	"D2MilestoneContent",
	"D2Milestones",
	"D2Characters",
	"D2Profiles",
	"D2Items",
	// "D2ReturnAvailablePlugs",
	"D2ReadActions",
	"D2SubmitReport",
	"D2EquipItem",
	"D2TransferItem",
	"D2PullFromPostmaster",
	"D2SetItemLockState",
	"D2InsertPlugsFree",
	"ScheduledFireteams",
	"DestinyClanSearch",
	"DestinyLinkedProfiles",
	"ClaimSeasonPassReward",
	"D2Rewards",
	"ClanFireteams",
	"DestinyClans",
	"Clans",
	"AccountCreation",
	"SteamIdAuth",
	"EpicIdAuth",
	"PSNAuth",
	"XuidAuth",
	"Profiles",
	"Careers",
	"Content",
	"Activities",
	"Messages",
];

function is_major( name: string ) {
	return MAJOR_SYSTEMS.includes( name );
}

function Settings( props: { data: CoreSettingsConfiguration } ) {
	let enabled: ReactElement[] = [];
	let disabled: ReactElement[] = [];
	let disabled_major: ReactElement[] = [];

	const system_keys = Object.keys( props.data.systems ).sort( ( a, b ) => {
		return a.localeCompare( b );
	} );

	console.log( system_keys );

	for ( const system of system_keys ) {
		let current = props.data.systems[system];

		if ( current.enabled ) {
			console.log( `${system} is up` );

			enabled.push( <SystemListElement key={system}
			                                 enabled={SystemListElementType.ENABLED}
			                                 name={system} /> );
		} else {
			console.log( `${system} is down` );
			if ( is_major( system ) ) {
				disabled_major.push( <SystemListElement key={system}
				                                        enabled={SystemListElementType.DISABLED_MAJOR}
				                                        name={system} /> );
			} else {
				disabled.push( <SystemListElement key={system}
				                                  enabled={SystemListElementType.DISABLED}
				                                  name={system} /> );
			}

		}
	}

	return <>
		<div className={"settings wrapper"}>

			{( () => {
				if ( disabled_major.length > 0 ) {
					return <>
						<h2 className={"settings error"}>Major systems disabled:</h2>
						<ul className={"settings list"}>{disabled_major}</ul>
					</>;
				}

				return <>
					<h2 className={"settings allgood neon"}>All major systems online!</h2>
					<span className={"settings help"}>
						Experiencing issues? Check <a href={"https://twitter.com/BungieHelp"}
						                              target={"_blank"} rel={"noreferrer"}>@BungieHelp</a>, alternatively pray to your preferred deity.
					</span>
				</>;
			} )()}

			<hr className={"divider"} />

			<div className={"settings other"}>
				<h2>Disabled systems:</h2>
				<details>
					<summary>Click to expand</summary>
					<ul className={"settings list"}>{disabled}</ul>
				</details>


				<h2>Enabled systems:</h2>
				<details>
					<summary>Click to expand</summary>
					<ul className={"settings list"}>{enabled}</ul>
				</details>
			</div>
		</div>
	</>;
}

export default Settings;
