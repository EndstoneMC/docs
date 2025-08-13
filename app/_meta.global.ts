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
          cpp: 'C++ API',
          python: 'Python API',
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