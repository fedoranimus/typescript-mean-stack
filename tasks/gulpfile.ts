import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';
import * as gulp from 'gulp';
import * as tsc from 'gulp-typescript';
import * as nodemon from 'gulp-nodemon';
import * as del from 'del';
let changedInPlace = require('gulp-changed-in-place'); //no typedef available :'(
import rename = require('gulp-rename'); //typedef isn't in the correct module syntax :(


@Gulpclass() 
export class Gulpfile {

    @SequenceTask()
    default() {
        return ['clean', 'configureEnvironment', 'buildTypescript', 'watch'];
    }

    @Task()
    clean(callback: Function) {
        return del(["./dist/**"], callback);
    }

    @Task()
    buildTypescript() {
        let tsProject = tsc.createProject('tsconfig.json');
        let tsResult = tsProject.src().pipe(tsc(tsProject));
        return tsResult.js.pipe(gulp.dest('dist'));
    }

    @Task()
    configureEnvironment() {
        let env = {
            dev: 'dev',
            prod: 'prod',
            stage: 'stage' 
        };

        return gulp.src(`./environments/${env[process.env.NODE_ENV]}.ts`)
            .pipe(changedInPlace({firstPass:true}))
            .pipe(rename('environment.ts'))
            .pipe(gulp.dest("src"));
    }

    @Task()
    watch() {
        gulp.watch('src/*.ts', this.buildTypescript);
        nodemon({
            script: './dist/src/server.js'
        });
    }


}