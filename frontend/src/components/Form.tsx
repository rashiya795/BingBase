import { useState } from "react";
import axios from "axios";
import Alertbox from "./Alertbox";
import { useLocation ,useNavigate} from "react-router-dom";

interface MediaFormData {
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget?: number;
  location: string;
  duration: string;
  year: number;
  description: string;
  posterUrl: string;
}




export default function MediaForm() {

const { state } = useLocation(); 
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");




  const [formData, setFormData] = useState<MediaFormData>({
  title: state?.title || "",
  type: state?.type || "Movie",
  director: state?.director || "",
  budget: state?.budget ?? undefined,
  location: state?.location || "",
  duration: state?.duration || "",
  year: state?.year || new Date().getFullYear(),
  description: state?.description || "",
  posterUrl: state?.posterUrl || "",
});


  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "year" || name === "budget" ? Number(value) : value,
    });
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token"); // Get token

    if (state?.id) {
      // 👉 EDIT MODE
      await axios.put(
        `http://localhost:3000/api/media/${state.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` } // Send token
        }
      );

      setAlertTitle("Updated");
      setAlertMessage("Media updated successfully!");
      setAlertOpen(true);

      setTimeout(() => navigate("/browse"), 2000);

    } else {
      // 👉 ADD MODE
      await axios.post(
        "http://localhost:3000/api/media",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` } // Send token
        }
      );

      setAlertTitle("Success");
      setAlertMessage("Media added successfully!");
      setAlertOpen(true);
    }

  } catch (error: any) {
    setAlertTitle("Error");
    setAlertMessage(error.response?.data?.message || "Network or server error");
    setAlertOpen(true);
  }
}


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
       <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg space-y-4 border border-gray-200"
      >
<h2 className="text-2xl font-semibold text-gray-800 text-center mb-3">
 Binge Setup
</h2>
        <input
          className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

      <select
  name="type"
  value={formData.type}
  onChange={handleChange}
  className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
>
  <option value="Movie">Movie</option>
  <option value="TV Show">TV Show</option>
</select>

        <input
          className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
          name="director"
          placeholder="Director"
          value={formData.director}
          onChange={handleChange}
          required
        />

        <input
          className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
          name="budget"
          type="number"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
          required
        />

        <input
          className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
          name="duration"
          placeholder="Duration (ex: 2h 30m)"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        <input
          className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
          name="year"
          type="number"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />

        <textarea
          className="w-full p-2 border rounded h-24 resize-none outline-none focus:ring-2 focus:ring-indigo-400"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
          name="posterUrl"
          placeholder="Poster Image URL"
          value={formData.posterUrl}
          onChange={handleChange}
          required
        />

       <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
  Save
</button>

      </form> 
 

      <Alertbox
  open={alertOpen}
  onClose={() => setAlertOpen(false)}
  title={alertTitle}
  message={alertMessage}

/>


    </div>
  );
}
