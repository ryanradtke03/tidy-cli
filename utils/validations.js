const fs = require("fs");

function validateOptions(opts) {
  if (!fs.existsSync(opts.dir) || !fs.lstatSync(opts.dir).isDirectory()) {
    console.error(`❌ Directory not found or not a folder: ${opts.dir}`);
    process.exit(1);
  }

  const validModes = ["type", "extension", "date"];
  if (!validModes.includes(opts.by)) {
    console.error(
      `❌ Invalid --by mode: "${opts.by}". Must be one of: ${validModes.join(
        ", "
      )}`
    );
    process.exit(1);
  }

  if (opts.log) {
    try {
      fs.writeFileSync(opts.log, "", { flag: "a" }); // touch the log file
    } catch (err) {
      console.error(`❌ Cannot write to log file: ${opts.log}`);
      process.exit(1);
    }
  }
}

module.exports = {
  validateOptions,
};
