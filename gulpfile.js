eval(require("typescript").transpile(require("fs").readFileSync("./tasks/gulpfile.ts").toString())); //Transpile and evaluate the ./tasks/gulpfile.ts