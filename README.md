<!-- Please do not edit this file. Edit the `blah` field in the `package.json` instead. If in doubt, open an issue. -->


















# `$ git-stats-importer`

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Ask me anything](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/git-stats-importer.svg)](https://www.npmjs.com/package/git-stats-importer) [![Downloads](https://img.shields.io/npm/dt/git-stats-importer.svg)](https://www.npmjs.com/package/git-stats-importer) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/@johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

<a href="https://www.buymeacoffee.com/H96WwChMy" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me A Coffee"></a>







> Imports your commits from a repository into git-stats history.






This tool imports commits into the [`git-stats`](https://github.com/IonicaBizau/git-stats) commit history. If you like to import all your commits from BitBucket and GitHub, check out the [Repository Downloader project](https://github.com/IonicaBizau/repository-downloader).












## :cloud: Installation

You can install the package globally and use it as command line tool:


```sh
# Using npm
npm install --global git-stats-importer

# Using yarn
yarn global add git-stats-importer
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



Here is an example how to use this package as library. To install it locally, as library, you can use `npm install git-stats-importer` (or `yarn add git-stats-importer`):



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












## :question: Get Help

There are few ways to get help:



 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:







## :memo: Documentation

For full API reference, see the [DOCUMENTATION.md][docs] file.












## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :sparkling_heart: Support my projects
I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:


 - Starring and sharing the projects you like :rocket:
 - [![Buy me a book][badge_amazon]][amazon]—I love books! I will remember you after years if you buy me one. :grin: :book:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)


Thanks! :heart:
























## :scroll: License

[MIT][license] © [Ionică Bizău][website]






[license]: /LICENSE
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
[badge_patreon]: https://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: https://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: https://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: https://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
