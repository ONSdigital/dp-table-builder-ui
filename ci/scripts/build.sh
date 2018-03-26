#!/bin/bash -eux

pushd dp-table-builder-ui
  npm install --unsafe-perm
  npm test
  npm run build
popd

# copy the artifacts to the target we run bucket sync from
cp -r dp-table-builder-ui/dist/* build/

# copy the artifacts to the target we run npm publish from
cp -r dp-table-builder-ui/{.npmignore,README.md,dist,node_modules,package*.json,webpack*.config.js} package/
