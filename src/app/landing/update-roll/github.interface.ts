export interface GithubUser {
	id: number;
	login: string;
	url: string;
	avatar_url: string;
}

export interface GithubRepo {
	id: number;
	name: string;
	url: string;
}

// TODO: Model payload depending on event-type
export interface GithubEvent {
	id: number;
	type: string;
	actor: GithubUser;
	repo: GithubRepo;
	// Generic payload must be deserialized independently
	payload: any;
	public: boolean;
	created_at: string;
}
