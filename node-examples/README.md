# Basics From Class:
- "npm init" in folder to create project
- "npm init -y" to bypass defaults
- cover "npm i bootstrap --save" vs. --save-dev and --production and --development 
  to remove devDependencies from package.json (show node_modules for each)
- npm ls --depth 0 (or 1 or 2) to show why so much in npm_modules
- npm outdated
- npm update PACKAGE (e.g. bootstrap)
- npm uninstall
- npm audit and "npm audit fix" (can use "npm audit fix --force" if all not fixed, but 
  you should know for sure this doesn't break things)

Some actual node (not running from browser) so put in file, e.g. program.js:
Main page:
  https://www.digitalocean.com/community/tutorial_series/how-to-code-in-node-js
Show page: 
  https://www.digitalocean.com/community/tutorials/how-to-write-and-run-your-first-program-in-node-js
  Sample commands are:
- console.log("hello");
- console.log(process.argv);
- console.log(process.argv.slice(2));
- console.log(process.env);
- console.log(process.env["HOME"]);
- copy paste "Step 7"

Show page:
  https://www.digitalocean.com/community/tutorials/how-to-use-the-node-js-repl
  Samle commands are:
- won't really cover, but quickly show like running in console in browser
- type "node" and then 7 + "hello"
- .help and .exit
