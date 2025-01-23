const authorization = async(req, res, next) => {
        
    if(req.params.userId == req.userId){
        return next();
    }
    return res.status(500).json({msg: "You cannot update this user info"});
}

export default authorization;