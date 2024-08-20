"use server";

import API from "@data/api";
import { Core } from "bungie-api-ts";
import { HistoricalStatusPoint, SystemStatus } from "@contracts/HistoricalStatus";

export const getStatusReport = async (): Promise<HistoricalStatusPoint> => {
	const StatusError = ( error: string ): HistoricalStatusPoint => {
		return {
			timestampISO: ( new Date() ).toISOString(),
			error,
			systems: undefined,
		};
	};

	let response;
	try {
		response = await Core.getCommonSettings( API.$http );
	} catch ( e ) {
		console.error( e );
		return StatusError( "Status system unreachable." );
	}

	if ( !( [ 0, 1 ].includes( response.ErrorCode ) ) ) {
		return StatusError( `Status system errored: ${response.ErrorStatus}` );
	}

	const systems: SystemStatus[] =
		      Object.entries( response.Response.systems )
		            .map( ( [ system, status ] ) => (
			            {
				            system,
				            status: {
					            enabled: status.enabled,
					            reachable: undefined,
				            },
			            } satisfies SystemStatus
		            ) );

	return {
		timestampISO: ( new Date() ).toISOString(),
		error: undefined,
		systems,
	};
};

getStatusReport().then( r => JSON.stringify( r ) ).then( console.log );
