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
	CreateEvent: "/assets/images/icons/gh-create.png",
	DeleteEvent: "/assets/images/icons/gh-delete.png",
	ForkEvent: "/assets/images/icons/gh-fork.png",
	IssuesEvent: "/assets/images/icons/gh-pr.png",
	PullRequestEvent: "/assets/images/icons/gh-pr.png",
	PushEvent: "/assets/images/icons/gh-push.png",
	ReleaseEvent: "/assets/images/icons/gh-release.png",
	WatchEvent: "/assets/images/icons/gh-watch.png",
} as const;
