import { useState } from "react";

function Test() {
  const [payLoad, setPayload] = useState("");

  const skickaTillZapier = async (e) => {
    const payload = { payload: payLoad };
    console.log("Payload som skickas:", payload);
    try {
      const response = await fetch("https://ezplugg.onrender.com/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Nätverksfel: " + response.status);

      const data = await response.json();
      console.log("Svar från backend:", data);
    } catch (error) {
      console.error("Fel vid hämtning av frågor:", error);
    }
  };
  return (
    <>
      <div className="">
        <label>Henkes testhörna</label>
        <input
          className="input testInput"
          name="testNamn"
          id="testId"
          value={payLoad}
          onChange={(e) => setPayload(e.target.value)}
        />
        <button className="btn" onClick={skickaTillZapier}>
          Skicka
        </button>
      </div>
    </>
  );
}
export default Test;
