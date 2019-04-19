const arg1=1; arg2=1;
const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',["../script.py", arg1, arg2]);

pythonProcess.stdout.on('data', (data) => {
  console.log(data);
});