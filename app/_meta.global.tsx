import {FC, ReactNode} from "react";
import {LinkArrowIcon} from 'nextra/icons'

const ExternalLink: FC<{ children: ReactNode }> = ({children}) => {
  return (
    <>
      {children}&thinsp;
      <LinkArrowIcon
        // based on font-size
        height="1em"
        className="x:inline x:align-baseline x:shrink-0"
      />
    </>
  )
}


const meta = {
  index: {
    title: 'Home',
    display: 'hidden',
  },
  docs: {
    type: 'page',
    title: 'Documentation',
    items: {
      'getting-started': {
        items: {
          installation: {
            items: {
              windows: 'Windows',
              linux: 'Linux',
              macos: 'macOS',
              docker: 'Docker',
            }
          },
        }
      },
      'user-guide': {
        items: {
          configuration: 'Configuration',
        }
      },
      'developer-guide': {
        items: {
          cpp: {
            items: {
              reference: {
                title: <ExternalLink>Reference</ExternalLink>,
                href: '/reference/cpp'
              },
              examples: 'Examples',
            },
          },
          python: {
            items: {
              reference: {
                title: <ExternalLink>Reference</ExternalLink>,
                href: '/reference/cpp'
              },
              examples: 'Examples',
            },
          }
        }
      }
    }
  },
  reference: {
    type: 'page',
    title: 'Reference',
    items: {
      cpp: 'C++ API',
      python: 'Python API',
    }
  },
  plugins: {
    type: 'page',
    title: 'Plugins'
  }
}

export default meta;