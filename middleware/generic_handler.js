exports.generic_handler = (req,res,next,promise,solver)=>{
  promise.then(function(result){
    let df = solver.call(this, result);
    res.json({status:200, data:df});
  }).catch(function(err){
  	res.json({status:500, data:"Internal server Error"})
  	next(err);});
};
