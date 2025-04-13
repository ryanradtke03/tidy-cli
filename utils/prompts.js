const inquirer = require("inquirer");
const prompt = inquirer.default || inquirer;

async function handleVerificationPrompt() {
  const { confirm } = await prompt.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "🛡️  Verification is enabled. Do you want to continue?",
      default: true,
    },
  ]);

  return confirm;
}

module.exports = {
  handleVerificationPrompt,
};
