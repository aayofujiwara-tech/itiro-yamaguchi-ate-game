"use client";

interface SpotifyLinkProps {
  songTitle: string;
}

export default function SpotifyLink({ songTitle }: SpotifyLinkProps) {
  const url = `https://open.spotify.com/search/${encodeURIComponent("サカナクション " + songTitle)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md transition-all duration-200"
      style={{
        color: "#1DB954",
        border: "1px solid rgba(29, 185, 84, 0.3)",
        backgroundColor: "rgba(29, 185, 84, 0.05)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(29, 185, 84, 0.12)";
        e.currentTarget.style.boxShadow = "0 0 10px rgba(29, 185, 84, 0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(29, 185, 84, 0.05)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      🎵 Spotifyで「{songTitle}」を聴く
    </a>
  );
}
