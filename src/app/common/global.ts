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

export enum WType {
  product,
  project,
  misc
}

export enum License {
  gpl3 = 3,
  apache2,
  mit,
  free
}

export enum Language {
  c = 7,
  cpp,
  java,
  javascript,
  typescript,
  python,
  go,
  rust,
  ruby,
  shell,
  php,
  lua,
  elua,
  assemblyx86,
  bash,
  batch,
  qt4
}

export enum Framework {
  crossterm = 24,
  zmq,
  yacc,
  lex,
  boost,
  rabbitmq,
  react,
  rxjs,
  mathjax,
  django,
  flask,
  sympy,
  numpy,
  pygame,
  unreal,
  libglass,
  cuda,
  blas,
  angular,
  sass,
  rst,
  arduino,
  ffmpeg,
  libav,
  pytorch,
  opencv,
  airsim,
  googleapi,
  quovo,
  imlib,
  webgl,
  praw,
}

export enum Tool {
  cargo = 56,
  man,
  cmake,
  make,
  latex,
  photoshop,
  illustrator,
  ghpages,
  blender,
  dex,
}

export enum Social {
  email = 66,
  gmail,
  github,
  gitlab,
  linkedin,
  dribble,
  instagram,
  facebook,
  twitter,
  pinterest,
}

export interface Project {
  type: WType;
  route: string;
  title: string;
  description: string;
  license: Array<License>;
  repository: string;
  languages: Array<Language>;
  frameworks: Array<Framework>;
  tools: Array<Tool>;
  tags: Array<string>;
  children: Array<string>;
  dependency: Array<string>;
}

export type IconIdentifier = WType | License | Language | Framework | Tool | Social;

export const IconIdentifier = { ...WType, ...License, ...Language, ...Framework, ...Tool, ...Social };


interface IconRegistry {
  iconstr: IconIdentifier;
  iconUrl: string;
}

