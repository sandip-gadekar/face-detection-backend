const handleImage=(req,res,db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => { err.status(400).json("error in image end point") })
}

module.exports={
    handleImage:handleImage
}