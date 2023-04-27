import mongoose, { ObjectId } from 'mongoose'
import slugify from 'slugify'
import { IUserDoc } from '../utils/interfaces.util';

const UserSchema = new mongoose.Schema(

    {
        firstName: {
            type: String
        },

        lastName: {
            type: String
        },

        username: {
            type: String
        },

        email: {
            type: String
        },

        password: {
            type: String,
            select: false
        },

        slug: String,

        reports: [
            {
                type: mongoose.Schema.Types.Mixed,
                ref: 'Report'
            },
        ]

    },

    {
        timestamps: true,
        versionKey: '_version',
        toJSON: {
            transform(doc, ret){
                ret.id = ret._id
            }
        }
    }
)

UserSchema.set('toJSON', { getters: true, virtuals: true });

UserSchema.pre<IUserDoc>('save', async function(next){
    this.slug = slugify(`${this.firstName}_${this.email}`, { lower: true });
    next();
});

const User = mongoose.model<IUserDoc>('User', UserSchema);

export { User, UserSchema };