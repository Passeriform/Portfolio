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

export interface GithubEvent {
	id: number;
	type: string;
	actor: GithubUser;
	repo: GithubRepo;
	payload?:
	| object
	| CommitCommentEventPayload
	| CreateDeleteEventPayload
	| ForkEventPayload
	| GollumEventPayload
	| IssueCommentEventPayload
	| IssuesEventPayload
	| MemberEventPayload
	| PullRequestEventPayload
	| PullRequestReviewCommentEventPayload
	| PushEventPayload
	| ReleaseEventPayload
	| SponsorshipEventPayload
	| WatchEventPayload;
	public: boolean;
	created_at: string;
}

interface CommitCommentEventPayload {
	action: string;
	comment: object;
}

interface CreateDeleteEventPayload {
	ref: string;
	ref_type: string;
	master_branch?: string;
	description?: string;
}

interface ForkEventPayload {
	forkee: object;
}

interface GollumEventPayload {
	pages: {
		page_name: string;
		title: string;
		action: string;
		sha: string;
		html_url: string;
	}[];
}

interface IssueCommentEventPayload {
	action: string;
	changes: {
		body: {
			from: string;
		};
	};
	issue: object;
	comment: object;
}

interface IssuesEventPayload {
	action: string;
	issue: object;
	changes: {
		title: { from: string };
		body: { from: string };
	};
	assignee: object;
	label: object;
}

interface MemberEventPayload {
	action: string;
	member: object;
	changes: {
		old_permission: {
			from: string;
		};
	};
}

interface PullRequestEventPayload {
	action: string;
	number: number;
	changes: {
		title: { from: string };
		body: { from: string };
	};
	pull_request: object;
}

interface PullRequestReviewCommentEventPayload {
	action: string;
	changes: {
		body: {
			from: string;
		};
	};
	pull_request: object;
	comment: object;
}

interface PushEventPayload {
	push_id: number;
	size: number;
	distinct_size: number;
	ref: string;
	head: string;
	before: string;
	commits: {
		sha: string;
		message: string;
		author: {
			name: string;
			email: string;
		};
		url: string;
		distinct: boolean;
	}[];
}

interface ReleaseEventPayload {
	action: string;
	changes: {
		body: {
			from: string;
		};
		name: {
			from: string;
		};
		release: object;
	};
}

interface SponsorshipEventPayload {
	action: string;
	effective_date: string;
	changes: {
		tier: {
			from: object;
		};
		privacy_level: {
			from: string;
		};
	};
}

interface WatchEventPayload {
	action: string;
}
