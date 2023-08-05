const { AuthenticationError } = require('@apollo/server')
const { User } = require('../models')
const { signToken } = require('../utils/auth')


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            return await User.findById(context.user._id)
        }
    },
    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create(username, email, password);

            const token = signToken(user);

            return ({ token, user });
        },
        login: async (parent, {username, password}) => {
            const user = await User.findOne({ username });

            if (!user) {
              throw AuthenticationError
            }
        
            const correctPw = await user.isCorrectPassword(password)
        
            if (!correctPw) {
              throw AuthenticationError
            }
            const token = signToken(user)
            return { token, user }
          },
          saveBook: async (parent, { book }, context) => {
            console.log(context.$addToSetuser);
            try {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } },
                { new: true }
              );
              return updatedUser
            } catch (err) {
              throw AuthenticationError
            }
          },
          removeBook: async (parent, { bookId }, context) => {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context._id },
              { $pull: { savedBooks: { bookId: bookId } } },
            );
            if (!updatedUser) {
              throw AuthenticationError
            }
            return updatedUser
          },

    }
}

module.exports = resolvers