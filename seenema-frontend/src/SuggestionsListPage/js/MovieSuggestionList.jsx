import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../Auth/JavaScript/AuthContext";
import Loading from "../../assets/loading.json";
import Lottie from "lottie-react";
import '../../Homepage/css/MovieList.css';
import '../../Auth/JavaScript/Auth';
import '../css/SuggestedMoviesList.css';
import ListOfMovies from "./ListOfMovies";


const MovieSuggestionList = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const [suggestedMoviesList, setSuggestedMoviesList] = useState(new Set());
    // const[movieId, setMovieId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleGetMoviesList = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://9acdf5s7k2.execute-api.us-west-2.amazonaws.com/dev/getUserInfo", {
                method: "POST",
                body: JSON.stringify({
                    Email: user.email
                })
            });

            if (response.ok) {
                console.log("Movies list fetched successfully!");
                const userData = await response.json();

                // Check if Friends array exists before using map
                if (userData.MovieSuggestionsList && Array.isArray(userData.MovieSuggestionsList)) {
                    const suggestedMovieList = userData.MovieSuggestionsList;
                    setSuggestedMoviesList(new Set(suggestedMovieList));
                } else {
                    console.error("Invalid movies list data:", userData);
                }
            } else {
                console.error("Failed to fetch movie list:", response.status, response.statusText);

                // Log the response when it's not OK
                const errorResponse = await response.text();
                console.error("Error response:", errorResponse);
            }
        } catch (error) {
            console.error("Error fetching movie list:", error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        handleGetMoviesList();
    }, []);

    return (
        <div>
            <div className="mylist-header">
                <button onClick={handleGoBack} className="generic-button button-back-suggestionList">Back
                </button>
                <h2 className="my-list-title">Friend Suggestion List</h2>
            </div>
            <div className="list-main-area">
                {loading ? (
                    <div className="loading-container-suggestion-list">
                        <Lottie loop={true} animationData={Loading}/>
                    </div>
                ) : (
                    <div>
                        {suggestedMoviesList.size > 0 && (
                            <ListOfMovies
                                moviesList={Array.from(suggestedMoviesList)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default MovieSuggestionList;