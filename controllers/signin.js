const handleSign=(req,res,db,bcrypt) => {
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json("please Enter email and Password")//if input field are empty then function will terminate here by sending response
    }
    // bcrypt.hash(req.body.password, null, null, function(err, hash) {
    //     console.log(hash);
    //     // Store hash in your password DB.
    // });
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials,please try again')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}
module.exports={
    handleSign:handleSign
}