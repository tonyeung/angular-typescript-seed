# angular-typescript-seed

This project is built with VSCode so there are editor specific stuff in the .vscode folder
The code is derived from John Papa's Hot Towel project and the structure uses a lot of .net apis

**web servers and watches**  
call gulp bs to start the browser-sync process, this needs to be done in a seperate command window

**unit tests**  
call gulp ut to start the unit testing watch process

**builds**  
builds will need to be done manually via the VSCode's build command  
assuming that auto save is on
the save will output the tests/dev/dist versions which should trigger their respective watches

**source maps**  
source maps are generated for both dev and dist because all the css/javascript files are concatenated 
dev is left as is, dist is uglified
I am assuming automated deployments know to exclude *.map files

TODO:  
* sticky header and nav
* create or look for elevation css classes
* create single line form control inputs that have floating labels (material)