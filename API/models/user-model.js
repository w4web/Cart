const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    profileImage: {
        type: String
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    verified: {
        type: Boolean,
        default: false
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: { type: Number, required: true }
            }
        ]
    }

}, { timestamps: true })

userSchema.methods.addToCart = function (product, quantity) {

    // Check if product available..

    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });

    const updatedCartItems = [...this.cart.items];

    // If product available.. Than set quantity!

    if (cartProductIndex >= 0) {

        let newQuantity = this.cart.items[cartProductIndex].quantity + quantity;
        updatedCartItems[cartProductIndex].quantity = newQuantity;

    } else {

        updatedCartItems.push({
            productId: product._id,
            quantity: quantity
        });
        
    }

    const updatedCart = {
        items: updatedCartItems
    };

    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
};

module.exports = mongoose.model('users', userSchema);