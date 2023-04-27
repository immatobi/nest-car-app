import mongoose, { ObjectId } from 'mongoose'
import slugify from 'slugify'
import { IReportDoc } from '../utils/interfaces.util';

const ReportSchema = new mongoose.Schema(

    {
        price: {
            type: Number,
            default: 0
        },

        slug: String,

        user: {
            type: mongoose.Schema.Types.Mixed,
            ref: 'User'
        },

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

ReportSchema.set('toJSON', { getters: true, virtuals: true });

ReportSchema.pre<IReportDoc>('save', async function(next){
    this.slug = slugify(`report`, { lower: true });
    next();
});

const Report = mongoose.model<IReportDoc>('Report', ReportSchema);

export { Report, ReportSchema };