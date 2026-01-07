// export default function Upload({ setData, setResults }) {
//   const upload = async (e) => {
//     const file = e.target.files[0];
//     const text = await file.text();

//     const rows = text.trim().split("\n").slice(1);
//     const parsed = rows.map(r => {
//       const [t, f] = r.split(",");
//       return { time: +t, flux: +f };
//     });

//     setData(parsed);

//     const form = new FormData();
//     form.append("file", file);

//     const res = await fetch("http://localhost:8000/api/transit/detect", {
//       method: "POST",
//       body: form
//     });

//     setResults(await res.json());
//   };

//   return <input type="file" onChange={upload} />;
// }

// export default function Upload({ setResults }) {
//   const upload = async (e) => {
//     const file = e.target.files[0];

//     const form = new FormData();
//     form.append("file", file);

//     const res = await fetch("http://localhost:8000/api/transit/detect", {
//       method: "POST",
//       body: form
//     });

//     const data = await res.json();
//     setResults(data); // <-- now results comes from backend
//   };

//   return <input type="file" onChange={upload} />;
// }


// export default function Upload({ setResults, setLightCurve }) {
//   const upload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const form = new FormData();
//     form.append("file", file);

//     const res = await fetch("http://localhost:8000/api/transit/detect", {
//       method: "POST",
//       body: form
//     });

//     const json = await res.json();

//     setResults(json);
//     setLightCurve(json.light_curve);
//   };

//   return <input type="file" onChange={upload} />;
// }



export default function Upload({ setResults, setLightCurve }) {
  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("http://localhost:8000/api/transit/detect", {
        method: "POST",
        body: form
      });

      const json = await res.json();

      if (!json.light_curve) {
        console.error("Backend response:", json);
        alert("Backend error. Check console.");
        return;
      }

      setResults(json);
      setLightCurve(json.light_curve);

    } catch (err) {
      console.error(err);
      alert("Upload failed. Check console.");
    }
  };

  return <input type="file" onChange={upload} />;
}
