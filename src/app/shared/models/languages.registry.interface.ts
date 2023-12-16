import { faErlang, faGolang, faJava, faJs, faPhp, faPython, faRust } from "@fortawesome/free-brands-svg-icons";

export const languagesRegistry = {
	assemblyx86: {
		iconUrl: "https://hackr.io/tutorials/assembly-language/logo-assembly-language.svg",
		wikiTitle: "x86 assembly language",
	},
	bash: {
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bash/bash-original.svg",
		wikiTitle: "Bash (Unix shell)",
	},
	batch: {
		iconUrl: "https://img.icons8.com/color/console",
		wikiTitle: "Batch file",
	},
	// eslint-disable-next-line id-length
	c: {
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
		wikiTitle: "C (programming language)",
	},
	cpp: {
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
		wikiTitle: "C++ (programming language)",
	},
	elua: {
		iconUrl: "https://www.eluaproject.net/images/logo_eLua.png",
		wikiTitle: "",
	},
	erlang: {
		iconUrl: faErlang,
		wikiTitle: "Erlang (programming language)",
	},
	go: {
		iconUrl: faGolang,
		wikiTitle: "Go (programming language)",
	},
	java: {
		iconUrl: faJava,
		wikiTitle: "Java (programming language)",
	},
	javascript: {
		iconUrl: faJs,
		wikiTitle: "Javascript (programming language)",
	},
	lua: {
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/lua/lua-original.svg",
		wikiTitle: "Lua (programming language)",
	},
	php: {
		iconUrl: faPhp,
		wikiTitle: "PHP (programming language)",
	},
	python: {
		iconUrl: faPython,
		wikiTitle: "Python (programming language)",
	},
	qt4: {
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/qt/qt-original.svg",
		wikiTitle: "Qt (software)",
	},
	ruby: {
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg",
		wikiTitle: "Ruby (programming language)",
	},
	rust: {
		iconUrl: faRust,
		wikiTitle: "Rust (programming language)",
	},
	shell: {
		iconUrl: "https://bashlogo.com/img/symbol/svg/full_colored_light.svg",
		wikiTitle: "Shell script",
	},
	solidity: {
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/solidity/solidity-original.svg",
		wikiTitle: "Solidity (programming language)",
	},
	typescript: {
		iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
		wikiTitle: "Typescript (programming language)",
	},
} as const;
