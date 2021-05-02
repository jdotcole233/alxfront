import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import './random.css'

function Random() {

    const [kitsu, setKitsu] = useState({
        isLoading: false,
        kitsu_data: []
    })
    const [coverImage, setCoverImage] = useState("")
    const [kitsuData, setKitsuData] = useState({});
    const [searchTerm , setSearchTerm] = useState("adventure");

    const [choice, setChoice] = useState("anime")

    useEffect(() => {
        fetch(`https://kitsu.io/api/edge/${choice}?filter[categories]=${searchTerm}`, {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setKitsu({
              isLoading: true,
              kitsu_data: data.data,
            });
            console.log(kitsu);
          })
          .catch((error) => console.error(error));
    }, [choice, searchTerm]);

    const open_link = (url) => {
        window.open(url);
    };

    // const slider = (images) => {
    //    for (let index = 0; index <= images.lenth; index++){
    //        <img src={images[index]} />
    //    }
    // }


    if (!kitsu.isLoading) return <p> Loading ...</p>

    return (
      <div>
        <div className="row quickread">
          <h1 className="p-2">Kitsu API</h1>
          <p className="p-2">Quick Read</p>
          {/* <img src={coverImage || ""} /> */}
        </div>
        <div className="flex justify-content-between row">
          <div className="form-group col-lg-4 p-2">
            <select
              className="form-control"
              value={choice}
              onChange={(evt) => setChoice(evt.target.value)}
            >
              <option value="anime">Anime</option>
              <option value="manga">Manga</option>
            </select>
          </div>
           <div className="col-lg-4 p-2 mr-2 form-group">
               {/*<label htmlFor="search term">Search Category</label>*/}
               <input type="text" onChange={(e) => setSearchTerm(e.target.value || "adventure")}  placeholder="Search Category"  className="form-control"/>
           </div>
        </div>
        <div className="row">
          {kitsu.kitsu_data.map((anime) => (
            <div key={anime.id} className="card m-2" style={{ width: "15rem" }}>
              <img
                onMouseEnter={() =>
                  setCoverImage(anime?.attributes?.coverImage?.small || "")
                }
                style={{ width: "15rem", height: "12rem" }}
                src={anime.attributes.posterImage.small}
                className="card-img-bottom"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{anime.attributes.titles.en}</h5>
                <span>
                  Status:{" "}
                  <span className="badge bg-danger text-white p-2">
                    {anime.attributes.status}
                  </span>
                  <span className="badge bg-secondary p-2 ml-1">
                    {anime.attributes.averageRating}
                  </span>
                </span>
                <p className="card-text">
                  {anime.attributes.synopsis.slice(0, 100)} ...
                </p>
                <Link
                  onClick={() =>
                    window.open(
                      `https://kitsu.io/${choice}/${anime.attributes.slug}`
                    )
                  }
                  className="btn btn-primary btn-sm mr-1"
                >
                  {" "}
                  See More..{" "}
                </Link>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Random
