#!/bin/bash -eux

pushd dp-table-builder-ui
  npm install --unsafe-perm
popd

cp -r dp-table-builder-ui/dist/* build/

perl -ne '/version.+(\d+\.\d+\.\d+)/ && print $1' dp-table-builder-ui/package.json > version/version
