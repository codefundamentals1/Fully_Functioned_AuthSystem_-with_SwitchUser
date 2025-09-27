exports.index = (req ,res )=>{
    console.log(req.body);
    res.json({msg : "this is the dashboard controller"})
    
}