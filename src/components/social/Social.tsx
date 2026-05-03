import DiscordIcon from "../../assets/discord.svg?react"
import GithubIcon from "../../assets/github.svg?react"
import LinkedinIcon from "../../assets/linkedin.svg?react"
import { Halo } from "../halo/Halo"
import { SOCIAL } from "../halo/samples"
// import EmailIcon from "../../assets/email.svg?react"
import classes from "./Social.module.css"

type SocialProps = {
    className?: string
}

export const Social = ({ className = "" }: SocialProps) => (
    <div className={`${classes.container} ${className}`}>
        <Halo generator={SOCIAL.RIGHT}>
            <ul className={classes.list}>
                <li>
                    <a
                        href="https://github.com/Passeriform"
                        className={classes.link}
                        target="_blank"
                    >
                        <GithubIcon className={classes.icon} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://discordapp.com/users/425754505989193749"
                        className={classes.link}
                        target="_blank"
                    >
                        <DiscordIcon className={classes.icon} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://in.linkedin.com/in/passeriform"
                        className={classes.link}
                        target="_blank"
                    >
                        <LinkedinIcon className={classes.icon} />
                    </a>
                </li>
                {/* <li>
                    <a
                        href="mailto:bhardwajutkarsh.ub@gmail.com"
                        className={classes.link}
                        target="_blank"
                    >
                        <EmailIcon className={classes.icon} />
                    </a>
                </li> */}
            </ul>
        </Halo>
    </div>
)

export default Social
