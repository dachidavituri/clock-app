import refresh from "../../assets/desktop/icon-refresh.svg";
import "./Quote.css";
import { useEffect, useState } from "react";
interface Quote {
  content: string;
  author: string;
}
function Quote() {
  const urlQuote = "https://api.quotable.io/quotes/random";
  const [quote, setQuote] = useState<Quote>({ content: "", author: "" });
  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setQuote({ content: data[0].content, author: data[0].author });
    }catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(urlQuote);
  }, []);
  return (
    <div className="quote-section">
      <div className="a">
        <p className="quote">{quote?.content}</p>
        <p className="author">{quote?.author}</p>
      </div>
      <img src={refresh} onClick = {() => fetchData(urlQuote)} className="refresh-img"/>
    </div>
  );
}
export default Quote;
