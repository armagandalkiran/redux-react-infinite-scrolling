import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCharacters } from "../../redux/charactersSlice";
import Masonry from "react-masonry-css";
import "./style.css";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { Link } from "react-router-dom";

const Home = () => {
  const characters = useSelector((state) => state.characters.items);
  const isLoading = useSelector((state) => state.characters.isLoading);
  const error = useSelector((state) => state.characters.error);
  const nextPage = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading === "initial") dispatch(fetchCharacters());
  }, [dispatch, isLoading]);

  if (isLoading === "rejected") return <Error message={error} />;

  return (
    <>
      <h2 className="characters--title">CHARACTERS</h2>
      <div className="characters--container">
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {characters.map((character) => {
            return (
              <div key={character.id}>
                <Link to={"character/" + character.id}>
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    className="character"
                    alt={character.name}
                  />
                  <div>
                    <h3>{character.name}</h3>
                  </div>
                </Link>
              </div>
            );
          })}
        </Masonry>
        {isLoading === "pending" && <Loading />}
        {hasNextPage && isLoading !== "pending" && (
          <button
            className="characters--button"
            onClick={() => dispatch(fetchCharacters(nextPage))}
          >
            Load More
          </button>
        )}
        {!hasNextPage && (
          <div className="characters--nextpage-warning">
            Sayfa sonundasınız !
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
