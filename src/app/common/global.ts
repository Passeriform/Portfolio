/* tslint:disable:max-line-length */

export const nonKeywords = [
  'a',
  'am',
  'an',
  'and',
  'are',
  'better',
  'between',
  'based',
  'dead',
  'for',
  'from',
  'i',
  'in',
  'into',
  'more',
  'of',
  'off',
  'on',
  'one',
  'or',
  's',
  'suited',
  'small',
  'that',
  'this',
  'to',
  'using',
  'with',
  'within',
  'yet',
  'you',
];

export const Constants = {
  API_URL: 'https://passeriform-portfolio-api.herokuapp.com'
  // API_URL: "http://localhost:3000"
};

export enum WType {
  product = 'product',
  project = 'project',
  misc = 'misc'
}

export enum License {
  gpl3 = 'gpl3',
  apache2 = 'apache2',
  mit = 'mit',
  free = 'free'
}

export enum Language {
  c = 'c',
  cpp = 'cpp',
  java = 'java',
  javascript = 'javascript',
  typescript = 'typescript',
  python = 'python',
  go = 'go',
  rust = 'rust',
  ruby = 'ruby',
  shell = 'shell',
  solidity = 'solidity',
  php = 'php',
  lua = 'lua',
  elua = 'elua',
  assemblyx86 = 'assemblyx86',
  bash = 'bash',
  batch = 'batch',
  qt4 = 'qt4'
}

export enum Framework {
  crossterm = 'crossterm',
  zmq = 'zmq',
  yacc = 'yacc',
  lex = 'lex',
  boost = 'boost',
  rabbitmq = 'rabbitmq',
  react = 'react',
  rxjs = 'rxjs',
  mathjax = 'mathjax',
  django = 'django',
  flask = 'flask',
  sympy = 'sympy',
  numpy = 'numpy',
  pygame = 'pygame',
  unreal = 'unreal',
  libglass = 'libglass',
  cuda = 'cuda',
  blas = 'blas',
  angular = 'angular',
  sass = 'sass',
  truffle = 'truffle',
  ethereum = 'ethereum',
  rst = 'rst',
  arduino = 'arduino',
  ffmpeg = 'ffmpeg',
  libav = 'libav',
  pytorch = 'pytorch',
  opencv = 'opencv',
  airsim = 'airsim',
  googleapi = 'googleapi',
  quovo = 'quovo',
  imlib = 'imlib',
  webgl = 'webgl',
  praw = 'praw',
}

export enum Tool {
  cargo = 'cargo',
  man = 'man',
  cmake = 'cmake',
  make = 'make',
  ganache = 'ganache',
  latex = 'latex',
  photoshop = 'photoshop',
  illustrator = 'illustrator',
  ghpages = 'ghpages',
  blender = 'blender',
  dex = 'dex',
}

export enum Social {
  email = 'email',
  gmail = 'gmail',
  github = 'github',
  gitlab = 'gitlab',
  linkedin = 'linkedin',
  dribble = 'dribble',
  instagram = 'instagram',
  facebook = 'facebook',
  twitter = 'twitter',
  pinterest = 'pinterest',
}

export enum GhEvent {
  CreateEvent = 'CreateEvent',
  DeleteEvent = 'DeleteEvent',
  ForkEvent = 'ForkEvent',
  IssuesEvent = 'IssuesEvent',
  PullRequestEvent = 'PullRequestEvent',
  PushEvent = 'PushEvent',
  ReleaseEvent = 'ReleaseEvent',
  WatchEvent = 'WatchEvent',
}

// NOTE: Only used as a union type for all icon-registry based operations.
export type EntityIdentifier = WType | License | Language | Framework | Tool | Social | GhEvent;

// NOTE: Enums are combined the way they are to provide pseudo-hashmaps,
// which can be iterated over easily by pipes like iconUri.
export const EntityIdentifier = { ...WType, ...License, ...Language, ...Framework, ...Tool, ...Social, ...GhEvent };

interface EntityRegistry {
  // Casual identifier
  identifier: EntityIdentifier;
  // Detailed description
  description?: string;
  // Corresponding title on wikipedia used for caching of sorts
  // Identifier is not quite robust to select the correct entity
  // Specifically for Wikipedia API usage
  // Eliminates usage fo the `search` endpoint
  wikiTitle?: string;
  // Icon URL for entity, either locally server or externally handled
  // NOTE: Must maintain in case of external URL downtime
  iconUrl?: string;
}

