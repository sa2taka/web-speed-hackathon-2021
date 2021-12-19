export namespace Models {
  export interface User {
    createdAt: string;
    description: string;
    id: string;
    name: string;
    password: string;
    posts: Array<Models.Post>;
    profileImage: Models.ProfileImage;
    username: string;
  }

  export interface ProfileImage {
    alt: string;
    id: string;
  }

  export interface Post {
    createdAt: string;
    id: string;
    images: Array<Models.Image>;
    movie: Models.Movie;
    sound: Models.Sound;
    text: string;
    user: Models.User;
  }

  export interface Image {
    alt: string;
    id: string;
  }

  export interface Sound {
    artist: string;
    id: string;
    title: string;
  }

  export interface Movie {
    id: string;
  }

  export interface Comment {
    createdAt: string;
    id: string;
    post: Models.Post;
    text: string;
    user: Models.User;
  }
}
