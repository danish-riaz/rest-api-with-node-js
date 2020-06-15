exports.getUser = (req, res, next) => {
    res.status(200).json(
        [
            { email: 'test1@test.come', password: '4df5g5F5gR2XAW' },
            { email: 'test2@test.come', password: '4df5g5F5gR2XAW' },
            { email: 'test3@test.come', password: '4df5g5F5gR2XAW' },
            { email: 'test4@test.come', password: '4df5g5F5gR2XAW' },
            { email: 'test5@test.come', password: '4df5g5F5gR2XAW' }
        ]
    );
}

exports.postUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // create user in db
    console.log(email);
    console.log(password);

    res.status(201).json({
        message: 'User Created Successfully !',
        user: {
            email: email,
            password: password
        }
    });
}