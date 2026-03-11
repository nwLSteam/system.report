import { CoreSettingsConfiguration } from "bungie-api-ts/core";
import { useMemo } from "react";
import "./Settings.scss";
import type { CoreSystemMapping } from "../types";
import SystemListElement from "./SystemListElement";

const MAJOR_SYSTEMS = new Set<string>( [
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
    "DestinyClanSearch",
    "DestinyLinkedProfiles",
    "ClaimSeasonPassReward",
    "D2Rewards",
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
] as const );

function Settings( props: { data: CoreSettingsConfiguration } ) {
    const { enabled, disabled, disabledMajor } = useMemo(
        () => Object
            .entries( props.data.systems )
            .map( ( [key, system] ) => ( { key, system } ) )
            .sort( ( a, b ) => a.key.localeCompare( b.key ) )
            .reduce(
                ( acc, item ) => {
                    if ( item.system.enabled ) {
                        acc.enabled.push( item );
                    } else if ( MAJOR_SYSTEMS.has( item.key ) ) {
                        acc.disabledMajor.push( item );
                    } else {
                        acc.disabled.push( item );
                    }
                    return acc;
                },
                {
                    enabled: [] as CoreSystemMapping[],
                    disabled: [] as CoreSystemMapping[],
                    disabledMajor: [] as CoreSystemMapping[],
                },
            ),
        [props.data.systems] );

    return (
        <div className={"settings wrapper"}>
            {( () => {
                if ( disabledMajor.length > 0 ) {
                    return <>
                        <h2 className={"settings error"}>Major systems disabled:</h2>
                        <ul className={"settings list"}>{
                            disabledMajor.map( e => (
                                <SystemListElement
                                    key={e.key}
                                    system={e}
                                    major={true}
                                />
                            ) )
                        }</ul>
                    </>;
                }

                return <>
                    <h2 className={"settings allgood neon"}>All major systems online!</h2>
                    <span className={"settings help"}>
						Experiencing issues? Check <a href={"https://twitter.com/BNGServerStatus"}
                                                      target={"_blank"} rel={"noreferrer"}>@BNGServerStatus</a>,
                        alternatively pray to your preferred deity.
					</span>
                </>;
            } )()}

            <hr className={"divider"} />

            <div className={"settings other"}>
                <h2>Disabled systems:</h2>
                <details>
                    <summary>Click to expand</summary>
                    <ul className={"settings list"}>{
                        disabled.map( e => (
                            <SystemListElement
                                key={e.key}
                                system={e}
                                major={false}
                            />
                        ) )
                    }</ul>
                </details>

                <h2>Enabled systems:</h2>
                <details>
                    <summary>Click to expand</summary>
                    <ul className={"settings list"}>{
                        enabled.map( e => (
                            <SystemListElement
                                key={e.key}
                                system={e}
                                major={false}
                            />
                        ) )
                    }</ul>
                </details>
            </div>
        </div>
    );
}

export default Settings;
