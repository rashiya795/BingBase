export default function Favourites() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "70vh",
      textAlign: "center"
    }}>
      
      <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
        Favourites ❤️
      </h1>

      <p style={{ fontSize: "18px", color: "#555", maxWidth: "400px" }}>
        This feature is currently under development. Soon you’ll be able to save your favourite movies and TV shows here!
      </p>

      <div style={{
        marginTop: "20px",
        padding: "10px 16px",
        borderRadius: "6px",
        background: "#111",
        color: "white",
        fontWeight: "bold",
      }}>
        Coming Soon...
      </div>
    </div>
  );
}

