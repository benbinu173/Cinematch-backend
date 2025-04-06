    const movies = require("../Models/moviemodels")


    exports.addMovies = async (req, res) =>
        {
            console.log('inside the add-movies and in the controller');
        
        
            const { title, year, rating, overview} = req.body
            //the details are taken from the body of the request. 
        
            console.log(title, year, rating, overview);
        
            const movieImg = req.file.filename
            console.log(movieImg);
            
            const userId  = req.payload
            console.log(userId);
            
        
            try{
                const existingMovie = await movies.findOne({title})
        
                if(existingMovie)
                {
                    res.status(406).json(`movie already exists !!`)
                }
                else{
                    const newMovie = new movies({
                        
                        title, year, rating, overview,movieImg,userId
        
                    })
                    await newMovie.save()
                    res.status(200).json(newMovie)
                }
            }
            catch (error)
            {
                    res.status(401).json(`Movie adding failed due to ${error}`)
            }
            
        
        
            
        }

        exports.getUserMoviesController = async (req ,res) =>

   
    
            {
            
                console.log(`inside get user movies `);
            
                const userId = req.payload
                // this id is for the projects that have been created 
                // check middelware
                try
                {
                    const allMovies = await movies.find({userId})
                    res.status(200).json(allMovies)
                }
                catch (error)
                {
                    res.status(401).json(error)
                }
            }

            exports.removeUserMovieController = async(req,res)=>

                {
                    console.log(`inside Remove user movie  Controller`);
                    const {id} = req.params
                    
                
                    try{
                        const allMovies = await movies.findByIdAndDelete(id);
                        // this is the id for a particular user. {_id}
                        res.status(200).json(allMovies)
                    }
                    catch(error)
                    {
                        res.status(401).json(error)
                    }
                    
                }

                exports.updateUserMovieController = async (req , res) =>

                    {
                        console.log(`inside  update user movie`)
                
                        // id is for the project id
                        const {id} = req.params
                        const userId = req.payload
                
                        const{title,year,rating,overview,movieImg} = req.body
                        console.log(title,year,rating,overview,movieImg);
                
                        // here we created upload image because if we edit by givin the porjecta new image the new image will be saved in upload image else the old img tht is profile img.
                        const uploadImage = req.file ? req.file.filename : movieImg
                
                        try{
                            const existingMovie = await movies.findByIdAndUpdate({_id : id} , 
                            {
                                title,
                                year,
                                rating,
                                
                                overview,
                                movieImg : uploadImage,
                                userId
                            },{new:true})
                
                            await existingMovie.save()
                            res.status(200).json(existingMovie)
                        }
                        catch (error)
                        {
                            res.status(401).json(error)
                        }
                        
                    }
                

                    // exports.getMovieByTmdbId = async (req, res) => {
                    //     const { tmdbId } = req.params;
                      
                    //     try {
                    //       const movie = await movies.findOne({ movieId: tmdbId }); // 'movieId' is the TMDb ID
                    //       if (!movie) return res.status(404).json({ message: "Movie not found" });
                      
                    //       res.status(200).json(movie);
                    //     } catch (error) {
                    //       res.status(500).json({ message: "Error fetching movie", error });
                    //     }
                    //   };
                      

                