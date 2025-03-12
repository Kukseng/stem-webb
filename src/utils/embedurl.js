
export const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/;
    const match = url.match(regex);
    const videoId = match ? match[1] : null;
  
    if (!videoId) return url;
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3&controls=1`;
  };
  
  export const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}:${mins.toString().padStart(2, '0')} ម៉ោង` : `${mins} នាទី`;
  };