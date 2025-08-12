import {FaDiscord, FaDocker, FaGithub, FaPython} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";

export const siteConfig = {
  name: "Endstone",
  url: "https://endstone.dev",
  repo_name: "EndstoneMC/endstone",
  repo_url: "https://github.com/EndstoneMC/endstone",
  extra: {
    social: [
      {
        icon: FaGithub,
        link: "https://github.com/EndstoneMC/endstone",
      },
      {
        icon: FaPython,
        link: 'https://pypi.org/project/endstone',
      },
      {
        icon: FaDocker,
        link: 'https://hub.docker.com/u/endstone',
      },
      {
        icon: FaXTwitter,
        link: 'https://twitter.com/endstone_mc',
      },
      {
        icon: FaDiscord,
        link: "https://discord.gg/xxgPuc2XN9",
      },
    ]
  },
};

export type SiteConfig = typeof siteConfig;