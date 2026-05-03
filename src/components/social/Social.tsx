import { Halo } from "../halo/Halo"
import GithubIcon from "../../assets/github.svg?react"
import DiscordIcon from "../../assets/discord.svg?react"
import LinkedinIcon from "../../assets/linkedin.svg?react"
// import EmailIcon from "../../assets/email.svg?react"
import "./Social.css"
import { SOCIAL } from "../halo/samples"

export const Social = () => {
    return <div className="container">
        <Halo generator={SOCIAL.RIGHT}>
            <ul>
                <li>
                    <a href="https://github.com/Passeriform" target="_blank">
                        <GithubIcon className="icon" />
                    </a>
                </li>
                <li>
                    <a href="https://discordapp.com/users/425754505989193749" target="_blank">
                        <DiscordIcon className="icon" />
                    </a>
                </li>
                <li>
                    <a href="https://in.linkedin.com/in/passeriform" target="_blank">
                        <LinkedinIcon className="icon" />
                    </a>
                </li>
                {/* <li>
                    <a href="mailto:bhardwajutkarsh.ub@gmail.com" target="_blank">
                        <EmailIcon className="icon" />
                    </a>
                </li> */}
            </ul>
        </Halo>
    </div>
}

export default Social