// Dependencies
var GitLogParser = require("gitlog-parser")
  , Ul = require("ul")
  , Typpy = require("typpy")
  , Events = require("events")
  , EventEmitter = Events.EventEmitter
  , GitStats = require("git-stats")
  , ParentSearch = require("parent-search")
  , OneByOne = require("one-by-one")
  ;

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
                debugger
            }
        ], function (err, data) {
            ev.emit("finish", err, data);
        });
    }

    if (!options.recursive) {
        ParentSearch(options.path, ".git", function (err, d) {
            if (err) { return ev.emit("error", err); }
            if (d === null) {
                return ev.emit("error", new Error("This is not a git repository."));
            }
            options.path = d.d;
        });
    } else {
        process.nextTick(start);
    }

    return ev;
}

module.exports = GitStatsImporter;
