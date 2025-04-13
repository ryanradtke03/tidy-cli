#!/usr/bin/env node

// Imports
const { Command } = require("commander");
const { handleVerificationPrompt } = require("./utils/prompts");
const { validateOptions } = require("./utils/validations");
const { tidyDirectory } = require("./tidy");

// Set up CLI Interface
const program = new Command();

program
  .name("tidy")
  .description(
    `🧹 Organize files in a directory into folders by type, extension, or date.

Options:
  --dir <path>       Directory to tidy. If not provided, defaults to the current working directory.
                     Example: --dir ./Downloads

  --by <mode>        Choose how to group files: 'type', 'extension', or 'date'.
                     Default: 'type'
  
  --move             Move files instead of copying them.
                     Default: false

  --dry-run          Preview what would happen without moving or copying any files.
                     Default: false

  --verify           Prompt for confirmation before continuing if file verification is enabled.
                     Default: true. Use --verify false to skip confirmation.

  --log <file>       Save a log of file operations to the specified file.
                     Example: --log tidy-history.json

  --silent           Suppress all console output. Useful for scripts or automation.

  --interactive      Use prompts to choose options instead of flags.

Examples:
  tidy --dir ./Downloads --by extension --move
  tidy --dry-run --log tidy-log.json
  tidy --verify false --silent
  tidy                # Defaults to current directory
`
  )
  .option(
    "-d, --dir <path>",
    "Directory to tidy (default: current working directory)",
    process.cwd()
  )
  .option("-b, --by <mode>", "Sort by: type | extension | date", "type")
  .option("-m, --move", "Move files instead of copying")
  .option(
    "-v, --verify <bool>",
    "Enable verification prompt (true/false). Default: true",
    "true"
  )
  .option("-l, --log <file>", "Write all file moves/copies to a log file")
  .option("-s, --silent", "Suppress all output")
  .option("-i, --interactive", "Use prompts instead of flags")
  .option("-D, --dry-run", "Only show what would happen")
  .parse();

// Get the options
const options = program.opts();

// Convert string to actual boolean
options.verify = options.verify !== "false";

// Run program
(async () => {
  if (options.verify) {
    const confirmed = await handleVerificationPrompt();
    if (!confirmed) {
      console.log("❌ Operation cancelled.");
      process.exit(0);
    }
  }

  validateOptions(options);

  await tidyDirectory(options.dir, options);
})();
