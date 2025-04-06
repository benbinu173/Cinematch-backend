const series = require("../Models/seriesmodels")


exports.addSeries = async (req, res) =>
    {
        console.log('inside the add-series and in the controller');
    
    
        const { title, year,seasons, rating, overview} = req.body
        //the details are taken from the body of the request. 
    
        console.log(title, year,seasons , rating, overview);
    
        const seriesImg = req.file.filename
        console.log(seriesImg);
        
        const userId  = req.payload
        console.log(userId);
        
    
        try{
            const existingSeries = await series.findOne({title})
    
            if(existingSeries)
            {
                res.status(406).json(`series already exists !!`)
            }
            else{
                const newSeries = new series({
                    
                    title, year, rating,seasons, overview,seriesImg,userId
    
                })
                await newSeries.save()
                res.status(200).json(newSeries)
            }
        }
        catch (error)
        {
                res.status(401).json(`Series adding failed due to ${error}`)
        }
        
    
    
        
    }

    

      exports.getUserSeriesController = async (req ,res) =>
    
       
        
                {
                
                    console.log(`inside get user series `);
                
                    const userId = req.payload
                    // this id is for the projects that have been created 
                    // check middelware
                    try
                    {
                        const allSeries = await series.find({userId})
                        res.status(200).json(allSeries)
                    }
                    catch (error)
                    {
                        res.status(401).json(error)
                    }
                }

                exports.removeUserSeriesController = async(req,res)=>
                
                                {
                                    console.log(`inside Remove user series  Controller`);
                                    const {id} = req.params
                                
                                    try{
                                        const allSeries = await series.findByIdAndDelete(id);
                                        // this is the id for a particular user. {_id}
                                        res.status(200).json(allSeries)
                                    }
                                    catch(error)
                                    {
                                        res.status(401).json(error)
                                    }
                                    
                                }


                                exports.updateUserSeriesController = async (req , res) =>

                                    {
                                        console.log(`inside  update user movie`)
                                
                                        // id is for the project id
                                        const {id} = req.params
                                        const userId = req.payload
                                
                                        const{title,year,seasons,rating,overview,seriesImg} = req.body
                                        console.log(title,year,seasons,rating,overview,seriesImg);
                                
                                        // here we created upload image because if we edit by givin the porjecta new image the new image will be saved in upload image else the old img tht is profile img.
                                        const uploadImage = req.file ? req.file.filename : seriesImg
                                
                                        try{
                                            const existingSeries = await series.findByIdAndUpdate({_id : id} , 
                                            {
                                                title,
                                                year,
                                                seasons,
                                                rating,
                                                
                                                overview,
                                                seriesImg : uploadImage,
                                                userId
                                            },{new:true})
                                
                                            await existingSeries.save()
                                            res.status(200).json(existingSeries)
                                        }
                                        catch (error)
                                        {
                                            res.status(401).json(error)
                                        }
                                        
                                    }


                                    // ✅ Get Series by TMDb ID
                                    // exports.getSeriesByTmdbId = async (req, res) => {
                                    //     const { tmdbId } = req.params;
                                      
                                    //     try {
                                    //       const Series = await series.findOne({ tvShowId: tmdbId }); // Use the correct field
                                    //       if (!Series) return res.status(404).json({ message: "Series not found" });
                                      
                                    //       res.status(200).json(Series);
                                    //     } catch (error) {
                                    //       res.status(500).json({ message: "Error fetching series", error });
                                    //     }
                                    //   };
                                        