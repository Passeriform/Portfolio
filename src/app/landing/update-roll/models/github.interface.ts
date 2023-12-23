type GithubEventPayload =
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

type EventWithPayload<P extends GithubEventPayload> = Omit<GithubEvent, "payload"> & {
	payload: P;
};

/* eslint-disable camelcase */

type GithubUser = Readonly<{
	avatar_url: string;
	id: number;
	login: string;
	url: string;
}>;

type GithubRepo = Readonly<{
	id: number;
	name: string;
	url: string;
}>;

type CommitCommentEventPayload = Readonly<{
	action: string;
	comment: Record<string, unknown>;
}>;

type CreateDeleteEventPayload = Readonly<{
	ref: string;
	ref_type: string;
	description?: string;
	master_branch?: string;
}>;

type ForkEventPayload = Readonly<{
	forkee: Record<string, unknown>;
}>;

type GollumEventPayload = Readonly<{
	pages: readonly Readonly<{
		action: string;
		html_url: string;
		page_name: string;
		sha: string;
		title: string;
	}>[];
}>;

type IssueCommentEventPayload = Readonly<{
	action: string;
	changes: Readonly<{
		body: {
			from: string;
		};
	}>;
	comment: Record<string, unknown>;
	issue: Record<string, unknown>;
}>;

type IssuesEventPayload = Readonly<{
	action: string;
	assignee: Record<string, unknown>;
	changes: Readonly<{
		body: { from: string };
		title: { from: string };
	}>;
	issue: Record<string, unknown>;
	label: Record<string, unknown>;
}>;

type MemberEventPayload = Readonly<{
	action: string;
	changes: Readonly<{
		old_permission: {
			from: string;
		};
	}>;
	member: Record<string, unknown>;
}>;

type PullRequestEventPayload = Readonly<{
	action: string;
	changes: Readonly<{
		body: { from: string };
		title: { from: string };
	}>;
	/* eslint-disable-next-line id-denylist */
	number: number;
	pull_request: Record<string, unknown>;
}>;

type PullRequestReviewCommentEventPayload = Readonly<{
	action: string;
	changes: Readonly<{
		body: {
			from: string;
		};
	}>;
	comment: Record<string, unknown>;
	pull_request: Record<string, unknown>;
}>;

type PushEventPayload = Readonly<{
	before: string;
	commits: readonly Readonly<{
		author: {
			email: string;
			name: string;
		};
		distinct: boolean;
		message: string;
		sha: string;
		url: string;
	}>[];
	distinct_size: number;
	head: string;
	push_id: number;
	ref: string;
	size: number;
}>;

type ReleaseEventPayload = Readonly<{
	action: string;
	changes: Readonly<{
		body: {
			from: string;
		};
		name: {
			from: string;
		};
		release: Record<string, unknown>;
	}>;
}>;

type SponsorshipEventPayload = Readonly<{
	action: string;
	changes: Readonly<{
		privacy_level: {
			from: string;
		};
		tier: {
			from: Record<string, unknown>;
		};
	}>;
	effective_date: string;
}>;

type WatchEventPayload = Readonly<{
	action: string;
}>;

export type GithubEvent = Readonly<{
	actor: GithubUser;
	created_at: string;
	id: number;
	public: boolean;
	repo: GithubRepo;
	type: string;
	payload?: GithubEventPayload;
}>;

/* eslint-enable camelcase */

export const isActionEvent = (
		event: GithubEvent,
): event is EventWithPayload<Extract<GithubEventPayload, {
	action: unknown;
}>> => Boolean(event.payload && "action" in event.payload);

export const isPushEvent = (
		event: GithubEvent,
): event is EventWithPayload<PushEventPayload> => Boolean(event.payload && "commits" in event.payload);

export const githubActionPresentation = {
	opened: "New Issue",
	started: "Now Watching",
	// TODO: Add other required actions
} as const;


export const commitCategoryPattern = /^((?:(?:\[[\w\s\|\,]+\])|(?:[\w\s\|\,]+))\s*\:?)/;
