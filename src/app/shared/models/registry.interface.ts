import type { Framework, Language, License, Social_Media_Type, Tool, Work_Type } from "@graphql/generated/schema";

export type GithubEvent =
	| "CreateEvent"
	| "DeleteEvent"
	| "ForkEvent"
	| "IssuesEvent"
	| "PullRequestEvent"
	| "PushEvent"
	| "ReleaseEvent"
	| "WatchEvent";

// NOTE: Only used as a union type for all icon-registry based operations.
export type EntityIdentifierType = Framework | GithubEvent | Language | License | Social_Media_Type | Tool | Work_Type;

export type EntityRegistry = Map<EntityIdentifierType, Readonly<{

	/**
	 * Detailed description.
	 */
	description?: string;

	/**
	 * Icon URL for entity, either locally server or externally handled.
	 * NOTE: Must maintain in case of external URL downtime.
	 */
	iconUrl?: string;

	/**
	 * Corresponding title on wikipedia used for caching of sorts.
	 * Identifier is not quite robust to select the correct entity.
	 * Specifically for Wikipedia API usage.
	 * Eliminates usage for the `search` endpoint.
	 */
	wikiTitle?: string;
}>>;

/* eslint-disable functional/prefer-immutable-types */
export const registry: Readonly<EntityRegistry> = new Map([
	// Github events
	["CreateEvent", { iconUrl: "/assets/images/icons/gh-create.png" }],
	["DeleteEvent", { iconUrl: "/assets/images/icons/gh-delete.png" }],
	["ForkEvent", { iconUrl: "/assets/images/icons/gh-fork.png" }],
	["IssuesEvent", { iconUrl: "/assets/images/icons/gh-pr.png" }],
	["PullRequestEvent", { iconUrl: "/assets/images/icons/gh-pr.png" }],
	["PushEvent", { iconUrl: "/assets/images/icons/gh-push.png" }],
	["ReleaseEvent", { iconUrl: "/assets/images/icons/gh-release.png" }],
	["WatchEvent", { iconUrl: "/assets/images/icons/gh-watch.png" }],

	// Work types
	["PRODUCT", { iconUrl: "https://img.icons8.com/product" }],
	["PROJECT", { iconUrl: "https://img.icons8.com/project" }],
	["DESIGN", { iconUrl: "https://img.icons8.com/lab-items" }],
	["MISC", { iconUrl: "https://img.icons8.com/lab-items" }],

	// Licenses
	["GPL", { iconUrl: "https://img.shields.io/badge/license-GPL 3-blue" }],
	["APACHE", { iconUrl: "https://img.shields.io/badge/license-Apache 2-blue" }],
	["MIT", { iconUrl: "https://img.shields.io/badge/license-MIT-green" }],
	["FREE", { iconUrl: "https://img.shields.io/badge/license-Unlicensed-blue" }],

	// Languages
	[
		"c", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
			wikiTitle: "C (programming language)",
		},
	],
	[
		"cpp", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
			wikiTitle: "C++ (programming language)",
		},
	],
	[
		"java", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
			wikiTitle: "Java (programming language)",
		},
	],
	[
		"javascript", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
			wikiTitle: "Javascript (programming language)",
		},
	],
	[
		"typescript", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
			wikiTitle: "Typescript (programming language)",
		},
	],
	[
		"python", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
			wikiTitle: "Python (programming language)",
		},
	],
	[
		"go", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
			wikiTitle: "Go (programming language)",
		},
	],
	[
		"rust", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-plain.svg",
			wikiTitle: "Rust (programming language)",
		},
	],
	[
		"ruby", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg",
			wikiTitle: "Ruby (programming language)",
		},
	],
	[
		"shell", {
			iconUrl: "https://bashlogo.com/img/symbol/svg/full_colored_light.svg",
			wikiTitle: "Shell script",
		},
	],
	[
		"solidity", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/solidity/solidity-original.svg",
			wikiTitle: "Solidity (programming language)",
		},
	],
	[
		"php", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",
			wikiTitle: "PHP (programming language)",
		},
	],
	[
		"lua", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/lua/lua-original.svg",
			wikiTitle: "Lua (programming language)",
		},
	],
	[
		"elua", {
			iconUrl: "https://www.eluaproject.net/images/logo_eLua.png",
			wikiTitle: "",
		},
	],
	[
		"assemblyx86", {
			iconUrl: "https://hackr.io/tutorials/assembly-language/logo-assembly-language.svg",
			wikiTitle: "x86 assembly language",
		},
	],
	[
		"bash", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bash/bash-original.svg",
			wikiTitle: "Bash (Unix shell)",
		},
	],
	[
		"batch", {
			iconUrl: "https://img.icons8.com/color/console",
			wikiTitle: "Batch file",
		},
	],
	[
		"qt4", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/qt/qt-original.svg",
			wikiTitle: "Qt (software)",
		},
	],

	// Frameworks
	[
		"crossterm", {
			iconUrl: "https://raw.githubusercontent.com/crossterm-rs/crossterm/master/docs/crossterm_full.png",
			wikiTitle: "",
		},
	],
	[
		"zmq", {
			iconUrl: "https://www.ics.com/sites/default/files/styles/blog_detail/public/images/0mq part 1.jpg",
			wikiTitle: "ZeroMQ",
		},
	],
	[
		"boost", {
			iconUrl: "https://theboostcpplibraries.com/static/main/img/boost-logo.svg",
			wikiTitle: "Boost (C++ libraries)",
		},
	],
	[
		"rabbitmq", {
			iconUrl: "https://cdn.freebiesupply.com/logos/large/2x/rabbitmq-logo-png-transparent.png",
			wikiTitle: "RabbitMQ",
		},
	],
	[
		"react", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
			wikiTitle: "React (web framework)",
		},
	],
	[
		"rxjs", {
			iconUrl: "https://raw.githubusercontent.com/ReactiveX/rxjs/7f3d3e1c81660ada347bfa9e3cb1d8bf36433372/resources/CI-CD/logo/svg/RxJs_Logo_Basic.svg",
			wikiTitle: "",
		},
	],
	[
		"mathjax", {
			iconUrl: "/assets/images/icons/mathjax.png",
			wikiTitle: "MathJax",
		},
	],
	[
		"django", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg",
			wikiTitle: "Django (web framework)",
		},
	],
	[
		"flask", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg",
			wikiTitle: "Flask (web framework)",
		},
	],
	[
		"sympy", {
			iconUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Sympy_logo.svg",
			wikiTitle: "SymPy",
		},
	],
	[
		"numpy", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg",
			wikiTitle: "NumPy",
		},
	],
	[
		"pygame", {
			iconUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Pygame_logo.gif",
			wikiTitle: "Pygame",
		},
	],
	[
		"unreal", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/unrealengine/unrealengine-original.svg",
			wikiTitle: "Unreal Engine",
		},
	],
	[
		"libglass", {
			iconUrl: "https://libglass.sourceforge.net/baseimages/libglass.jpg",
			wikiTitle: "https://libglass.sourceforge.net/baseimages/libglass.jpg",
		},
	],
	[
		"cuda", {
			iconUrl: "https://upload.wikimedia.org/wikipedia/en/b/b9/Nvidia_CUDA_Logo.jpg",
			wikiTitle: "CUDA",
		},
	],
	[
		"blas", {
			iconUrl: "https://xtensor-blas.readthedocs.io/en/latest/_images/xtensor-blas.svg",
			wikiTitle: "Basic Linear Algebra Subprograms",
		},
	],
	[
		"angular", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg",
			wikiTitle: "Angular (web framework)",
		},
	],
	[
		"sass", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg",
			wikiTitle: "Sass (stylesheet language)",
		},
	],
	[
		"truffle", {
			iconUrl: "https://camo.githubusercontent.com/7240582453539ece449f39250a2b063427c83375/68747470733a2f2f74727566666c656672616d65776f726b2e636f6d2f696d672f74727566666c652d6c6f676f2d6461726b2e737667",
			wikiTitle: "",
		},
	],
	[
		"ethereum", {
			iconUrl: "https://ethereum.org/static/655aaefb744ae2f9f818095a436d38b5/e32d8/ethereum-icon-purple.png",
			wikiTitle: "Ethereum",
		},
	],
	[
		"rst", {
			iconUrl: "https://docutils.sourceforge.io/rst.png",
			wikiTitle: "reStructuredText",
		},
	],
	[
		"arduino", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg",
			wikiTitle: "Arduino",
		},
	],
	[
		"ffmpeg", {
			iconUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/FFmpeg_icon.svg",
			wikiTitle: "FFmpeg",
		},
	],
	[
		"libav", {
			iconUrl: "https://pbs.twimg.com/profile_images/1409208335/libav-logo.png",
			wikiTitle: "Libav",
		},
	],
	[
		"pytorch", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg",
			wikiTitle: "PyTorch",
		},
	],
	[
		"opencv", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg",
			wikiTitle: "OpenCV",
		},
	],
	[
		"airsim", {
			iconUrl: "/assets/images/icons/airsim.png",
			wikiTitle: "AirSim",
		},
	],
	[
		"googleapi", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg",
			wikiTitle: "Google APIs",
		},
	],
	[
		"quovo", {
			iconUrl: "https://api-docs.quovo.com/v2/agg/images/logo.png",
			wikiTitle: "",
		},
	],
	[
		"imlib", {
			iconUrl: "https://docs.enlightenment.org/api/imlib2/html/imlib2.png",
			wikiTitle: "Enlightenment Foundation Libraries",
		},
	],
	[
		"webgl", {
			iconUrl: "/assets/images/icons/webgl.png",
			wikiTitle: "WebGL",
		},
	],
	[
		"praw", {
			iconUrl: "https://www.redditinc.com/assets/images/site/reddit-logo.png",
			wikiTitle: "",
		},
	],

	// Tools
	[
		"cargo", {
			iconUrl: "https://doc.rust-lang.org/cargo/images/Cargo-Logo-Small.png",
			wikiTitle: "",
		},
	],
	[
		"man", {
			iconUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/Windows_Terminal_Logo_256x256.png",
			wikiTitle: "man page",
		},
	],
	[
		"cmake", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cmake/cmake-original.svg",
			wikiTitle: "CMake",
		},
	],
	[
		"make", {
			iconUrl: "^https://www.myiconfinder.com/uploads/iconsets/256-256-a2f0f447f4b1f528044828ccaa8dc865-Gnu.png",
			wikiTitle: "Make (software)",
		},
	],
	[
		"ganache", {
			iconUrl: "https://www.trufflesuite.com/img/ganache-logo-dark.svg",
			wikiTitle: "",
		},
	],
	[
		"latex", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/latex/latex-original.svg",
			wikiTitle: "LaTeX",
		},
	],
	[
		"photoshop", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-plain.svg",
			wikiTitle: "Adobe Photoshop",
		},
	],
	[
		"illustrator", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/illustrator/illustrator-plain.svg",
			wikiTitle: "Adobe Illustrator",
		},
	],
	[
		"ghpages", {
			iconUrl: "/assets/images/icons/ghpages.png",
			wikiTitle: "GitHub Pages",
		},
	],
	[
		"blender", {
			iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/blender/blender-original.svg",
			wikiTitle: "Blender (software)",
		},
	],
	[
		"dex", {
			iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/Android_logo_2019.svg",
			wikiTitle: "Dalvik (software)",
		},
	],

	// Socials
	["EMAIL", { iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/svgs/solid/envelope.svg" }],
	["GMAIL", { iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/svgs/solid/envelope.svg" }],
	["GITHUB", { iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/svgs/brands/github.svg" }],
	["GITLAB", { iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/svgs/brands/gitlab.svg" }],
	["LINKEDIN", { iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/svgs/brands/linkedin.svg" }],
	["DRIBBBLE", { iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/svgs/brands/dribbble.svg" }],
	["INSTAGRAM", { iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/svgs/brands/instagram.svg" }],
	["FACEBOOK", { iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/svgs/brands/facebook.svg" }],
	["TWITTER", { iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/svgs/brands/twitter.svg" }],
	["PINTEREST", { iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/svgs/brands/pinterest.svg" }],
]);
/* eslint-enable functional/prefer-immutable-types */
