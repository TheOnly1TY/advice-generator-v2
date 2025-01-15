import { useEffect, useState } from "react";
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [getAdvice, setGetAdvice] = useState("");

  const fetchAdvice = async () => {
    setIsLoading(true);
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setGetAdvice(data.slip);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const { id, advice } = getAdvice;
  return (
    <div className="advice--container">
      <p className="advice-id">
        {isLoading || id === undefined ? "" : `Advice #${id}`}
      </p>
      <h1 className="advice-text">
        {isLoading || advice === undefined ? <Spinner /> : advice}
      </h1>
      <figure className="pattern-divider">
        <img src="images/pattern-divider-mobile.svg" alt="pattern divider" />
      </figure>
      <figure className="generate-advice--btn" onClick={() => fetchAdvice()}>
        <img src="images/icon-dice.svg" alt="Button" />
      </figure>
    </div>
  );
}

function Spinner() {
  return (
    <>
      <div class="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
