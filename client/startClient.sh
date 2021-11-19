#!/bin/sh
npm run build
serve -l 3001 -s build
