// src/pages/Browse.tsx
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import  { useEffect, useRef, useState } from "react";
import Alertbox from "./Alertbox";
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";


type Media = {
  id: number;
  title: string;
  type: string;
  director?: string | null;
  budget?: number | null;
  location?: string | null;
  duration?: string | null;
  year?: number | null;
  description?: string | null;
  posterUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function Browse() {
  const navigate = useNavigate();
const [picked, setPicked] = useState<number[]>([]);

  const [alertOpen, setAlertOpen] = useState(false);
const [alertMessage, setAlertMessage] = useState("");
const [deleteId, setDeleteId] = useState<number | null>(null);

  const [media, setMedia] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
const [search, setSearch] = useState("");



const formatBudget = (value: number | string): string => {
  const num = Number(value);
  const compact = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
  return `$${compact}`;   
};

const fetchPage = async (p: number) => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token"); 

    const res = await axios.get("http://localhost:3000/api/media", {
      params: { page: p, limit },
      headers: {                           
        Authorization: `Bearer ${token}`
      }
    });

    const body = res.data;
    if (!body.success) throw new Error(body.message || "Fetch failed");

    setMedia(prev => {
      const existing = new Set(prev.map((item: Media) => item.id));
      const filtered = body.data.filter((item: Media) => !existing.has(item.id));
      return [...prev, ...filtered];
    });

    setHasMore(body.meta?.hasMore ?? body.data.length === limit);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


//   // Delete handler
// async function handleDelete(id: number) {
//   const confirmDelete = window.confirm("Are you sure you want to delete?");
//   if (!confirmDelete) return;

//   try {
//     await axios.delete(`http://localhost:3000/api/media/${id}`);

//     setMedia(prev => prev.filter(m => m.id !== id));

//     setAlertMessage("Deleted Successfully ✅");
//     setAlertOpen(true);
//   } catch (error) {
//     setAlertMessage("Delete Failed ❌");
//     setAlertOpen(true);
//   }
// }

// const handleEdit = (m: Media) => {
//   console.log("Edit clicked:", m);
// }

const handleEdit = (media: Media) => {
  navigate(`/add`, { state: media });
};


function handleDeleteClick(id: number) {
  setDeleteId(id);
  setAlertMessage("Are you sure you want to delete?");
  setAlertOpen(true);
}

async function confirmDelete() {
  if (deleteId === null) return;
  try {
  
        const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:3000/api/media/${deleteId}`,{
            headers: { Authorization: `Bearer ${token}` }

    });
    setMedia(prev => prev.filter(m => m.id !== deleteId));
    setAlertMessage("Deleted Successfully ✅");
  } catch {
    setAlertMessage("Delete Failed ❌");
  }
  setDeleteId(null);
}


// Initial load (first page)
useEffect(() => {
  fetchPage(1);
}, []);

// Fetch when page increases (page 2, 3, 4...)
useEffect(() => {
  if (page === 1) return; 
  fetchPage(page);
}, [page]);

// Infinite scroll using IntersectionObserver
useEffect(() => {
  if (!sentinelRef.current) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setPage(prev => {
        if (!hasMore || loading) return prev; 
        return prev + 1;
      });
    }
  });

  observer.observe(sentinelRef.current);

  return () => observer.disconnect();
}, []); 


const filteredMedia = media.filter((m) => {
  const s = search.toLowerCase();
  return (
    m.title.toLowerCase().includes(s) ||
    m.type.toLowerCase().includes(s) ||
    (m.director ?? "").toLowerCase().includes(s)
  );
});


const addToWeekendPicks = async (mediaId: number) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:3000/api/weekend/toggle",
      { mediaId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // ✅ Toggle UI state
    setPicked((prev) =>
      prev.includes(mediaId)
        ? prev.filter((id) => id !== mediaId) // remove if already picked
        : [...prev, mediaId] // add if not picked
    );

    setAlertMessage(res.data.message);
    setAlertOpen(true);

  } catch (err) {
    console.log(err);
  }
};



useEffect(() => {
  const fetchPicked = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/weekend", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPicked(res.data.data.map((p: any) => p.mediaId));
    } catch (err) {
      console.log(err);
    }
  };

  fetchPicked();
}, []);



  return (
    <div className="p-6 bg-[#141414] min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-white">Browse Media</h1>
<div className="flex justify-center mb-6">
  <TextField
    variant="outlined"
    placeholder="Search movies & shows..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    sx={{
      width: { xs: "90%", sm: "70%", md: "50%" },
      input: { color: "white" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#9ca3af" }, 
        "&:hover fieldset": { borderColor: "#E50914" }, 
        "&.Mui-focused fieldset": { borderColor: "#E50914" } 
      }
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon className="text-gray-400" />
        </InputAdornment>
      ),
    }}
  />
</div>



      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y">
          <thead className="bg-red-400">
            <tr className=" bg-red-900 text-amber-50">
               <th className="px-4 py-2 text-center text-sm bg-red-900">Poster</th>
              <th className="px-4 py-2  text-center text-sm">Title</th>
              <th className=" hidden sm:table-cell px-4 py-2 text-left text-sm">Type</th>
              <th className=" hidden md:table-cell px-4 py-2 text-left text-sm">Director</th>
              <th className=" hidden  lg:table-cell px-4 py-2 text-left text-sm">Budget</th>
              <th className="hidden lg:table-cell  px-4 py-2 text-left text-sm">Location</th>
              <th className="hidden lg:table-cell px-4 py-2 text-left text-sm">Duration</th>
              <th className=" hidden lg:table-cell px-4 py-2 text-left text-sm">Year</th>
              <th className="px-4 py-2  text-left text-sm">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y bg-red-100">
           {filteredMedia.map(m => (

              <tr key={m.id} className="hover:bg-rose-300">
                <td className="px-4 py-3">
  <img
    src={m.posterUrl ?? ""}
    alt={m.title}
    className="w-16 h-20 object-cover rounded"
    onError={(e) => (e.currentTarget.src = "https://placehold.co/100x140")}
  />

<dl className="lg:hidden text-sm text-gray-700 text-center">
  <dt className="sr-only ">Type</dt>
  <dd className="md:hidden">{m.type}</dd>
  <dt className="sr-only ">Director</dt>
  <dd className="md:hidden">{m.director}</dd>
  <dt className="sr-only ">Duration</dt>
  <dd className="md:hidden">{m.duration}</dd>
  </dl>

<dt className="sr-only sm:hidden ">Budget</dt>
  <dd className="hidden  md:table-cell lg:hidden">{formatBudget(m.budget!)}</dd>
   <dt className="sr-only ">Year</dt>
  <dd className="hidden md:table-cell lg:hidden">{m.year}</dd>
</td>
                <td className="px-4 py-3 text-center">{m.title}

<dl className=" lg:hidden text-xs text-gray-700 px-4  space-y-1 text-center">
  <dt className="sr-only  py-3">Location</dt>
  <dd className="">{m.location}</dd>
   <dt className="sr-only ">Budget</dt>

<dd className="md:hidden">{formatBudget(m.budget!)}</dd>


   <dt className="sr-only">Year</dt>
  <dd className="md:hidden">{m.year}</dd>
</dl>

                </td>
                <td className="hidden sm:table-cell px-4 py-3">{m.type}</td>
                <td className=" hidden md:table-cell px-4 py-3">{m.director}</td>
                <td className=" hidden lg:table-cell px-4 py-3">
{formatBudget(m.budget!)}
</td>
                <td className="hidden lg:table-cell px-4 py-3">{m.location}</td>
                <td className="hidden lg:table-cell px-4 py-3">{m.duration}</td>
                <td className="hidden px-4 lg:table-cell py-3">{m.year}</td>
              

<td className="px-4 py-8 text-center flex flex-col gap-2 lg:mt-0 mt-5">

  {/* Row: Edit + Delete */}
  <div className="flex justify-center gap-2">
    <button
      onClick={() => handleEdit(m)}
      className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
    >
      Edit
    </button>

    <button
      onClick={() => handleDeleteClick(m.id)}
      className="text-sm px-2 py-1 border rounded text-red-600 hover:bg-red-50"
    >
      Delete
    </button>
  </div>

  {/* Row: Weekend Pick tag */}
  <div className="flex justify-center">
  <span
  onClick={() => addToWeekendPicks(m.id)}
  className={`px-3 py-1 text-xs rounded-lg cursor-pointer shadow-md transition
    ${picked.includes(m.id)
      ? "bg-green-600 text-white hover:bg-green-700"
      : "bg-purple-950 text-white hover:bg-purple-400"
    }`}
>
  {picked.includes(m.id) ? "Picked ✓" : "Weekend Pick"}
</span>

  </div>

</td>



              </tr>
            ))}

  {!loading && filteredMedia.length === 0 && (
    <tr>
      <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
        No media found
      </td>
    </tr>
  )}
          </tbody>
        </table>
      </div>

      

      <div ref={sentinelRef} className="h-8" />

      <div className="mt-4">
        {loading && <p>Loading...</p>}
        {!hasMore && media.length > 0 && <p className="text-sm text-gray-500">No more records</p>}
     
      </div>

     <Alertbox
  open={alertOpen}
  onClose={() => setAlertOpen(false)}
  title="Message"
  message={alertMessage}
  onConfirm={deleteId !== null ? confirmDelete : undefined}
/>

    </div>
  );
}
