// Dependencies
var GitStatsImporter = require("../");

// Start importing
var importer = GitStatsImporter({
    // If true, it will delete these commits
    delete: false

    // The path to the project/projects directory
  , path: "~/some-project"

    // If true, it will import all the repositories found
    // in the provided path
  , recursive: false

    // A list with the emails
  , emails: [
        "alice@example.com"
      , "bob@example.com"
    ]
});

// Output for git folders
importer.on("gitFolder", function (dir) {
    /* do something when a git folder is found */
});

// Listen for import
importer.on("import", function (data) {
    /* do something when a commit is imported */
});

// Listen for import
importer.on("error", function (err, data) {
    /* do something when errors occur */
});

// Listen for finish
importer.on("finish", function (data) {
    /* do something on finish */
});
