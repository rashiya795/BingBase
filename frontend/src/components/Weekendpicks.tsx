import { useEffect, useState } from "react";
import axios from "axios";

type Media = {
  id: number;
  title: string;
  posterUrl?: string | null;
  type: string;
};

export default function Weekendpicks() {
  const [picks, setPicks] = useState<Media[]>([]);

  useEffect(() => {
    const fetchPicks = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3000/api/weekend", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPicks(res.data.data.map((p: any) => p.media));
      } catch (err) {
        console.log(err);
      }
    };

    fetchPicks();
  }, []);

  return (
    
  <div className="p-6 bg-[#141414] min-h-screen">
    <h1 className="text-2xl font-semibold mb-4 text-white">
      Weekend Picks <span className="text-pink-400">({picks.length})</span>
    </h1>

    {picks.length === 0 && (
      <p className="text-gray-400">No weekend picks yet 😕</p>
    )}

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {picks.map((m) => (
        <div
          key={m.id}
          className="bg-[#1b1b1b] rounded-lg overflow-hidden shadow-md hover:scale-105 transition duration-300 cursor-pointer"
        >
          <img
            src={m.posterUrl ?? "https://placehold.co/200x300"}
            alt={m.title}
            className="w-full h-60 object-cover"
          />

          <div className="p-3 text-center">
            <p className="text-white font-semibold truncate">{m.title}</p>
            <p className="text-gray-400 text-xs">{m.type}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

  
}
