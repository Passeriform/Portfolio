/* eslint-disable max-lines, max-len */

// NOTE: Don"t touch this interface unless a better design approach is reached

export enum WType {
	misc = "misc",
	product = "product",
	project = "project",
}

export enum License {
	apache2 = "apache2",
	free = "free",
	gpl3 = "gpl3",
	mit = "mit",
}

export enum Language {
	assemblyx86 = "assemblyx86",
	bash = "bash",
	batch = "batch",
	c = "c",
	cpp = "cpp",
	elua = "elua",
	go = "go",
	java = "java",
	javascript = "javascript",
	lua = "lua",
	php = "php",
	python = "python",
	qt4 = "qt4",
	ruby = "ruby",
	rust = "rust",
	shell = "shell",
	solidity = "solidity",
	typescript = "typescript",
}

export enum Framework {
	airsim = "airsim",
	angular = "angular",
	arduino = "arduino",
	blas = "blas",
	boost = "boost",
	crossterm = "crossterm",
	cuda = "cuda",
	django = "django",
	ethereum = "ethereum",
	ffmpeg = "ffmpeg",
	flask = "flask",
	googleapi = "googleapi",
	imlib = "imlib",
	lex = "lex",
	libav = "libav",
	libglass = "libglass",
	mathjax = "mathjax",
	numpy = "numpy",
	opencv = "opencv",
	praw = "praw",
	pygame = "pygame",
	pytorch = "pytorch",
	quovo = "quovo",
	rabbitmq = "rabbitmq",
	react = "react",
	rst = "rst",
	rxjs = "rxjs",
	sass = "sass",
	sympy = "sympy",
	truffle = "truffle",
	unreal = "unreal",
	webgl = "webgl",
	yacc = "yacc",
	zmq = "zmq",
}

export enum Tool {
	blender = "blender",
	cargo = "cargo",
	cmake = "cmake",
	dex = "dex",
	ganache = "ganache",
	ghpages = "ghpages",
	illustrator = "illustrator",
	latex = "latex",
	make = "make",
	man = "man",
	photoshop = "photoshop",
}

export enum Social {
	dribble = "dribble",
	email = "email",
	facebook = "facebook",
	github = "github",
	gitlab = "gitlab",
	gmail = "gmail",
	instagram = "instagram",
	linkedin = "linkedin",
	pinterest = "pinterest",
	twitter = "twitter",
}

export enum GhEvent {
	createEvent = "CreateEvent",
	deleteEvent = "DeleteEvent",
	forkEvent = "ForkEvent",
	issuesEvent = "IssuesEvent",
	pullRequestEvent = "PullRequestEvent",
	pushEvent = "PushEvent",
	releaseEvent = "ReleaseEvent",
	watchEvent = "WatchEvent",
}

// NOTE: Only used as a union type for all icon-registry based operations.
export type EntityIdentifierType = Framework | GhEvent | Language | License | Social | Tool | WType;

// NOTE: Enums are combined to provide pseudo-hashmaps, which can be iterated over easily by pipes like iconUri.
export const EntityIdentifier = {
	...WType,
	...License,
	...Language,
	...Framework,
	...Tool,
	...Social,
	...GhEvent,
};

export interface EntityRegistry {
	// Casual identifier
	readonly identifier: EntityIdentifierType;

	// Detailed description
	readonly description?: string;

	/*
	 * Icon URL for entity, either locally server or externally handled
	 * NOTE: Must maintain in case of external URL downtime
	 */
	readonly iconUrl?: string;

	/*
	 * Corresponding title on wikipedia used for caching of sorts
	 * Identifier is not quite robust to select the correct entity
	 * Specifically for Wikipedia API usage
	 * Eliminates usage for the `search` endpoint
	 */
	readonly wikiTitle?: string;
}