export const registry: EntityRegistry[] = [
  { identifier: GhEvent.CreateEvent, iconUrl: '/assets/images/icons/gh-create.png' },
  { identifier: GhEvent.DeleteEvent, iconUrl: '/assets/images/icons/gh-delete.png' },
  { identifier: GhEvent.ForkEvent, iconUrl: '/assets/images/icons/gh-fork.png' },
  { identifier: GhEvent.IssuesEvent, iconUrl: 'https://simpleicons.org/icons/gh-issue.svg' },
  { identifier: GhEvent.PullRequestEvent, iconUrl: '/assets/images/icons/gh-pr.png' },
  { identifier: GhEvent.PushEvent, iconUrl: '/assets/images/icons/gh-push.png' },
  { identifier: GhEvent.ReleaseEvent, iconUrl: '/assets/images/icons/gh-release.png' },
  { identifier: GhEvent.WatchEvent, iconUrl: '/assets/images/icons/gh-watch.png' },

  { identifier: WType.product, iconUrl: 'https://img.icons8.com/product' },
  { identifier: WType.project, iconUrl: 'https://img.icons8.com/project' },
  { identifier: WType.misc, iconUrl: 'https://img.icons8.com/lab-items' },

  { identifier: License.gpl3, iconUrl: 'https://img.shields.io/badge/license-GPL 3-blue' },
  { identifier: License.apache2, iconUrl: 'https://img.shields.io/badge/license-Apache 2-blue' },
  { identifier: License.mit, iconUrl: 'https://img.shields.io/badge/license-MIT-green' },
  { identifier: License.free, iconUrl: 'https://img.shields.io/badge/license-Unlicensed-blue' },

  { identifier: Language.c, iconUrl: 'https://img.icons8.com/color/c-programming', wikiTitle: 'C (programming language)' },
  { identifier: Language.cpp, iconUrl: 'https://img.icons8.com/color/c-plus-plus-logo', wikiTitle: 'C++ (programming language)' },
  { identifier: Language.java, iconUrl: 'https://img.icons8.com/color/java-coffee-cup-logo', wikiTitle: 'Java (programming language)' },
  { identifier: Language.javascript, iconUrl: 'https://img.icons8.com/color/javascript', wikiTitle: 'Javascript (programming language)' },
  { identifier: Language.typescript, iconUrl: 'https://img.icons8.com/color/typescript', wikiTitle: 'Typescript (programming language)' },
  { identifier: Language.python, iconUrl: 'https://img.icons8.com/color/python', wikiTitle: 'Python (programming language)' },
  { identifier: Language.go, iconUrl: 'https://img.icons8.com/color/golang', wikiTitle: 'Go (programming language)' },
  { identifier: Language.rust, iconUrl: 'https://www.rust-lang.org/logos/rust-logo-512x512.png', wikiTitle: 'Rust (programming language)' },
  { identifier: Language.ruby, iconUrl: 'https://img.icons8.com/color/ruby-programming-language', wikiTitle: 'Ruby (programming language)' },
  { identifier: Language.shell, iconUrl: 'https://bashlogo.com/img/symbol/svg/full_colored_light.svg', wikiTitle: 'Shell script' },
  { identifier: Language.solidity, iconUrl: '/assets/images/icons/solidity.png', wikiTitle: 'Solidity (programming language)' },
  { identifier: Language.php, iconUrl: 'https://cdn.worldvectorlogo.com/logos/php-1.svg', wikiTitle: 'PHP (programming language)' },
  { identifier: Language.lua, iconUrl: 'https://www.rozek.de/Lua/Lua-Logo_128x128.png', wikiTitle: 'Lua (programming language)' },
  { identifier: Language.elua, iconUrl: 'http://www.eluaproject.net/images/logo_eLua.png', wikiTitle: '' },
  { identifier: Language.assemblyx86, iconUrl: 'https://hackr.io/tutorials/assembly-language/logo-assembly-language.svg', wikiTitle: 'x86 assembly language' },
  { identifier: Language.bash, iconUrl: 'https://bashlogo.com/img/symbol/svg/full_colored_light.svg', wikiTitle: 'Bash (Unix shell)' },
  { identifier: Language.batch, iconUrl: 'https://img.icons8.com/color/console', wikiTitle: 'Batch file' },
  { identifier: Language.qt4, iconUrl: 'https://img.icons8.com/color/qt', wikiTitle: 'Qt (software)' },

  { identifier: Framework.crossterm, iconUrl: 'https://raw.githubusercontent.com/crossterm-rs/crossterm/master/docs/crossterm_full.png', wikiTitle: '' },
  { identifier: Framework.zmq, iconUrl: 'https://www.ics.com/sites/default/files/styles/blog_detail/public/images/0mq part 1.jpg', wikiTitle: 'ZeroMQ' },
  { identifier: Framework.boost, iconUrl: 'https://theboostcpplibraries.com/static/main/img/boost-logo.svg', wikiTitle: 'Boost (C++ libraries)' },
  { identifier: Framework.rabbitmq, iconUrl: 'https://cdn.freebiesupply.com/logos/large/2x/rabbitmq-logo-png-transparent.png', wikiTitle: 'RabbitMQ' },
  { identifier: Framework.react, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', wikiTitle: 'React (web framework)' },
  { identifier: Framework.rxjs, iconUrl: 'https://raw.githubusercontent.com/ReactiveX/rxjs/7f3d3e1c81660ada347bfa9e3cb1d8bf36433372/resources/CI-CD/logo/svg/RxJs_Logo_Basic.svg', wikiTitle: '' },
  { identifier: Framework.mathjax, iconUrl: '/assets/images/icons/mathjax.png', wikiTitle: 'MathJax' },
  { identifier: Framework.django, iconUrl: 'https://static.djangoproject.com/img/logos/django-logo-positive.png', wikiTitle: 'Django (web framework)' },
  { identifier: Framework.flask, iconUrl: 'https://lh3.googleusercontent.com/proxy/tENyiJJCmAZ-rk3rZTdAP5idz8arqkg612_PsHlRMQ9RSWdasmGRB8jmKOMzaGqrC9Duh7Ylr2EHeesDL08CRH2A', wikiTitle: 'Flask (web framework)' },
  { identifier: Framework.sympy, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Sympy_logo.svg', wikiTitle: 'SymPy' },
  { identifier: Framework.numpy, iconUrl: '/assets/images/icons/numpy.jpg', wikiTitle: 'NumPy' },
  { identifier: Framework.pygame, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Pygame_logo.gif', wikiTitle: 'Pygame' },
  { identifier: Framework.unreal, iconUrl: 'https://cdn2.unrealengine.com/Unreal+Engine%2Flogos%2FUnreal_Engine_White-1125x1280-0ac2243552326055d20928902aa57370acacd000.png', wikiTitle: 'Unreal Engine' },
  { identifier: Framework.libglass, iconUrl: 'http://libglass.sourceforge.net/baseimages/libglass.jpg', wikiTitle: 'http://libglass.sourceforge.net/baseimages/libglass.jpg' },
  { identifier: Framework.cuda, iconUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Nvidia_CUDA_Logo.jpg', wikiTitle: 'CUDA' },
  { identifier: Framework.blas, iconUrl: 'https://xtensor-blas.readthedocs.io/en/latest/_images/xtensor-blas.svg', wikiTitle: 'Basic Linear Algebra Subprograms' },
  { identifier: Framework.angular, iconUrl: 'https://angular.io/assets/images/logos/angular/angular.svg', wikiTitle: 'Angular (web framework)' },
  { identifier: Framework.sass, iconUrl: 'https://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png', wikiTitle: 'Sass (stylesheet language)' },
  { identifier: Framework.truffle, iconUrl: 'https://camo.githubusercontent.com/7240582453539ece449f39250a2b063427c83375/68747470733a2f2f74727566666c656672616d65776f726b2e636f6d2f696d672f74727566666c652d6c6f676f2d6461726b2e737667', wikiTitle: '' },
  { identifier: Framework.ethereum, iconUrl: 'https://ethereum.org/static/655aaefb744ae2f9f818095a436d38b5/e32d8/ethereum-icon-purple.png', wikiTitle: 'Ethereum' },
  { identifier: Framework.rst, iconUrl: 'https://docutils.sourceforge.io/rst.png', wikiTitle: 'reStructuredText' },
  { identifier: Framework.arduino, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg', wikiTitle: 'Arduino' },
  { identifier: Framework.ffmpeg, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/FFmpeg_icon.svg', wikiTitle: 'FFmpeg' },
  { identifier: Framework.libav, iconUrl: 'https://pbs.twimg.com/profile_images/1409208335/libav-logo.png', wikiTitle: 'Libav' },
  { identifier: Framework.pytorch, iconUrl: 'https://pytorch.org/assets/images/logo-icon.svg', wikiTitle: 'PyTorch' },
  { identifier: Framework.opencv, iconUrl: 'https://opencv.org/wp-content/uploads/2019/02/opencv-logo-1.png', wikiTitle: 'OpenCV' },
  { identifier: Framework.airsim, iconUrl: '/assets/images/icons/airsim.png', wikiTitle: 'AirSim' },
  { identifier: Framework.googleapi, iconUrl: 'https://code.google.com/images/developers.png', wikiTitle: 'Google APIs' },
  { identifier: Framework.quovo, iconUrl: 'https://api-docs.quovo.com/v2/agg/images/logo.png', wikiTitle: '' },
  { identifier: Framework.imlib, iconUrl: 'https://docs.enlightenment.org/api/imlib2/html/imlib2.png', wikiTitle: 'Enlightenment Foundation Libraries' },
  { identifier: Framework.webgl, iconUrl: '/assets/images/icons/webgl.png', wikiTitle: 'WebGL' },
  { identifier: Framework.praw, iconUrl: 'https://www.redditinc.com/assets/images/site/reddit-logo.png', wikiTitle: '' },

  { identifier: Tool.cargo, iconUrl: 'https://doc.rust-lang.org/cargo/images/Cargo-Logo-Small.png', wikiTitle: '' },
  { identifier: Tool.man, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Windows_Terminal_Logo_256x256.png', wikiTitle: 'man page' },
  { identifier: Tool.cmake, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Breezeicons-apps-48-cmake.svg', wikiTitle: 'CMake' },
  { identifier: Tool.make, iconUrl: 'http://www.myiconfinder.com/uploads/iconsets/256-256-a2f0f447f4b1f528044828ccaa8dc865-Gnu.png', wikiTitle: 'Make (software)' },
  { identifier: Tool.ganache, iconUrl: 'https://www.trufflesuite.com/img/ganache-logo-dark.svg', wikiTitle: '' },
  { identifier: Tool.latex, iconUrl: '/assets/images/icons/latex.png', wikiTitle: 'LaTeX' },
  { identifier: Tool.photoshop, iconUrl: 'https://www.adobe.com/content/dam/cc/icons/photoshop-mobile.svg', wikiTitle: 'Adobe Photoshop' },
  { identifier: Tool.illustrator, iconUrl: 'https://www.adobe.com/content/dam/cc/icons/illustrator.svg', wikiTitle: 'Adobe Illustrator' },
  { identifier: Tool.ghpages, iconUrl: '/assets/images/icons/ghpages.png', wikiTitle: 'GitHub Pages' },
  { identifier: Tool.blender, iconUrl: 'https://download.blender.org/branding/blender_logo.png', wikiTitle: 'Blender (software)' },
  { identifier: Tool.dex, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Android_logo_2019.svg', wikiTitle: 'Dalvik (software)' },

  { identifier: Social.email, iconUrl: 'https://simpleicons.org/icons/minutemailer.svg' },
  { identifier: Social.gmail, iconUrl: 'https://simpleicons.org/icons/gmail.svg' },
  { identifier: Social.github, iconUrl: 'https://simpleicons.org/icons/github.svg' },
  { identifier: Social.gitlab, iconUrl: 'https://simpleicons.org/icons/gitlab.svg' },
  { identifier: Social.linkedin, iconUrl: 'https://simpleicons.org/icons/linkedin.svg' },
  { identifier: Social.dribble, iconUrl: 'https://simpleicons.org/icons/dribble.svg' },
  { identifier: Social.instagram, iconUrl: 'https://simpleicons.org/icons/instagram.svg' },
  { identifier: Social.facebook, iconUrl: 'https://simpleicons.org/icons/facebook.svg' },
  { identifier: Social.twitter, iconUrl: 'https://simpleicons.org/icons/twitter.svg' },
  { identifier: Social.pinterest, iconUrl: 'https://simpleicons.org/icons/pinterest.svg' },
];
