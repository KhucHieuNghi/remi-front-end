import mongoose from '~/mongooseConnect';

export default function handler(req, res) {
    const User = mongoose.model('User', { name: String, roles: Array, age: Number });

    // const user1 = new User({ name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user'] });

    const kitty = new User({ name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user'] });
    kitty.save().then(() => console.log('meow'));

    // Some modifications in user object
    // user1.name = user1.name.toUpperCase();

    // Lets try to print and see it. You will see _id is assigned.
    // console.log(user1);

    // // Lets save it
    // user1.save((err, userObj) => {
    // if (err) {
    //     console.log(err);
    // } else {
    //     console.log('saved successfully:', userObj);
    // }
    // });

    return res.json('Post');
  }
