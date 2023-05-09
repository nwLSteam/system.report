import { Core } from "bungie-api-ts";
import { CoreSettingsConfiguration, GlobalAlert } from "bungie-api-ts/core";
import { HttpClientConfig } from "bungie-api-ts/http";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.scss";
import Alerts from "./components/Alerts";
import Error from "./components/Error";
import Refresh from "./components/Refresh";
import Settings from "./components/Settings";

async function $http( config: HttpClientConfig ) {

	let key: string;
	if ( !process.env.NODE_ENV || process.env.NODE_ENV === "development" ) {
		key = "e63836d14e1849a29b205bb62ef41337";
	} else {
		key = "dc059d717b2a43cdb8904a72c5268b29";
	}

	return await ( await fetch( config.url, {
		headers: {
			"X-API-Key": key,
		},
	} ) ).json();
}

function getSettings( settings: SettingsType,
                      setSettings: Dispatch<SetStateAction<SettingsType>>,
                      setErrors: Dispatch<SetStateAction<string[]>>,
) {
	if ( settings !== undefined ) {
		return;
	}

	Core.getCommonSettings( $http ).then( response => {
		const success = [ 0, 1 ].includes( response.ErrorCode );

		if ( success ) {
			// success
			setSettings( response.Response );
		} else {
			// fail
			setErrors( ( old ) => old.concat( [ `GetCommonSettings returned an error: ${response.ErrorStatus}` ] ) );
			setSettings( null );
		}
	} ).catch( () => {
		setErrors( ( old ) => old.concat( [ "GetCommonSettings timed out." ] ) );
		setSettings( null );
	} );
}

function getAlerts( alerts: AlertsType,
                    setAlerts: Dispatch<SetStateAction<AlertsType>>,
                    setErrors: Dispatch<SetStateAction<string[]>>,
) {
	if ( alerts !== undefined ) {
		return;
	}

	Core.getGlobalAlerts( $http, {
		includestreaming: true,
	} ).then( response => {
		const success = [ 0, 1 ].includes( response.ErrorCode );

		if ( success ) {
			// success
			setAlerts( response.Response );
		} else {
			// fail
			setErrors( ( old ) => old.concat( [ `GetGlobalAlerts returned an error: ${response.ErrorStatus}` ] ) );
			setAlerts( null );
		}
	} ).catch( () => {
		setErrors( ( old ) => old.concat( [ "GetGlobalAlerts timed out." ] ) );
		setAlerts( null );
	} );
}

type SettingsType = CoreSettingsConfiguration | undefined | null;
type AlertsType = GlobalAlert[] | undefined | null;

function App() {
	let [ settings, setSettings ] = useState<SettingsType>( undefined );
	let [ alerts, setAlerts ] = useState<AlertsType>( undefined );
	let [ errors, setErrors ] = useState<string[]>( [] );

	useEffect( () => getSettings( settings, setSettings, setErrors ), [ settings ] );
	useEffect( () => getAlerts( alerts, setAlerts, setErrors ), [ alerts ] );

	return (
		<div className="App">
			<h1>Is the Bungie API down?</h1>
			{( alerts !== undefined || settings !== undefined )
				&& <Refresh last_refresh={new Date( Date.now() )}
				            action={() => {
					            setErrors( [] );
					            setSettings( undefined );
					            setAlerts( undefined );
				            }} />
			}

			{( alerts === undefined ) && <div className={"loading"}>Loading alerts...</div>}
			{( settings === undefined ) && <div className={"loading"}>Loading systems...</div>}
			{errors && errors.map( e => <Error message={e} /> )}
			{( alerts && Array.isArray( alerts ) && alerts.length > 0 ) && <Alerts alerts={alerts} />}
			{settings && <Settings data={settings} />}
			<span className="outro">Made by <a rel="noreferrer" href="https://nwl.gg" target="_blank">nwL</a>.</span>
		</div>
	);
}

export default App;