export const registry: readonly EntityRegistry[] = [
	{
		iconUrl: "/assets/images/icons/gh-create.png",
		identifier: GhEvent.createEvent,
	},
	{
		iconUrl: "/assets/images/icons/gh-delete.png",
		identifier: GhEvent.deleteEvent,
	},
	{
		iconUrl: "/assets/images/icons/gh-fork.png",
		identifier: GhEvent.forkEvent,
	},
	{
		iconUrl: "https://simpleicons.org/icons/gh-issue.svg",
		identifier: GhEvent.issuesEvent,
	},
	{
		iconUrl: "/assets/images/icons/gh-pr.png",
		identifier: GhEvent.pullRequestEvent,
	},
	{
		iconUrl: "/assets/images/icons/gh-push.png",
		identifier: GhEvent.pushEvent,
	},
	{
		iconUrl: "/assets/images/icons/gh-release.png",
		identifier: GhEvent.releaseEvent,
	},
	{
		iconUrl: "/assets/images/icons/gh-watch.png",
		identifier: GhEvent.watchEvent,
	},

	{
		iconUrl: "https://img.icons8.com/product",
		identifier: WType.product,
	},
	{
		iconUrl: "https://img.icons8.com/project",
		identifier: WType.project,
	},
	{
		iconUrl: "https://img.icons8.com/lab-items",
		identifier: WType.misc,
	},

	{
		iconUrl: "https://img.shields.io/badge/license-GPL 3-blue",
		identifier: License.gpl3,
	},
	{
		iconUrl: "https://img.shields.io/badge/license-Apache 2-blue",
		identifier: License.apache2,
	},
	{
		iconUrl: "https://img.shields.io/badge/license-MIT-green",
		identifier: License.mit,
	},
	{
		iconUrl: "https://img.shields.io/badge/license-Unlicensed-blue",
		identifier: License.free,
	},

	{
		iconUrl: "https://img.icons8.com/color/c-programming",
		identifier: Language.c,
		wikiTitle: "C (programming language)",
	},
	{
		iconUrl: "https://img.icons8.com/color/c-plus-plus-logo",
		identifier: Language.cpp,
		wikiTitle: "C++ (programming language)",
	},
	{
		iconUrl: "https://img.icons8.com/color/java-coffee-cup-logo",
		identifier: Language.java,
		wikiTitle: "Java (programming language)",
	},
	{
		iconUrl: "https://img.icons8.com/color/javascript",
		identifier: Language.javascript,
		wikiTitle: "Javascript (programming language)",
	},
	{
		iconUrl: "https://img.icons8.com/color/typescript",
		identifier: Language.typescript,
		wikiTitle: "Typescript (programming language)",
	},
	{
		iconUrl: "https://img.icons8.com/color/python",
		identifier: Language.python,
		wikiTitle: "Python (programming language)",
	},
	{
		iconUrl: "https://img.icons8.com/color/golang",
		identifier: Language.go,
		wikiTitle: "Go (programming language)",
	},
	{
		iconUrl: "https://www.rust-lang.org/logos/rust-logo-512x512.png",
		identifier: Language.rust,
		wikiTitle: "Rust (programming language)",
	},
	{
		iconUrl: "https://img.icons8.com/color/ruby-programming-language",
		identifier: Language.ruby,
		wikiTitle: "Ruby (programming language)",
	},
	{
		iconUrl: "https://bashlogo.com/img/symbol/svg/full_colored_light.svg",
		identifier: Language.shell,
		wikiTitle: "Shell script",
	},
	{
		iconUrl: "/assets/images/icons/solidity.png",
		identifier: Language.solidity,
		wikiTitle: "Solidity (programming language)",
	},
	{
		iconUrl: "https://cdn.worldvectorlogo.com/logos/php-1.svg",
		identifier: Language.php,
		wikiTitle: "PHP (programming language)",
	},
	{
		iconUrl: "https://www.rozek.de/Lua/Lua-Logo_128x128.png",
		identifier: Language.lua,
		wikiTitle: "Lua (programming language)",
	},
	{
		iconUrl: "^https:\\/\\/www.eluaproject.net/images/logo_eLua.png",
		identifier: Language.elua,
		wikiTitle: "",
	},
	{
		iconUrl: "https://hackr.io/tutorials/assembly-language/logo-assembly-language.svg",
		identifier: Language.assemblyx86,
		wikiTitle: "x86 assembly language",
	},
	{
		iconUrl: "https://bashlogo.com/img/symbol/svg/full_colored_light.svg",
		identifier: Language.bash,
		wikiTitle: "Bash (Unix shell)",
	},
	{
		iconUrl: "https://img.icons8.com/color/console",
		identifier: Language.batch,
		wikiTitle: "Batch file",
	},
	{
		iconUrl: "https://img.icons8.com/color/qt",
		identifier: Language.qt4,
		wikiTitle: "Qt (software)",
	},

	{
		iconUrl: "https://raw.githubusercontent.com/crossterm-rs/crossterm/master/docs/crossterm_full.png",
		identifier: Framework.crossterm,
		wikiTitle: "",
	},
	{
		iconUrl: "https://www.ics.com/sites/default/files/styles/blog_detail/public/images/0mq part 1.jpg",
		identifier: Framework.zmq,
		wikiTitle: "ZeroMQ",
	},
	{
		iconUrl: "https://theboostcpplibraries.com/static/main/img/boost-logo.svg",
		identifier: Framework.boost,
		wikiTitle: "Boost (C++ libraries)",
	},
	{
		iconUrl: "https://cdn.freebiesupply.com/logos/large/2x/rabbitmq-logo-png-transparent.png",
		identifier: Framework.rabbitmq,
		wikiTitle: "RabbitMQ",
	},
	{
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
		identifier: Framework.react,
		wikiTitle: "React (web framework)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/ReactiveX/rxjs/7f3d3e1c81660ada347bfa9e3cb1d8bf36433372/resources/CI-CD/logo/svg/RxJs_Logo_Basic.svg",
		identifier: Framework.rxjs,
		wikiTitle: "",
	},
	{
		iconUrl: "/assets/images/icons/mathjax.png",
		identifier: Framework.mathjax,
		wikiTitle: "MathJax",
	},
	{
		iconUrl: "https://static.djangoproject.com/img/logos/django-logo-positive.png",
		identifier: Framework.django,
		wikiTitle: "Django (web framework)",
	},
	{
		iconUrl: "https://lh3.googleusercontent.com/proxy/tENyiJJCmAZ-rk3rZTdAP5idz8arqkg612_PsHlRMQ9RSWdasmGRB8jmKOMzaGqrC9Duh7Ylr2EHeesDL08CRH2A",
		identifier: Framework.flask,
		wikiTitle: "Flask (web framework)",
	},
	{
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Sympy_logo.svg",
		identifier: Framework.sympy,
		wikiTitle: "SymPy",
	},
	{
		iconUrl: "/assets/images/icons/numpy.jpg",
		identifier: Framework.numpy,
		wikiTitle: "NumPy",
	},
	{
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Pygame_logo.gif",
		identifier: Framework.pygame,
		wikiTitle: "Pygame",
	},
	{
		iconUrl: "https://cdn2.unrealengine.com/Unreal+Engine%2Flogos%2FUnreal_Engine_White-1125x1280-0ac2243552326055d20928902aa57370acacd000.png",
		identifier: Framework.unreal,
		wikiTitle: "Unreal Engine",
	},
	{
		iconUrl: "^https:\\/\\/libglass.sourceforge.net/baseimages/libglass.jpg",
		identifier: Framework.libglass,
		wikiTitle: "^https:\\/\\/libglass.sourceforge.net/baseimages/libglass.jpg",
	},
	{
		iconUrl: "https://upload.wikimedia.org/wikipedia/en/b/b9/Nvidia_CUDA_Logo.jpg",
		identifier: Framework.cuda,
		wikiTitle: "CUDA",
	},
	{
		iconUrl: "https://xtensor-blas.readthedocs.io/en/latest/_images/xtensor-blas.svg",
		identifier: Framework.blas,
		wikiTitle: "Basic Linear Algebra Subprograms",
	},
	{
		iconUrl: "https://angular.io/assets/images/logos/angular/angular.svg",
		identifier: Framework.angular,
		wikiTitle: "Angular (web framework)",
	},
	{
		iconUrl: "https://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png",
		identifier: Framework.sass,
		wikiTitle: "Sass (stylesheet language)",
	},
	{
		iconUrl: "https://camo.githubusercontent.com/7240582453539ece449f39250a2b063427c83375/68747470733a2f2f74727566666c656672616d65776f726b2e636f6d2f696d672f74727566666c652d6c6f676f2d6461726b2e737667",
		identifier: Framework.truffle,
		wikiTitle: "",
	},
	{
		iconUrl: "https://ethereum.org/static/655aaefb744ae2f9f818095a436d38b5/e32d8/ethereum-icon-purple.png",
		identifier: Framework.ethereum,
		wikiTitle: "Ethereum",
	},
	{
		iconUrl: "https://docutils.sourceforge.io/rst.png",
		identifier: Framework.rst,
		wikiTitle: "reStructuredText",
	},
	{
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg",
		identifier: Framework.arduino,
		wikiTitle: "Arduino",
	},
	{
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/FFmpeg_icon.svg",
		identifier: Framework.ffmpeg,
		wikiTitle: "FFmpeg",
	},
	{
		iconUrl: "https://pbs.twimg.com/profile_images/1409208335/libav-logo.png",
		identifier: Framework.libav,
		wikiTitle: "Libav",
	},
	{
		iconUrl: "https://pytorch.org/assets/images/logo-icon.svg",
		identifier: Framework.pytorch,
		wikiTitle: "PyTorch",
	},
	{
		iconUrl: "https://opencv.org/wp-content/uploads/2019/02/opencv-logo-1.png",
		identifier: Framework.opencv,
		wikiTitle: "OpenCV",
	},
	{
		iconUrl: "/assets/images/icons/airsim.png",
		identifier: Framework.airsim,
		wikiTitle: "AirSim",
	},
	{
		iconUrl: "https://code.google.com/images/developers.png",
		identifier: Framework.googleapi,
		wikiTitle: "Google APIs",
	},
	{
		iconUrl: "https://api-docs.quovo.com/v2/agg/images/logo.png",
		identifier: Framework.quovo,
		wikiTitle: "",
	},
	{
		iconUrl: "https://docs.enlightenment.org/api/imlib2/html/imlib2.png",
		identifier: Framework.imlib,
		wikiTitle: "Enlightenment Foundation Libraries",
	},
	{
		iconUrl: "/assets/images/icons/webgl.png",
		identifier: Framework.webgl,
		wikiTitle: "WebGL",
	},
	{
		iconUrl: "https://www.redditinc.com/assets/images/site/reddit-logo.png",
		identifier: Framework.praw,
		wikiTitle: "",
	},

	{
		iconUrl: "https://doc.rust-lang.org/cargo/images/Cargo-Logo-Small.png",
		identifier: Tool.cargo,
		wikiTitle: "",
	},
	{
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/Windows_Terminal_Logo_256x256.png",
		identifier: Tool.man,
		wikiTitle: "man page",
	},
	{
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Breezeicons-apps-48-cmake.svg",
		identifier: Tool.cmake,
		wikiTitle: "CMake",
	},
	{
		iconUrl: "^https:\\/\\/www.myiconfinder.com/uploads/iconsets/256-256-a2f0f447f4b1f528044828ccaa8dc865-Gnu.png",
		identifier: Tool.make,
		wikiTitle: "Make (software)",
	},
	{
		iconUrl: "https://www.trufflesuite.com/img/ganache-logo-dark.svg",
		identifier: Tool.ganache,
		wikiTitle: "",
	},
	{
		iconUrl: "/assets/images/icons/latex.png",
		identifier: Tool.latex,
		wikiTitle: "LaTeX",
	},
	{
		iconUrl: "https://www.adobe.com/content/dam/cc/icons/photoshop-mobile.svg",
		identifier: Tool.photoshop,
		wikiTitle: "Adobe Photoshop",
	},
	{
		iconUrl: "https://www.adobe.com/content/dam/cc/icons/illustrator.svg",
		identifier: Tool.illustrator,
		wikiTitle: "Adobe Illustrator",
	},
	{
		iconUrl: "/assets/images/icons/ghpages.png",
		identifier: Tool.ghpages,
		wikiTitle: "GitHub Pages",
	},
	{
		iconUrl: "https://download.blender.org/branding/blender_logo.png",
		identifier: Tool.blender,
		wikiTitle: "Blender (software)",
	},
	{
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/Android_logo_2019.svg",
		identifier: Tool.dex,
		wikiTitle: "Dalvik (software)",
	},

	{
		iconUrl: "https://simpleicons.org/icons/minutemailer.svg",
		identifier: Social.email,
	},
	{
		iconUrl: "https://simpleicons.org/icons/gmail.svg",
		identifier: Social.gmail,
	},
	{
		iconUrl: "https://simpleicons.org/icons/github.svg",
		identifier: Social.github,
	},
	{
		iconUrl: "https://simpleicons.org/icons/gitlab.svg",
		identifier: Social.gitlab,
	},
	{
		iconUrl: "https://simpleicons.org/icons/linkedin.svg",
		identifier: Social.linkedin,
	},
	{
		iconUrl: "https://simpleicons.org/icons/dribble.svg",
		identifier: Social.dribble,
	},
	{
		iconUrl: "https://simpleicons.org/icons/instagram.svg",
		identifier: Social.instagram,
	},
	{
		iconUrl: "https://simpleicons.org/icons/facebook.svg",
		identifier: Social.facebook,
	},
	{
		iconUrl: "https://simpleicons.org/icons/twitter.svg",
		identifier: Social.twitter,
	},
	{
		iconUrl: "https://simpleicons.org/icons/pinterest.svg",
		identifier: Social.pinterest,
	},
];

/* eslint-enable max-lines, max-len */
