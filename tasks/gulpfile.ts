import {Gulpclass, Task, SequenceTask} from 'gulpclass/Decorators';
import * as gulp from 'gulp';
import * as tsc from 'gulp-typescript';
import * as nodemon from 'gulp-nodemon';
import * as del from 'del';

@Gulpclass() 
export class Gulpfile {

    @SequenceTask()
    default() {
        return ['clean', 'buildTypescript', 'watch'];
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
    watch() {
        gulp.watch('src/*.ts', this.buildTypescript);
        nodemon({
            script: './dist/src/server.js'
        });
    }


}