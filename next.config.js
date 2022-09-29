const packages = require('./package.json');
const deps = packages.dependencies
const { withFederatedSidecar } = require("@module-federation/nextjs-mf");

module.exports = withFederatedSidecar({
  name: "accounts",
  filename: "static/runtime/remoteEntry.js",
  exposes: {
    './page1': './components/page1',
    './createUser': './components/form',
    './listUsers': './components/table',
  },
  shared: {
    ...deps,
    react: {
      eager: true,
      singleton: true,
      requiredVersion: deps['react']
    },
    'react-dom': {
      eager: true,
      singleton: true,
      requiredVersion: deps['react-dom']
    }
  }
})({
  webpack: config => {
    config.output.publicPath = `${process.env.HOST}/_next/`;
    return config;
  }
});
