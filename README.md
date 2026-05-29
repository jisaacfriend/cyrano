# Cyrano

> *Putting words in Claude's mouth since 2026.*

Cyrano is a CLI tool for swapping the spinner verbs that Claude Code displays while it's thinking. Choose from bundled themed lists or bring your own.

## Installation

```sh
npm install -g jisaacfriend/cyrano
```

After installing, seed your verb lists directory with the bundled themes:

```sh
cyrano install
```

## Usage

```sh
cyrano
```

Presents an interactive menu to select a verb list and apply it — replacing or appending to Claude's current spinner verbs.

```sh
cyrano install
```

Copies all bundled verb lists into `~/.claude/spinner-verbs/`, skipping any that already exist.

## Bundled lists

| Theme | File |
|---|---|
| Battlestar Galactica | `bsg.json` |
| Firefly | `firefly.json` |
| The Princess Bride | `princess-bride.json` |
| Star Trek | `star-trek.json` |
| Star Wars | `star-wars.json` |
| The Stormlight Archive | `stormlight.json` |
| Veridian Dynamics | `veridian-dynamics.json` |
| The Wheel of Time | `wheel-of-time.json` |

## Adding your own lists

Drop any JSON file with the following shape into `~/.claude/spinner-verbs/`:

```json
{
  "title": "My List",
  "verbs": [
    "Doing the thing",
    "Still doing the thing",
    "Almost done with the thing"
  ]
}
```

Cyrano will pick it up automatically the next time you run it.

## Multiple Claude profiles

If you manage multiple Claude profiles via `CLAUDE_CONFIG_DIR`, Cyrano respects that variable automatically. Set it before running Cyrano and it will read lists from and write settings to that profile's directory.

The recommended pattern is to invoke Cyrano from your profile alias before launching Claude Code:

```sh
alias claude-personal='CLAUDE_CONFIG_DIR=~/.claude-personal bash -c "cyrano && claude"'
```

## License

MIT
