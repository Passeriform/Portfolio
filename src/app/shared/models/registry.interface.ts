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
	dribbble = "dribbble",
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

const githubRegistry: readonly EntityRegistry[] = [
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
		iconUrl: "/assets/images/icons/gh-pr.png",
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
];

const workTypeRegistry: readonly EntityRegistry[] = [
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
];

const licenseRegistry: readonly EntityRegistry[] = [
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
];

const languageRegistry: readonly EntityRegistry[] = [
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
		identifier: Language.c,
		wikiTitle: "C (programming language)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
		identifier: Language.cpp,
		wikiTitle: "C++ (programming language)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
		identifier: Language.java,
		wikiTitle: "Java (programming language)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
		identifier: Language.javascript,
		wikiTitle: "Javascript (programming language)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
		identifier: Language.typescript,
		wikiTitle: "Typescript (programming language)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
		identifier: Language.python,
		wikiTitle: "Python (programming language)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
		identifier: Language.go,
		wikiTitle: "Go (programming language)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-plain.svg",
		identifier: Language.rust,
		wikiTitle: "Rust (programming language)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg",
		identifier: Language.ruby,
		wikiTitle: "Ruby (programming language)",
	},
	{
		iconUrl: "https://bashlogo.com/img/symbol/svg/full_colored_light.svg",
		identifier: Language.shell,
		wikiTitle: "Shell script",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/solidity/solidity-original.svg",
		identifier: Language.solidity,
		wikiTitle: "Solidity (programming language)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",
		identifier: Language.php,
		wikiTitle: "PHP (programming language)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/lua/lua-original.svg",
		identifier: Language.lua,
		wikiTitle: "Lua (programming language)",
	},
	{
		iconUrl: "https://www.eluaproject.net/images/logo_eLua.png",
		identifier: Language.elua,
		wikiTitle: "",
	},
	{
		iconUrl: "https://hackr.io/tutorials/assembly-language/logo-assembly-language.svg",
		identifier: Language.assemblyx86,
		wikiTitle: "x86 assembly language",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bash/bash-original.svg",
		identifier: Language.bash,
		wikiTitle: "Bash (Unix shell)",
	},
	{
		iconUrl: "https://img.icons8.com/color/console",
		identifier: Language.batch,
		wikiTitle: "Batch file",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/qt/qt-original.svg",
		identifier: Language.qt4,
		wikiTitle: "Qt (software)",
	},
];

const frameworkRegistry: readonly EntityRegistry[] = [
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
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
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
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg",
		identifier: Framework.django,
		wikiTitle: "Django (web framework)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg",
		identifier: Framework.flask,
		wikiTitle: "Flask (web framework)",
	},
	{
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Sympy_logo.svg",
		identifier: Framework.sympy,
		wikiTitle: "SymPy",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg",
		identifier: Framework.numpy,
		wikiTitle: "NumPy",
	},
	{
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Pygame_logo.gif",
		identifier: Framework.pygame,
		wikiTitle: "Pygame",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/unrealengine/unrealengine-original.svg",
		identifier: Framework.unreal,
		wikiTitle: "Unreal Engine",
	},
	{
		iconUrl: "^https://libglass.sourceforge.net/baseimages/libglass.jpg",
		identifier: Framework.libglass,
		wikiTitle: "^https://libglass.sourceforge.net/baseimages/libglass.jpg",
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
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg",
		identifier: Framework.angular,
		wikiTitle: "Angular (web framework)",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg",
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
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg",
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
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg",
		identifier: Framework.pytorch,
		wikiTitle: "PyTorch",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg",
		identifier: Framework.opencv,
		wikiTitle: "OpenCV",
	},
	{
		iconUrl: "/assets/images/icons/airsim.png",
		identifier: Framework.airsim,
		wikiTitle: "AirSim",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg",
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
];

const toolRegistry: readonly EntityRegistry[] = [
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
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cmake/cmake-original.svg",
		identifier: Tool.cmake,
		wikiTitle: "CMake",
	},
	{
		iconUrl: "^https://www.myiconfinder.com/uploads/iconsets/256-256-a2f0f447f4b1f528044828ccaa8dc865-Gnu.png",
		identifier: Tool.make,
		wikiTitle: "Make (software)",
	},
	{
		iconUrl: "https://www.trufflesuite.com/img/ganache-logo-dark.svg",
		identifier: Tool.ganache,
		wikiTitle: "",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/latex/latex-original.svg",
		identifier: Tool.latex,
		wikiTitle: "LaTeX",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-plain.svg",
		identifier: Tool.photoshop,
		wikiTitle: "Adobe Photoshop",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/illustrator/illustrator-plain.svg",
		identifier: Tool.illustrator,
		wikiTitle: "Adobe Illustrator",
	},
	{
		iconUrl: "/assets/images/icons/ghpages.png",
		identifier: Tool.ghpages,
		wikiTitle: "GitHub Pages",
	},
	{
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/blender/blender-original.svg",
		identifier: Tool.blender,
		wikiTitle: "Blender (software)",
	},
	{
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/Android_logo_2019.svg",
		identifier: Tool.dex,
		wikiTitle: "Dalvik (software)",
	},
];

const socialRegistry: readonly EntityRegistry[] = [
	{
		iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/envelope.svg",
		identifier: Social.email,
	},
	{
		iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/envelope.svg",
		identifier: Social.gmail,
	},
	{
		iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/github.svg",
		identifier: Social.github,
	},
	{
		iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/gitlab.svg",
		identifier: Social.gitlab,
	},
	{
		iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/linkedin.svg",
		identifier: Social.linkedin,
	},
	{
		iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/dribbble.svg",
		identifier: Social.dribbble,
	},
	{
		iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/instagram.svg",
		identifier: Social.instagram,
	},
	{
		iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/facebook.svg",
		identifier: Social.facebook,
	},
	{
		iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/twitter.svg",
		identifier: Social.twitter,
	},
	{
		iconUrl: "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/pinterest.svg",
		identifier: Social.pinterest,
	},
];

export const registry: readonly EntityRegistry[] = [
	...githubRegistry,
	...workTypeRegistry,
	...licenseRegistry,
	...languageRegistry,
	...frameworkRegistry,
	...toolRegistry,
	...socialRegistry,
];

// TODO: Invert the registry building instead of this utility function.
export const inverseGet = (queryValue) => Object.keys(EntityIdentifier).find(
	(key: keyof typeof EntityIdentifier) => EntityIdentifier[key] === queryValue
) ?? (() => { throw new Error("Entry not found in registry.") })()
