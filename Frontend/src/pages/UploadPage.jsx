// ============================
// UploadPage.jsx
// ============================
import { useState } from "react";
import API from "../services/api";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [uploadedFile, setUploadedFile] = useState(() => {
    return localStorage.getItem("uploaded_file") || "";
  });

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      const res = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const fileName = res.data.filename;
      localStorage.setItem("uploaded_file", fileName);
      setUploadedFile(fileName);
      setMessage(`Uploaded Successfully`);
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg,#141e30,#243b55)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ width: "420px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">📚 Upload Notes</h2>
          <p className="text-muted small">
            Upload your PDF / DOC notes to chat with AI
          </p>
        </div>

        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="btn btn-dark w-100 rounded-pill"
          disabled={loading}
          onClick={handleUpload}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>

        {message && (
          <div className="alert alert-info mt-3 text-center py-2">
            {message}
          </div>
        )}

        {uploadedFile && (
          <div className="mt-3 text-center">
            <span className="badge bg-success p-2">
              📄 Current File: {uploadedFile}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;