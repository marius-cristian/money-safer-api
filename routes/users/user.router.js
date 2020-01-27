const publicRouter = require('express').Router({ mergeParams: true });
const protectedRouter = require('express').Router({ mergeParams: true });
const userController = require('../../controllers/userController');

publicRouter.post("/create-user", userController.createUser);
publicRouter.post("/login", userController.loginUser);

protectedRouter.post("/logout", userController.logOut);
protectedRouter.get("/getUserData", userController.getUserData);
protectedRouter.post("/update-user", userController.updateUser);
protectedRouter.post("/deleteUser", userController.deleteUser);

module.exports = {
    public: publicRouter,
    protected: protectedRouter};