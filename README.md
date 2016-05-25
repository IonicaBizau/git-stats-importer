
# `$ git-stats-importer`

 [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/git-stats-importer.svg)](https://www.npmjs.com/package/git-stats-importer) [![Downloads](https://img.shields.io/npm/dt/git-stats-importer.svg)](https://www.npmjs.com/package/git-stats-importer) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Imports your commits from a repository into git-stats history.

This tool imports commits into the [`git-stats`](https://github.com/IonicaBizau/git-stats) commit history. If you like to import all your commits from BitBucket and GitHub, check out the [Repository Downloader project](https://github.com/IonicaBizau/repository-downloader).

## :cloud: Installation

You can install the package globally and use it as command line tool:


```sh
$ npm i -g git-stats-importer
```


Then, run `git-stats-importer --help` and see what the CLI tool can do.


```
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

## :clipboard: Example


Here is an example how to use this package as library. To install it locally, as library, you can do that using `npm`:

```sh
$ npm i --save git-stats-importer
```



```js
// Dependencies
var GitStatsImporter = require("git-stats-importer");

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

## :memo: Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.

## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
