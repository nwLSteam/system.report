type SystemTestResults = {
	reachable: undefined;
} | {
	reachable: boolean;
	statusCode: number;
	errorMessage?: string;
}

export type SystemStatus = {
	system: string;
	status: {
		enabled: boolean;
	} & SystemTestResults;
}

export type HistoricalStatusPoint = {
	timestampISO: string;
	error: undefined;
	systems: SystemStatus[];
} | {
	timestampISO: string;
	error: string;
	systems: undefined;
}

export interface HistoricalStatus {
	historical: Array<{
		frequencyMinutes: number;
		maxPoints: number;
		statusPoints: HistoricalStatusPoint[];
	}>;
}
