# git-stats-importer
Imports your commits from a repository into [git-stats](https://github.com/IonicaBizau/git-stats) history.

## Installation
```sh
$ npm install -g git-stats-importer
```

## Usage
Go to the directory where your repository lives:

```sh
$ cd path/to/my/repo
```

### Import commits
Run the importer tool there:

```sh
$ git-stats-importer
```

To import the commits from all the users run:

```sh
$ git-stats-importer --all
```

### Delete commits
```sh
$ git-stats-importer --delete
```

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
