# angular-typescript-seed

This project is built with VSCode so there are editor specific stuff in the .vscode folder

**builds**  
builds will need to be done manually via the gulp command
this assumes auto save is turned on
(Substituting save all with a gulp default task so its okay even if forgetting to ctrl+s)

**web servers and watches**  
call gulp bs to start the browser-sync process, this needs to be done in a seperate command window

**source maps**  
source maps are generated for both dev and dist because all the css/javascript files are concatenated 
dev is left as is, dist is uglified
I am assuming automated deployments know to exclude *.map files

**unit tests**  
need to figure out how to get the build process to output to a seperate test directory and have karma load files from there instead

TODOs

* retry requests when token times out (auth)
* global exception handler (core)
* need to stick some data into the authorize method for actual authorization