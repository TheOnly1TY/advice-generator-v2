import { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import { Error } from "./Error";
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [getAdvice, setGetAdvice] = useState("");
  const [getWidth, setGetWidth] = useState(window.innerWidth);
  const [error, setError] = useState("");

  const fetchAdvice = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) throw new Error("fetch gone wrong");
      const data = await res.json();
      setGetAdvice(data.slip);
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError(
          "Oops😢!, couldn't get an advice for you, please check your internet connection and try again"
        );
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  useEffect(() => {
    const handleResize = () => setGetWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [getWidth]);

  const { id, advice } = getAdvice;
  return (
    <div className="advice--container">
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <p className="advice-id">
            {isLoading || id === undefined ? "" : `Advice #${id}`}
          </p>
          <h1 className="advice-text">
            {isLoading || advice === undefined ? <Spinner /> : `"${advice}"`}
          </h1>
          <figure className="pattern-divider">
            <img
              src={`images/pattern-divider-${
                getWidth <= 500 ? "mobile" : "desktop"
              }.svg`}
              alt="pattern divider"
            />
          </figure>
          <figure
            className="generate-advice--btn"
            onClick={() => fetchAdvice()}
          >
            <img src="images/icon-dice.svg" alt="Button" />
          </figure>
        </>
      )}
    </div>
  );
}
