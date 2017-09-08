## Documentation

You can see below the API reference of this module.

### `Importer(options, gs, data)`
Creates a new `Importer` instance.

#### Params

- **Object** `options`: The `GitStatsImporter` options.
- **GitStats** `gs`: The `GitStats` instance.
- **Object** `data`: The commit data.

#### Return
- **Importer** The `Importer` instance.

### `stream()`
Spawns the `git log` command and returns the stdout stream.

#### Return
- **Stream** The stdout stream of `git log` command.

### `iterate()`
Emits the `commmit`, `error` and `finish` events.

### `delete()`
Deletes the selected commits.

### `import()`
Imports the selected commits.

### `GitStatsImporter(options)`
Creates a new instance of `GitStatsImporter`.

#### Params

- **Object** `options`: An object containing the following fields:
 - `path` (String): The repository path.
 - `delete` (Boolean): If `true`, it will delete the commits from the history.
 - `recursive` (Boolean): If `true` the tool will search for repositories in the specified path, recursively.
 - `emails` (Array): An array with the emails that were used in the commits you want to import.

#### Return
- **GitStatsImporter** The `GitStatsImporter` instance.

