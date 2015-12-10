# angular-typescript-seed

NOTES

This project is built with VSCode so there are editor specific stuff in the .vscode folder

source maps
source maps are generated for both dev and dist because all the css/javascript files are concatenated 
dev is left as is, dist is uglified
I am assuming automated deployments know to exclude *.map files

TODOs
retry requests when token times out (auth)
global exception handler (core)
need to figure out a way to shorten the build times (currently 7-9 seconds) for watches and browser-sync to be practical 
