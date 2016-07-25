import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    facebook: string;
    twitter: string;
    google: string;
    comparePassword(password: string, callback: Function): void;
}

class UserSchema {
    static get schema(): mongoose.Schema {
        let userSchema = new mongoose.Schema({
            email: {
                type: String,
                unique: true,
                lowercase: true
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            password: {
                type: String,
                select: false
            },
            facebook: String,
            twitter: String,
            google: String
        });

        userSchema.pre('save', function(next) {
            let user = <any>this;
            if(!user.isModified('password')) {
                return next();
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    user.password = hash;
                    next();
                });
            });
        });        
        userSchema.method('comparePassword', function(password: string, callback: Function) {
            let user = <any>this;
            bcrypt.compare(password, user.password, (err, isMatch) => {
                callback(err, isMatch);
            });
        });

        return userSchema;
    }
}

export const UserModel = mongoose.model<IUser>('User', UserSchema.schema);

// let schema = new mongoose.Schema({
//     email: {
//         type: String,
//         unique: true,
//         lowercase: true
//         },
//     firstName: {
//             type: String,
//             required: true
//         },
//     lastName: {
//             type: String,
//             required: true
//         },
//     password: {
//             type: String,
//             select: false
//         },
//     facebook: String,
//     twitter: String,
//     google: String
// });

// schema.pre('save', function(next) {
//     let user = this;
//     if(!user.isModified('password')) {
//             return next();
//         }
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             user.password = hash;
//             next();
//         });
//     });
// });        
// schema.method('comparePassword', (password: string, callback: Function) => {
//     let user = this;
//     bcrypt.compare(password, user.password, (err, isMatch) => {
//         callback(err, isMatch);
//     });
// });