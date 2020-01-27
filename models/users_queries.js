const Users = require("./users");

exports.create = async function (usr){
  let user = {...usr};
  try {
  	return await Users.create(user);
  }
  catch(err){
  	throw err;
  }
}

exports.findOne = async function (fields, attr){
  try {
  	return await Users.findOne({
          where:      fields
        , attributes: attr
        });
  }
  catch(err){
  	throw(err);
  }
}

exports.update = async function(fields, id){
	try {
		return await Users.update(
			fields
		  , {where: {id: id}});
	}
	catch (err){
		throw (err);
	}
}

exports.delete = async function(id){
	try {
		return await Users.destroy({
			where: {id: id}
		});
	}
	catch (err){
		throw (err);
	}
}