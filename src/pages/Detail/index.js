import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import Loading from "../../components/Loading";

const Detail = () => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { character_id } = useParams();

  useEffect(() => {
    (async () => {
      await axios(
        `https://gateway.marvel.com/v1/public/characters/${character_id}`,
        {
          params: {
            apikey: "f2f629fceb0c7b1effeb338fc4d26448",
            ts: 1,
            hash: "8397705a38cce656bd08e96ddb9fe91d",
          },
        }
      )
        .then((res) => res.data)
        .then((data) => setChar(data.data.results[0]))
        .finally(() => setLoading(false));
    })();
  }, [character_id]);

  return (
    <>
    {loading && <Loading/>}
      {char && (
        <div className="detail--container">
          <h2 className="detail--title">{char.name}</h2>
          <img
            src={char.thumbnail.path + "." + char.thumbnail.extension}
            alt={char.name}
            style={{ width: "500px" }}
          />
          <p className="detail--desc">{char.description}</p>
        </div>
      )}
    </>
  );
};

export default Detail;
