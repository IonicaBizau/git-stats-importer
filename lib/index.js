// Dependencies
var GitLogParser = require("gitlog-parser")
  , Ul = require("ul")
  , Typpy = require("typpy")
  , Events = require("events")
  , EventEmitter = Events.EventEmitter
  , GitStats = require("git-stats")
  , ParentSearch = require("parent-search")
  , OneByOne = require("one-by-one")
  , ChildProcess = require("child_process")
  , Spawn = require("spawn")
  , GitRepos = require("git-repos")
  ;

function Importer(options, gs, data) {
    this.path = options.path;
    this.emails = options.emails;
    this.ev = new EventEmitter();
    this.gs = gs;
    this.data = data;
}

Importer.prototype.stream = function () {
    var args = ["log"]
      , i = 0
      ;

    for (; i < this.emails; ++i) {
        args.push("--author");
        args.push(this.emails[i]);
    }

    return Spawn(
        "git"
      , args
      , { cwd: this.path }
    ).stdout;
};

Importer.prototype.iterate = function () {
    var self = this;
    GitLogParser(self.stream()).on("commit", function(commit) {
        if (!commit) { return; }
        self.ev.emit("commit", commit);
    }).on("error", function (err) {
        self.emit("error");
    }).on("finish", function () {
        self.emit("finish");
    });
};

Importer.delete = function () {
    self.ev.on("commit", function (commit) {
        self.gs.removeCommit({
            date: commit.date
          , hash: commit.hash
          , save: false
        });
    });
    self.iterate();
};

Importer.prototype.import = function () {
    var self = this;
    self.ev.on("commit", function (commit) {
        self.gs.record({
            date: commit.date
          , hash: commit.hash
          , save: false
        });
    });
    self.iterate();
};

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

                    importer.on("error", ev.emit.bind(ev, "delete"));
                    importer.on("import", ev.emit.bind(ev, "import"));
                    importer.on("finish", ev.emit.bind(ev, "finish"));
                    importer.on("finish", function () {
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
                        OneByOne(foos, next);
                    });
                } else {
                    importPath(options.path);
                }
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
