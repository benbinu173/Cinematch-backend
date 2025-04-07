    const movies = require("../Models/moviemodels")
    const jwt = require("jsonwebtoken");


    exports.addMovies = async (req, res) => {
        console.log('inside the add-movies and in the controller');
      
        const { title, year, rating, overview, tmdbId } = req.body; // ✅ include tmdbId
        console.log(title, year, rating, overview, tmdbId);
      
        const movieImg = req.file.filename;
        console.log("Image:", movieImg);
      
        const userId = req.payload;
        console.log("User:", userId);
      
        try {
          const existingMovie = await movies.findOne({ title });
      
          if (existingMovie) {
            res.status(406).json(`Movie already exists!!`);
          } else {
            const newMovie = new movies({
              title,
              year,
              rating,
              overview,
              tmdbId, // ✅ saving TMDb ID
              movieImg,
              userId
            });
      
            await newMovie.save();
            res.status(200).json(newMovie);
          }
        } catch (error) {
          res.status(401).json(`Movie adding failed due to ${error}`);
        }
      };
      

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

                exports.updateUserMovieController = async (req, res) => {
                    console.log(`Inside update user movie`);
                
                    const { id } = req.params;
                    const userId = req.payload;
                
                    const { title, year, rating, overview } = req.body;
                    // no movieImg from body
                    const uploadedImage = req.file ? req.file.filename : null;
                
                    try {
                        const existingMovie = await movies.findById(id);
                
                        if (!existingMovie) {
                            return res.status(404).json({ message: "Movie not found" });
                        }
                
                        const updatedMovie = await movies.findByIdAndUpdate(
                            { _id: id },
                            {
                                title,
                                year,
                                rating,
                                overview,
                                movieImg: uploadedImage ? uploadedImage : existingMovie.movieImg,
                                userId,
                            },
                            { new: true }
                        );
                
                        res.status(200).json(updatedMovie);
                    } catch (error) {
                        console.log("Update error:", error);
                        res.status(500).json(error);
                    }
                };
                
                

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
                      

                