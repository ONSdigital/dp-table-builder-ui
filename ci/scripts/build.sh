#!/bin/bash -eux

pushd dp-table-builder-ui
  npm install --unsafe-perm && npm run build
popd

cp -r dp-table-builder-ui/dist/* build/
