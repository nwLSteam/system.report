import { NextResponse } from "next/server";

export async function GET(
	_request: Request,
	{ params }: { params: { username: string } },
) {
	const username = params.username;

	if ( !/^[A-Za-z0-9_-]+$/.test( username ) ) {
		return new NextResponse( JSON.stringify( {
			error: `Invalid username: ${username}`,
		} ), { status: 400 } );
	}

	const url = `https://www.bungiehelp.org/data/${username}.json`;

	try {
		const response = await fetch( url, { next: { revalidate: 60 } } ) // revalidate at most every minute
			.then( res => res.json() );

		return new NextResponse( JSON.stringify( response ) );
	} catch ( e ) {
		return new NextResponse( JSON.stringify( {
			error: `Invalid response`,
		} ), { status: 500 } );
	}

}
