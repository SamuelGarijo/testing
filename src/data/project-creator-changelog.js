const data = [
  {
    date: "October 16, 2024",
    version: "1.1.1",
    title: "Smaller fixes and improvements",
    content: `
  #### Fixes:
  - Default option in settings dropdown will be saved, without needing to deselect and select again
  - Default always settings now save as expected
      `,
  },
  {
    date: "October 14, 2024",
    version: "1.1.0",
    title: "Advanced search, Project configurations, and NuttX: welcoming our first external projects",
    content: `
  #### Newly added features:
  - Searchbar for filtering
  - Project configuration option
  - 2 NuttX projects (the first external projects)
  - \`getStartedInstructions\` option to the manifest files to outline the following steps after project creation
  - Version number in the header
  - Keyboard shortcuts
  
  #### Fixes:
  - Some hidden LVGL files were not previously created.
  - Fixed an issue with git submodules
  - Fixed the notarization for the Mac app, enabling the app to start normally.
      `,
  },
  {
    date: "September 9, 2024",
    version: "1.0.0",
    title: "We’re live",
    content: `
  - Support a few initial boards and projects.
  - Runs on Windows, Linux, MacOS and as a VSCode Extension.
      `,
  },
];

export default data;
