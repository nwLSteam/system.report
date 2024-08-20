export interface Tweet {
	id: string;
	created_at: string;
	user: string;
	user_id: string;
	text: string;
	thread_text: string;
	lang: string;
	in_reply_to: any | null;
	is_quote_status: boolean;
	quote?: string;
	possibly_sensitive?: boolean;
	possibly_sensitive_editable?: boolean;
	profile_banner_url: string;
	profile_image_url: string;
	quote_count: number;
	replies: any | null;
	reply_count: number;
	favorite_count: number;
	favorited: boolean;
	view_count: string;
	retweet_count: number;
	editable_until_msecs: string;
	is_translatable: boolean;
	is_edit_eligible: boolean;
	edits_remaining: string;
	unix: number;
	url: string;
	media: any | null;
	unix_grabbed: number;
}

export type TweetResponse = Array<Tweet>;
