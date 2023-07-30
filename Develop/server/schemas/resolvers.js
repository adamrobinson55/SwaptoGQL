const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../models')
const { signToken } = require('../utils/auth')


const resolvers = {
    Query: {
        me: async (_, { id }) => {
            return foundUser = await User.findById(id)
        }
    },
    Mutation: {
        createUser: async (_, {username, email, password}) => {
            const user = await User.create(username, email, password);

            const token = signToken(user);

            return ({ token, user });
        },
        login: async (_, {username, password}) => {
            const user = await User.findOne({ username });
            if (!user) {
              throw new AuthenticationError('No user found with this username')
            }
        
            const correctPw = await user.isCorrectPassword(password)
        
            if (!correctPw) {
              throw new AuthenticationError('Wrong Password')
            }
            const token = signToken(user)
            return { token, user }
          },
          saveBook: async (_, { user, book }) => {
            console.log(user);
            try {
              const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: book } },
              );
              return updatedUser
            } catch (err) {
              console.log(err);
              throw new AuthenticationError('You must be logged in')
            }
          },
          removeBook: async (_, { bookId }, context) => {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context._id },
              { $pull: { savedBooks: { bookId: bookId } } },
            );
            if (!updatedUser) {
              throw new AuthenticationError('No user found with this id?')
            }
            return updatedUser
          },

    }
}

module.exports = resolvers