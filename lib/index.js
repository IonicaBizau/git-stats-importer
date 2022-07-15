// Dependencies
var GitLogParser = require("gitlog-parser").parse
  , Ul = require("ul")
  , Typpy = require("typpy")
  , Events = require("events")
  , EventEmitter = Events.EventEmitter
  , GitStats = require("git-stats")
  , ParentSearch = require("parent-search")
  , OneByOne = require("one-by-one")
  , ChildProcess = require("child_process")
  , Spawn = ChildProcess.spawn
  , GitRepos = require("git-repos")
  , OArgv = require("oargv")
  ;

/**
 * Importer
 * Creates a new `Importer` instance.
 *
 * @name Importer
 * @function
 * @param {Object} options The `GitStatsImporter` options.
 * @param {GitStats} gs The `GitStats` instance.
 * @param {Object} data The commit data.
 * @return {Importer} The `Importer` instance.
 */
function Importer(options, gs, data) {
    this.path = options.path;
    this.emails = options.emails;
    this.ev = new EventEmitter();
    this.gs = gs;
    this.data = data;
}

/**
 * stream
 * Spawns the `git log` command and returns the stdout stream.
 *
 * @name stream
 * @function
 * @return {Stream} The stdout stream of `git log` command.
 */
Importer.prototype.stream = function () {
    var self = this
      , args = OArgv({
            author: this.emails
          , color: "never"
          , abbrev: 40
          , __: "="
        }, "log")
      , pr = Spawn(
            "git"
          , args
          , { cwd: this.path }
        )
      ;

    return pr.stdout;
};

/**
 * iterate
 * Emits the `commmit`, `error` and `finish` events.
 *
 * @name iterate
 * @function
 */
Importer.prototype.iterate = function () {
    var self = this;
    GitLogParser(self.stream()).on("commit", function(commit) {
        if (!commit) { return; }
        self.ev.emit("commit", commit);
    }).on("error", function (err) {
        self.emit("error");
    }).on("finish", function () {
        self.ev.emit("finish");
    });
};

/**
 * delete
 * Deletes the selected commits.
 *
 * @name delete
 * @function
 */
Importer.prototype.delete = function () {
    var self = this;
    self.ev.on("commit", function (commit) {
        self.gs.removeCommit({
            date: commit.date
          , hash: commit.hash
          , save: false
          , _data: self.data
        });
        self.ev.emit("delete", {
            path: self.path
          , commit: commit
        });
    });
    self.iterate();
};

/**
 * import
 * Imports the selected commits.
 *
 * @name import
 * @function
 */
Importer.prototype.import = function () {
    var self = this;
    self.ev.on("commit", function (commit) {
        self.gs.record({
            date: commit.date
          , hash: commit.hash
          , save: false
          , _data: self.data
        });
        self.ev.emit("import", {
            path: self.path
          , commit: commit
        });
    });
    self.iterate();
};

/**
 * GitStatsImporter
 * Creates a new instance of `GitStatsImporter`.
 *
 * @name GitStatsImporter
 * @function
 * @param {Object} options An object containing the following fields:
 *
 *  - `path` (String): The repository path.
 *  - `delete` (Boolean): If `true`, it will delete the commits from the history.
 *  - `recursive` (Boolean): If `true` the tool will search for repositories in the specified path, recursively.
 *  - `emails` (Array): An array with the emails that were used in the commits you want to import.
 *
 * @return {GitStatsImporter} The `GitStatsImporter` instance.
 */
function GitStatsImporter(options) {

    var ev = new EventEmitter()
      , gs = new GitStats()
      ;

    if (Typpy(options, String)) {
        options = {
            path: options
        };
    }

    options = Ul.merge(options, {
        delete: false
      , path: process.cwd()
      , recursive: false
    });

    function start() {
        // Init the config
        OneByOne([
            gs.initConfig.bind(gs)
          , gs.get.bind(gs)
          , function (next, data) {
                var queue = []
                  , searcher = null
                  ;

                function importPath(path, cb) {
                    var ops = Ul.clone(options);
                    ops.path = path;

                    var importer = new Importer(ops, gs, data);

                    importer.ev.on("error", ev.emit.bind(ev, "delete"));
                    importer.ev.on("import", ev.emit.bind(ev, "import"));
                    importer.ev.on("delete", ev.emit.bind(ev, "delete"));
                    importer.ev.on("finish", function () {
                        cb();
                    });

                    if (options.delete) {
                        importer.delete();
                    } else {
                        importer.import();
                    }
                }

                if (options.recursive) {
                    var foos = [];
                    searcher = GitRepos(options.path, function (err, dir) {
                        if (err) {
                            return ev.emit("error", err);
                        }
                        ev.emit("gitFolder", dir);
                        foos.push(importPath.bind(this, dir));
                    });
                    searcher.on("end", function () {
                        OneByOne(foos, function (err) {
                            next(err, data);
                        });
                    });
                } else {
                    importPath(options.path, function (err) {
                        next(err, data);
                    });
                }
            }
          , function (next, data) {
                gs.save(data, next);
            }
        ], function (err, data) {
            ev.emit("finish", err, data);
        });
    }

    if (!options.recursive) {
        ParentSearch(options.path, ".git", {
            obj: true
        }, function (err, d) {
            if (err) { return ev.emit("error", err); }
            if (d === null) {
                return ev.emit("error", new Error("This is not a git repository."));
            }
            options.path = d.d;
            start();
        });
    } else {
        process.nextTick(start);
    }

    return ev;
}

module.exports = GitStatsImporter;
