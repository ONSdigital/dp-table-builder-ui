#!/bin/bash -eux

pushd dp-table-builder-ui
  make node-modules
  make audit
popd
