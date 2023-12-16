export type GithubEvent =
	| "CreateEvent"
	| "DeleteEvent"
	| "ForkEvent"
	| "IssuesEvent"
	| "PullRequestEvent"
	| "PushEvent"
	| "ReleaseEvent"
	| "WatchEvent";


export const githubEventsRegistry = {
	CreateEvent: { iconUrl: "/assets/images/icons/gh-create.png" },
	DeleteEvent: { iconUrl: "/assets/images/icons/gh-delete.png" },
	ForkEvent: { iconUrl: "/assets/images/icons/gh-fork.png" },
	IssuesEvent: { iconUrl: "/assets/images/icons/gh-pr.png" },
	PullRequestEvent: { iconUrl: "/assets/images/icons/gh-pr.png" },
	PushEvent: { iconUrl: "/assets/images/icons/gh-push.png" },
	ReleaseEvent: { iconUrl: "/assets/images/icons/gh-release.png" },
	WatchEvent: { iconUrl: "/assets/images/icons/gh-watch.png" },
} as const;
