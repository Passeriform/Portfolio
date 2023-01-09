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

interface GithubUser {
	readonly avatar_url: string;
	readonly id: number;
	readonly login: string;
	readonly url: string;
}

interface GithubRepo {
	readonly id: number;
	readonly name: string;
	readonly url: string;
}

interface CommitCommentEventPayload {
	readonly action: string;
	readonly comment: Record<string, unknown>;
}

interface CreateDeleteEventPayload {
	readonly ref: string;
	readonly ref_type: string;
	readonly description?: string;
	readonly master_branch?: string;
}

interface ForkEventPayload {
	readonly forkee: Record<string, unknown>;
}

interface GollumEventPayload {
	readonly pages: readonly {
		readonly action: string;
		readonly html_url: string;
		readonly page_name: string;
		readonly sha: string;
		readonly title: string;
	}[];
}

interface IssueCommentEventPayload {
	readonly action: string;
	readonly changes: {
		readonly body: {
			readonly from: string;
		};
	};
	readonly comment: Record<string, unknown>;
	readonly issue: Record<string, unknown>;
}

interface IssuesEventPayload {
	readonly action: string;
	readonly assignee: Record<string, unknown>;
	readonly changes: {
		readonly body: { readonly from: string };
		readonly title: { readonly from: string };
	};
	readonly issue: Record<string, unknown>;
	readonly label: Record<string, unknown>;
}

interface MemberEventPayload {
	readonly action: string;
	readonly changes: {
		readonly old_permission: {
			readonly from: string;
		};
	};
	readonly member: Record<string, unknown>;
}

interface PullRequestEventPayload {
	readonly action: string;
	readonly changes: {
		readonly body: { readonly from: string };
		readonly title: { readonly from: string };
	};
	/* eslint-disable-next-line id-denylist */
	readonly number: number;
	readonly pull_request: Record<string, unknown>;
}

interface PullRequestReviewCommentEventPayload {
	readonly action: string;
	readonly changes: {
		readonly body: {
			readonly from: string;
		};
	};
	readonly comment: Record<string, unknown>;
	readonly pull_request: Record<string, unknown>;
}

interface PushEventPayload {
	readonly before: string;
	readonly commits: readonly {
		readonly author: {
			readonly email: string;
			readonly name: string;
		};
		readonly distinct: boolean;
		readonly message: string;
		readonly sha: string;
		readonly url: string;
	}[];
	readonly distinct_size: number;
	readonly head: string;
	readonly push_id: number;
	readonly ref: string;
	readonly size: number;
}

interface ReleaseEventPayload {
	readonly action: string;
	readonly changes: {
		readonly body: {
			readonly from: string;
		};
		readonly name: {
			readonly from: string;
		};
		readonly release: Record<string, unknown>;
	};
}

interface SponsorshipEventPayload {
	readonly action: string;
	readonly changes: {
		readonly privacy_level: {
			readonly from: string;
		};
		readonly tier: {
			readonly from: Record<string, unknown>;
		};
	};
	readonly effective_date: string;
}

interface WatchEventPayload {
	readonly action: string;
}

export interface GithubEvent {
	readonly actor: GithubUser;
	readonly created_at: string;
	readonly id: number;
	readonly public: boolean;
	readonly repo: GithubRepo;
	readonly type: string;
	readonly payload?: GithubEventPayload;
}

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

export const commitCategoryPattern = /^((\[[\w\s\|\,]+\]\s+)+|[\w\s\|\,]+\:)/;
