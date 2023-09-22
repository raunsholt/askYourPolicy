import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userQuestion, setUserQuestion] = useState("");
  const [result, setResult] = useState();
  const [policyType, setPolicyType] = useState("car"); // default to car policy

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userQuestion, policyType: policyType }), // send policy type
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setUserQuestion("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Ask Your Car Policy</title>
        <link rel="icon" href="/dog.png" /> {/* Consider changing this icon to something more relevant */}
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} /> {/* Consider changing this image to something more relevant */}
        <h3>Spørg din police</h3>
        <h4>Vælg police</h4>
        <form onSubmit={onSubmit}>
        <select value={policyType} onChange={(e) => setPolicyType(e.target.value)}>
          <option value="car">Bil</option>
          <option value="accident">Ulykke</option>
        </select>
        <h4>Skriv spørgsmål</h4>
        <input
          type="text"
          name="question"
          placeholder="Skriv dit spørgsmål"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
        />
        <input type="submit" value="Spørg din police" />
      </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
