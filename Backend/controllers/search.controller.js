import { User } from '../models/user.model.js';
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
    
    const{query}=req.params;
    try {
        const response =await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&Language=en=Us&page=1`
        );

        if(response.results.length === 0){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    Image:response.results[0].profile_path,
                    title:response.results[0].name, 
                    searchType:"person",
                    createAt:new Date(), 
                },
            },
        });

        res.status(200).json({success: true,content:response.results});

    }catch (error) {
        console.log("Error in searchPerson controller: ",error.message);
        res.status(500).json({ success: false, message: "Internal server Error" });

    }
}
export async function searchMovie(req, res) {
    const { query } =req.params;

    try{
        const response =await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        );
        if(response.results.length === 0){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    Image:response.results[0].poster_path,
                    title:response.results[0].title, 
                    searchType:"movie",
                    createAt:new Date(), 
                },
            },
        });
        res.status(200).json({ success:true,content: response.results});

    }catch(error) {
        console.log("Error in searchMovie controller: ",error.message);
        res.status(500).json({ success: false, message: "Internal server Error" }); 

    }
}
export async function searchTv(req, res) {
    const { query } =req.params;
    try {
        const response =await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
        );
        if (response.results.length === 0){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    Image:response.results[0].poster_path,
                    title:response.results[0].name, 
                    searchType:"tv",
                    createAt:new Date(), 
                },
            },
        });
        res.status(200).json({ success:true,content: response.results});
    } catch (error) {
        console.log("Error in searchTv controller: ",error.message);
        res.status(500).json({ success: false, message: "Internal server Error" }); 
    }
}

export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({success: true,content: req.user._id });

    } catch (error) {
        res.status(500).json({success: false,message: "Internal Server Error"});
    }
}

export async function removeItemFromSearchHistory(req, res) {
    let { id } = req.params;

    id = parseInt(id);

    try {
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory: {id: id},
            },
        });
        res.status(200).json({ success: true, message: "Item Removed from search history"});
    } catch (error) {
        console.log("Error in removeItem FromsearchHistory controller: ",error.message);
        res.status(500).json({ succes: false, message: "Internal Server Error" });
    }
}