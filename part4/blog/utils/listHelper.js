const listHelper = (arrayBlogs) => 1;

const totalLikes = (arrayBlogs) =>
  arrayBlogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (arrayBlogs) => {
  let blogFavorite = { title: 'empty', author: 'empty', likes: 0 };

  arrayBlogs.forEach((blog) => {
    if (blog.likes >= blogFavorite.likes) {
      blogFavorite = blog;
    }
  });

  return arrayBlogs.length === 0
    ? null
    : {
        title: blogFavorite.title,
        author: blogFavorite.author,
        likes: blogFavorite.likes,
      };
};

const mostBlogs = (arrayBlogs) => {
  const authors = {};

  arrayBlogs.forEach((blog) => {
    const isAuthorRegistered = Boolean(authors[blog.author]);
    if (!isAuthorRegistered) {
      authors[blog.author] = { author: blog.author, blogs: 1 };
      return;
    }

    authors[blog.author] = {
      ...authors[blog.author],
      blogs: authors[blog.author].blogs + 1,
    };
  });

  let authorWithMostBlogs = { blogs: 0 };
  Object.values(authors).forEach((author) => {
    if (author.blogs >= authorWithMostBlogs.blogs) {
      authorWithMostBlogs = author;
    }
  });

  return arrayBlogs.length === 0 ? null : { ...authorWithMostBlogs };
};

const mostLikes = (arrayBlogs) => {
  const authors = {};

  arrayBlogs.forEach((blog) => {
    const isAuthorRegistered = Boolean(authors[blog.author]);
    if (!isAuthorRegistered) {
      authors[blog.author] = { author: blog.author, likes: blog.likes };
      return;
    }

    authors[blog.author] = {
      ...authors[blog.author],
      likes: authors[blog.author].likes + blog.likes,
    };
  });

  let authorWithMostLikes = { likes: 0 };
  Object.values(authors).forEach((author) => {
    if (author.likes >= authorWithMostLikes.likes) {
      authorWithMostLikes = author;
    }
  });

  return arrayBlogs.length === 0 ? null : { ...authorWithMostLikes };
};

export { listHelper, totalLikes, favoriteBlog, mostBlogs, mostLikes };
