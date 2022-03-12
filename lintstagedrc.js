module.exports = {
  '*.{js,json,md,ts,yml}': ['prettier --write', 'git add'],
  '*.js': 'tslint -c node_modules/@pe/dev-kit/tslint.json',
  '*.ts': 'tslint -c node_modules/@pe/dev-kit/tslint.json -p tsconfig.json'
};
