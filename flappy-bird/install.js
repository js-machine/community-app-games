const args = ['install'];

const clientOpts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, clientOpts);

// const adminOpts = { stdio: 'inherit', cwd: 'admin', shell: true };
// require('child_process').spawn('npm', args, adminOpts);

// const backendOpts = { stdio: 'inherit', cwd: 'backend', shell: true };
// require('child_process').spawn('npm', args, backendOpts);
