//Login.js
export const BACKGROUND_IMG =
  "https://assets.nflxext.com/ffe/siteui/vlv3/47c2bc92-5a2a-4f33-8f91-4314e9e62ef1/web/DK-en-20240916-TRIFECTA-perspective_b780638d-0489-4bec-ae23-062f93498647_large.jpg";

//Header.js
export const LOGO_URL =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";
export const USER_ICON =
  "https://occ-0-422-38.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229";

//Browse.js
export const MOVIE_CONFIG = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWVhNDQ1ZDUyMWUwZWE2NGZlNzY2NzQzZmUwOGQ2NyIsIm5iZiI6MTcyNzExNTM5Mi43MDY1MzksInN1YiI6IjY2ZjFhZjI5ZGUyZDUyZGZiZDhkNDIzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Do_UvFCenghM9Mu95I0vDS_Z6zUCD3-ZGLfU-Hg-mEE",
  },
};

export const MOVIE_LIST_URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

export const movieVideoUrl = (movieVideoId) =>
  `https://api.themoviedb.org/3/movie/${movieVideoId}/videos?language=en-US`;
