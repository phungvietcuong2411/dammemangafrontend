export default function MangaPoster({ poster }) {
  return (
    <div className="h-96 overflow-hidden">
      {/* <div className="absolute inset-0 bg-black/60 z-10"></div> */}
      <img
        src={poster}
        alt="Poster"
        className="w-full h-full object-cover opacity-80"
      />
    </div>
  );
}