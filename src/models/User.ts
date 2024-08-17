import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Username is required'],
	},
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
