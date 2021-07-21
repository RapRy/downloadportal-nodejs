const UserModel = require('../models/userModel.js');

const signUp = async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        res.status(500).json({ message: "Application rejected: Something ent wrong, try sending form again" });
    }
}

const register = async (req, res) => {
    try {
        const { mobile } = req.body;
        const convertedMobile = parseInt(mobile);

        const numberExistHaveSubs = await UserModel.findOne({ mobile, 'status.subscriptionStatus': 1 });

        if(numberExistHaveSubs) return res.status(500).json({ message: "You are already subscribe to our service. Please proceed in creating your account or Sign in to your account." })

        // users who are previously subscribe to the service
        const numberExistNotSubs = await UserModel.findOne({ mobile, 'status.subscriptionStatus': 0 });
        // send message welcome back and later on when we have the function to unsubscribe, we need to update the subscription date in database 
        if(numberExistNotSubs){
            await UserModel.findOneAndUpdate({ mobile }, { 'status.subscriptionStatus': 1,  }, {useFindAndModify: false})
            return res.status(200).json({message: "Welcome back to our service!"});
        } 

        await UserModel.create({
            name: {
                firstName: "",
                lastName: "",
            },
            proPic: "",
            mobile: mobile,
            email: "",
            status: {
                subscriptionStatus: 1,
                accountStatus: 0
            },
            accountType: "user",
            receiveUpdate: {
                sms: false,
                email: false
            },
            meta: {
                downloads: [],
                comments: [],
                activities: [],
            },
            date: {
                subscribe: new Date(),
                unsubscribe: undefined,
                activation: undefined,
                signUp: undefined,
                lastActivity: undefined,
                lastSignIn: undefined,
                lastSignOut: undefined
            }
        })

        res.status(200).json({ message: "You will receive a confirmation message via SMS. After that you can proceed in creating your account." })
        
    } catch (error) {
        res.status(500).json({ message: "Application rejected: Something went wrong, try sending form again" });
    }
}

module.exports = {
    signUp,
    register
}