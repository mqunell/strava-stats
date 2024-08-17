import User from '@/models/User';
import dbConnect from './dbConnect';

export const getUsers = async (): Promise<User[]> => {
	await dbConnect();

	const result = await User.find({});
	const users: User[] = result.map((doc) => {
		const user = doc.toObject();
		user._id = user._id.toString();
		return user;
	});

	return users;
};
