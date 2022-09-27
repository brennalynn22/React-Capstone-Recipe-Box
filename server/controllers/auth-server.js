require("dotenv").config();
const { SECRET } = process.env;
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//How does middleware work, I know its verifying the token, but where is it imported or connected to other
const createToken = (username, id) => {
  return jwt.sign(
    {
      username,
      id,
    },
    SECRET,
    { expiresIn: "2 days" }
  );
};

module.exports ={
    register: async (req,res) =>{
        try{
            const{name, username, password} =req.body
            const foundUser= await User.findOne({where: {username}})
            if (foundUser) {
                res.status(400).send('cannot create user, try logging in')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash=bcrypt.hashSync(password, salt)
                const newUser= await User.create({name, username, hashedPasss:hash})
                const token=createToken(newUser.dataValues.username, newUser.dataValues.id)
                console.log("New User", token)
                const exp =Date.now() + 1000 *60*60*48
                res.send ({
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.idtoken, token, exp
                })
            }
        }
        catch(error){
            console.log('registration error')
            console.log(error)
            res.sendStatus(400)
        }

    },
    login: async(req,res)=>{
        try {
            const {username, password} =req.body
            let foundUser = await User.findOne({where:{username}})
            if (foundUser) {
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
                if (isAuthenticated){
                    const token =createToken(foundUser.dataValues.username, foundUser.dataValues.id)
                    const exp = Date.toStringnow() + 1000* 60 * 60 * 48
                    res.status(200).send({
                        username:foundUser.datavalues.username, userId:foundUser.dataValues.id, token, exp
                    })
                } else {
                    res.status(400).send('Cannot log in')
                }
            }else {
                res.status(400).send('Cannot log in')
            }
        } catch (error){
            console.log("Error in login")
            console.log(error)
            res.sendStatus(400)
        }
    
    }
}