export const registry: Array<IconRegistry> = [
  {iconstr: WType.product, iconUrl: 'https://img.icons8.com/product'},
  {iconstr: WType.project, iconUrl: 'https://img.icons8.com/project'},
  {iconstr: WType.misc, iconUrl: 'https://img.icons8.com/lab-items'},

  {iconstr: License.gpl3, iconUrl: 'https://img.shields.io/badge/license-GPL 3-blue'},
  {iconstr: License.apache2, iconUrl: 'https://img.shields.io/badge/license-Apache 2-blue'},
  {iconstr: License.mit, iconUrl: 'https://img.shields.io/badge/license-MIT-green'},
  {iconstr: License.free, iconUrl: 'https://img.shields.io/badge/license-Unlicensed-blue'},

  {iconstr: Language.c, iconUrl: 'https://img.icons8.com/color/c-programming'},
  {iconstr: Language.cpp, iconUrl: 'https://img.icons8.com/color/c-plus-plus-logo'},
  {iconstr: Language.java, iconUrl: 'https://img.icons8.com/color/java-coffee-cup-logo'},
  {iconstr: Language.javascript, iconUrl: 'https://img.icons8.com/color/javascript'},
  {iconstr: Language.typescript, iconUrl: 'https://img.icons8.com/color/typescript'},
  {iconstr: Language.python, iconUrl: 'https://img.icons8.com/color/python'},
  {iconstr: Language.go, iconUrl: 'https://img.icons8.com/color/golang'},
  {iconstr: Language.rust, iconUrl: 'https://www.rust-lang.org/logos/rust-logo-512x512.png'},
  {iconstr: Language.ruby, iconUrl: 'https://img.icons8.com/color/ruby-programming-language'},
  {iconstr: Language.shell, iconUrl: 'https://bashlogo.com/img/symbol/svg/full_colored_light.svg'},
  {iconstr: Language.php, iconUrl: 'https://cdn.worldvectorlogo.com/logos/php-1.svg'},
  {iconstr: Language.lua, iconUrl: 'https://www.rozek.de/Lua/Lua-Logo_128x128.png'},
  {iconstr: Language.elua, iconUrl: 'http://www.eluaproject.net/images/logo_eLua.png'},
  {iconstr: Language.assemblyx86, iconUrl: 'https://hackr.io/tutorials/assembly-language/logo-assembly-language.svg'},
  {iconstr: Language.bash, iconUrl: 'https://bashlogo.com/img/symbol/svg/full_colored_light.svg'},
  {iconstr: Language.batch, iconUrl: 'https://img.icons8.com/color/console'},
  {iconstr: Language.qt4, iconUrl: 'https://img.icons8.com/color/qt'},

  {iconstr: Framework.crossterm, iconUrl: 'https://raw.githubusercontent.com/crossterm-rs/crossterm/master/docs/crossterm_full.png'},
  {iconstr: Framework.zmq, iconUrl: 'https://www.ics.com/sites/default/files/styles/blog_detail/public/images/0mq part 1.jpg'},
  {iconstr: Framework.boost, iconUrl: 'https://theboostcpplibraries.com/static/main/img/boost-logo.svg'},
  {iconstr: Framework.rabbitmq, iconUrl: 'https://cdn.freebiesupply.com/logos/large/2x/rabbitmq-logo-png-transparent.png'},
  {iconstr: Framework.react, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'},
  {iconstr: Framework.rxjs, iconUrl: 'https://raw.githubusercontent.com/ReactiveX/rxjs/7f3d3e1c81660ada347bfa9e3cb1d8bf36433372/resources/CI-CD/logo/svg/RxJs_Logo_Basic.svg'},
  {iconstr: Framework.mathjax, iconUrl: '/assets/images/icons/mathjax.png'},
  {iconstr: Framework.django, iconUrl: 'https://static.djangoproject.com/img/logos/django-logo-positive.png'},
  {iconstr: Framework.flask, iconUrl: 'https://lh3.googleusercontent.com/proxy/tENyiJJCmAZ-rk3rZTdAP5idz8arqkg612_PsHlRMQ9RSWdasmGRB8jmKOMzaGqrC9Duh7Ylr2EHeesDL08CRH2A'},
  {iconstr: Framework.sympy, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Sympy_logo.svg'},
  {iconstr: Framework.numpy, iconUrl: '/assets/images/icons/numpy.jpg'},
  {iconstr: Framework.pygame, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Pygame_logo.gif'},
  {iconstr: Framework.unreal, iconUrl: 'https://cdn2.unrealengine.com/Unreal+Engine%2Flogos%2FUnreal_Engine_White-1125x1280-0ac2243552326055d20928902aa57370acacd000.png'},
  {iconstr: Framework.libglass, iconUrl: 'http://libglass.sourceforge.net/baseimages/libglass.jpg'},
  {iconstr: Framework.cuda, iconUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Nvidia_CUDA_Logo.jpg'},
  {iconstr: Framework.blas, iconUrl: 'https://xtensor-blas.readthedocs.io/en/latest/_images/xtensor-blas.svg'},
  {iconstr: Framework.angular, iconUrl: 'https://angular.io/assets/images/logos/angular/angular.svg'},
  {iconstr: Framework.sass, iconUrl: 'https://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png'},
  {iconstr: Framework.rst, iconUrl: 'https://docutils.sourceforge.io/rst.png'},
  {iconstr: Framework.arduino, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Arduino_Logo.svg'},
  {iconstr: Framework.ffmpeg, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/FFmpeg_icon.svg'},
  {iconstr: Framework.libav, iconUrl: 'https://pbs.twimg.com/profile_images/1409208335/libav-logo.png'},
  {iconstr: Framework.pytorch, iconUrl: 'https://pytorch.org/assets/images/logo-icon.svg'},
  {iconstr: Framework.opencv, iconUrl: 'https://opencv.org/wp-content/uploads/2019/02/opencv-logo-1.png'},
  {iconstr: Framework.airsim, iconUrl: '/assets/images/icons/airsim.png'},
  {iconstr: Framework.googleapi, iconUrl: 'https://code.google.com/images/developers.png'},
  {iconstr: Framework.quovo, iconUrl: 'https://api-docs.quovo.com/v2/agg/images/logo.png'},
  {iconstr: Framework.imlib, iconUrl: 'https://docs.enlightenment.org/api/imlib2/html/imlib2.png'},
  {iconstr: Framework.webgl, iconUrl: '/assets/images/icons/webgl.png'},
  {iconstr: Framework.praw, iconUrl: 'https://www.redditinc.com/assets/images/site/reddit-logo.png'},

  {iconstr: Tool.cargo, iconUrl: 'https://doc.rust-lang.org/cargo/images/Cargo-Logo-Small.png'},
  {iconstr: Tool.man, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Windows_Terminal_Logo_256x256.png'},
  {iconstr: Tool.cmake, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Breezeicons-apps-48-cmake.svg'},
  {iconstr: Tool.make, iconUrl: 'http://www.myiconfinder.com/uploads/iconsets/256-256-a2f0f447f4b1f528044828ccaa8dc865-Gnu.png'},
  {iconstr: Tool.latex, iconUrl: '/assets/images/icons/latex.png'},
  {iconstr: Tool.photoshop, iconUrl: 'https://www.adobe.com/content/dam/cc/icons/photoshop-mobile.svg'},
  {iconstr: Tool.illustrator, iconUrl: 'https://www.adobe.com/content/dam/cc/icons/illustrator.svg'},
  {iconstr: Tool.ghpages, iconUrl: '/assets/images/icons/ghpages.png'},
  {iconstr: Tool.blender, iconUrl: 'https://download.blender.org/branding/blender_logo.png'},
  {iconstr: Tool.dex, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Android_logo_2019.svg'},

  {iconstr: Social.email, iconUrl: 'https://simpleicons.org/icons/minutemailer.svg'},
  {iconstr: Social.gmail, iconUrl: 'https://simpleicons.org/icons/gmail.svg'},
  {iconstr: Social.github, iconUrl: 'https://simpleicons.org/icons/github.svg'},
  {iconstr: Social.gitlab, iconUrl: 'https://simpleicons.org/icons/gitlab.svg'},
  {iconstr: Social.linkedin, iconUrl: 'https://simpleicons.org/icons/linkedin.svg'},
  {iconstr: Social.dribble, iconUrl: 'https://simpleicons.org/icons/dribble.svg'},
  {iconstr: Social.instagram, iconUrl: 'https://simpleicons.org/icons/instagram.svg'},
  {iconstr: Social.facebook, iconUrl: 'https://simpleicons.org/icons/facebook.svg'},
  {iconstr: Social.twitter, iconUrl: 'https://simpleicons.org/icons/twitter.svg'},
  {iconstr: Social.pinterest, iconUrl: 'https://simpleicons.org/icons/pinterest.svg'},

];
