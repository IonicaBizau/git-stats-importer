# `$ git-stats-importer` [![Support this project][donate-now]][paypal-donations]

Imports your commits from a repository into git-stats history.

This tool imports commits into the [`git-stats`](https://github.com/IonicaBizau/git-stats) commit history. If you like to import all your commits from BitBucket and GitHub, check out the [Repository Downloader project](https://github.com/IonicaBizau/repository-downloader).

## Installation

You can install the package globally and use it as command line tool:

```sh
$ npm i -g git-stats-importer
```

Then, run `git-stats-importer --help` and see what the CLI tool can do.

```sh
$ git-stats-importer --help
Usage: git-stats-importer [options]

Options:
  -f, --find-repos <path>  If this option is provided, the importer will    
                           search for repositories in the provided path     
                           (recursively).                                   
  -d, --delete             Delete the commits from selected repositories.   
  -e, --emails <emails>    Comma separated emails you want to include in the
                           import process. By default it's the              
                           $GIT_AUTHOR_EMAIL value.                         
  -h, --help               Displays this help.                              
  -v, --version            Displays version information.                    

Examples:
  git-stats-importer # imports the commits from the current repository
  git-stats-importer --delete # deletes the commits from the current repo
  git-stats-importer --find-repos ~/github # searches for repositories in the ~/github dir
  git-stats-importer --delete --find-repos ~/github # deletes the commits from the ~/github dir

Documentation can be found at https://github.com/IonicaBizau/git-stats-importer
```

## Example

Here is an example how to use this package as library. To install it locally, as library, you can do that using `npm`:

```sh
$ npm i git-stats-importer
```

```js
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

// Listen for delete
importer.on("delete", function (data) {
    /* do something on delete */
});

// Listen for finish
importer.on("finish", function (data) {
    /* do something on finish */
});
```

## Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2015

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md