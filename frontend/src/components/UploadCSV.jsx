export default function UploadCSV({ setModelResults }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        "http://localhost:8000/api/transit/generate-model",
        {
          method: "POST",
          body: formData,
        }
      );

      const json = await res.json();

    //   // Wrap the backend JSON so Results.jsx recognizes it
    //   setModelResults({
    //     type: "unified", // THIS makes Results render the ML section
    //     ...json
    //   });


    // Ensure numbers are proper types
      setModelResults({
        type: "unified",
        message: json.message ?? "",
        accuracy: Number(json.accuracy ?? 0),
        features_used: Array.isArray(json.features_used) ? json.features_used : [],
        confusion_matrix: Array.isArray(json.confusion_matrix) ? json.confusion_matrix : [],
        classification_report: json.classification_report ?? "",
      });

    } catch (err) {
      console.error(err);
      alert("CSV upload failed. Check console.");
    }
  };

  return <input type="file" accept=".csv" onChange={handleUpload} />;
}
