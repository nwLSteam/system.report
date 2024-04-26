import { HttpClientConfig } from "bungie-api-ts/http";


const API = {
	get key() {
		if ( !process.env.NODE_ENV || process.env.NODE_ENV === "development" ) {
			return "e63836d14e1849a29b205bb62ef41337";
		} else {
			return "dc059d717b2a43cdb8904a72c5268b29";
		}
	},

	$http: async ( config: HttpClientConfig ) => {
		return await ( await fetch( config.url, {
			headers: {
				"X-API-Key": API.key,
			},
		} ) ).json();
	},

	// @ts-ignore
	swrFetcher: ( ...args: any[] ) => fetch( ...args ).then( res => res.json() ),
};

export default API;
