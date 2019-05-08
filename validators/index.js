exports.createPostValitador = (req, res, next) => {
    // title
    req.check("title", "Write a title").notEmpty();
    req.check("title", "Title must be between 4 and 150 characters").isLength({
        min: 4,
        max: 150
    });
    // body
    req.check("body", "Write a body").notEmpty();
    req.check("bosy", "Body must be between 4  and 2000 characteres").isLength({
        min: 4,
        max: 2000
    });
    // check for erros
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to next middleware
    next();
}

exports.userSignupValidator = (req, res, next) => {
    // name is not null and betwwen 4-10 characteres
    req.check("name", "Name is required").notEmpty();
    // email is not null, valid and normalized
    req.check("email", "Email must be between 3  and 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min: 4,
        max: 2000
    });
    // check for password
    req.check("password", "Password is required").notEmpty();
    req.check("password")
    .isLength({min: 6})
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
    // check for erros
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    // proceed to next middleware
    next();
}