#!/usr/bin/env sh

set -e

git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/Ltyi/F2E-Challenge2019.git master:gh-pages
