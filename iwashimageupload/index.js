exports.index = function(req, res){
    message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var item_id = post.item_id;
      var closet_id= post.closet_id;
      var name = post.user_id;

	  if (!req.files)
				return res.status(400).send('No files were uploaded.');

		var file = req.files.uploaded_image;
		var img_name=file.name;

	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

              file.mv('public/images/upload_images/'+file.name, function(err) {

	              if (err)

	                return res.status(500).send(err);
      					       var sql = "INSERT INTO `users_image`(`item_id`,`closet_id`,`image`) VALUES ('" + closet_id + "','" + name + "','" + img_name + "')";

    						             var query = db.query(sql, function(err, result) {
    							                    res.redirect('profile/'+result.insertId);
    						              });
					             });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.ejs',{message: message});
          }
   } else {
      res.render('index');
   }

};
