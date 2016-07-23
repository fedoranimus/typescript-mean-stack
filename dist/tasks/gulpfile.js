"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const Decorators_1 = require('gulpclass/Decorators');
const gulp = require('gulp');
const tsc = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const del = require('del');
let changedInPlace = require('gulp-changed-in-place'); //no typedef available :'(
const rename = require('gulp-rename'); //typedef isn't in the correct module syntax :(
let Gulpfile = class Gulpfile {
    default() {
        return ['clean', 'configureEnvironment', 'buildTypescript', 'watch'];
    }
    clean(callback) {
        return del(["./dist/**"], callback);
    }
    buildTypescript() {
        let tsProject = tsc.createProject('tsconfig.json');
        let tsResult = tsProject.src().pipe(tsc(tsProject));
        return tsResult.js.pipe(gulp.dest('dist'));
    }
    configureEnvironment() {
        let env = {
            dev: 'dev',
            prod: 'prod',
            stage: 'stage'
        };
        console.log(env[process.env.NODE_ENV], `./environments/${env[process.env.NODE_ENV]}.ts`);
        return gulp.src(`./environments/${env[process.env.NODE_ENV]}.ts`)
            .pipe(changedInPlace({ firstPass: true }))
            .pipe(rename('environment.ts'))
            .pipe(gulp.dest("src"));
    }
    watch() {
        gulp.watch('src/*.ts', this.buildTypescript);
        nodemon({
            script: './dist/src/server.js'
        });
    }
};
__decorate([
    Decorators_1.SequenceTask(), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], Gulpfile.prototype, "default", null);
__decorate([
    Decorators_1.Task(), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Function]), 
    __metadata('design:returntype', void 0)
], Gulpfile.prototype, "clean", null);
__decorate([
    Decorators_1.Task(), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], Gulpfile.prototype, "buildTypescript", null);
__decorate([
    Decorators_1.Task(), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], Gulpfile.prototype, "configureEnvironment", null);
__decorate([
    Decorators_1.Task(), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], Gulpfile.prototype, "watch", null);
Gulpfile = __decorate([
    //typedef isn't in the correct module syntax :(
    Decorators_1.Gulpclass(), 
    __metadata('design:paramtypes', [])
], Gulpfile);
exports.Gulpfile = Gulpfile;
