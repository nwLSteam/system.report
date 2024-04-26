import { HistoricalStatus } from "@contracts/HistoricalStatus";

export async function GET( _request: Request ) {

	// TODO: this is placeholder data
	const data: HistoricalStatus = {
		historical: [
			{
				frequencyMinutes: 1,
				maxPoints: 30,
				statusPoints: [],
			},
		],
	};

	return Response.json( data );
}
