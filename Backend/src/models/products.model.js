import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    sizes: [
        {
            type: String,
            required: true
        }
    ],
    bestSeller: {
        type: Boolean,
        default: false
    },
    images: [{
        type: String,
        required: true
    }],
    stock: {
        type: Number,
        required: true,
        min: 0
    },


},
    {
        timestamps: true
    }
)


productSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
})
const Product = mongoose.model("Product", productSchema);

export default Product;