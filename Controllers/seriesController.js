const series = require("../Models/seriesmodels")
const jwt = require("jsonwebtoken");
 // ✅ adjust path if different

exports.addSeries = async (req, res) => {
  console.log('Inside the add-series controller');

  const { title, year, rating, overview, seasons, tmdbId } = req.body; // ✅ include all required fields
  console.log(title, year, rating, overview, seasons, tmdbId);

  const seriesImg = req.file.filename; // ✅ image from multer
  console.log("Image:", seriesImg);

  const userId = req.payload; // ✅ extracted from JWT middleware
  console.log("User:", userId);

  try {
    // Check for existing series using TMDb ID to prevent duplicates
    const existingSeries = await series.findOne({ tmdbId });

    if (existingSeries) {
      res.status(406).json(`Series already exists!!`);
    } else {
      const newSeries = new series({
        title,
        year,
        rating,
        overview,
        seasons,
        tmdbId,
        seriesImg,
        userId
      });

      await newSeries.save();
      res.status(200).json(newSeries);
    }
  } catch (error) {
    res.status(401).json(`Series adding failed due to ${error}`);
  }
};

  
  

    

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


                                exports.updateUserSeriesController = async (req, res) => {
                                    console.log(`Inside update user series`);
                                  
                                    const { id } = req.params;
                                    const userId = req.payload;
                                  
                                    // Fields like title, year, etc. might come as strings in form-data
                                    const { title, year, seasons, rating, overview } = req.body;
                                  
                                    try {
                                      // Handle image logic: use uploaded file OR fallback to existing one from body
                                      let uploadImage = "";
                                  
                                      if (req.file) {
                                        uploadImage = req.file.filename;
                                      } else if (req.body.seriesImg) {
                                        uploadImage = req.body.seriesImg;
                                      } else {
                                        // You can even fetch the existing series and keep its image if nothing is passed
                                        const existingSeries = await series.findById(id);
                                        uploadImage = existingSeries?.seriesImg || "";
                                      }
                                  
                                      const updatedSeries = await series.findByIdAndUpdate(
                                        { _id: id },
                                        {
                                          title,
                                          year,
                                          seasons,
                                          rating,
                                          overview,
                                          seriesImg: uploadImage,
                                          userId
                                        },
                                        { new: true }
                                      );
                                  
                                      res.status(200).json(updatedSeries);
                                    } catch (error) {
                                      console.error("Update error:", error);
                                      res.status(401).json(error);
                                    }
                                  };
                                  


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
                                        