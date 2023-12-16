import {
	faDribbble, faFacebook, faGithub, faGitlab, faInstagram, faLinkedin, faPinterest, faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const socialsRegistry = {
	DRIBBBLE: { iconUrl: faDribbble },
	EMAIL: { iconUrl: faEnvelope },
	FACEBOOK: { iconUrl: faFacebook },
	GITHUB: { iconUrl: faGithub },
	GITLAB: { iconUrl: faGitlab },
	GMAIL: { iconUrl: faEnvelope },
	INSTAGRAM: { iconUrl: faInstagram },
	LINKEDIN: { iconUrl: faLinkedin },
	PINTEREST: { iconUrl: faPinterest },
	TWITTER: { iconUrl: faTwitter },
} as const;
