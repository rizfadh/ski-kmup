import db from "./db";

export const getPosts = async (isAccepted: boolean, take?: number) => {
  const posts = await db.post.findMany({
    where: { isAccepted },
    orderBy: { createdAt: "desc" },
    take: take,
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
      imageUrl: true,
      title: true,
      isAccepted: true,
    },
  });

  return posts.map((post) => {
    return {
      id: post.id,
      createdAt: post.createdAt,
      createdBy: post.user.name,
      imageUrl: post.imageUrl,
      title: post.title,
      isAccepted: post.isAccepted,
    };
  });
};

export const getPostById = async (id: string, isAccepted?: boolean) => {
  return await db.post.findUnique({
    where: { id, isAccepted },
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
      imageUrl: true,
      title: true,
      content: true,
    },
  });
};

export const getPostLikesById = async (id: string) => {
  const postLike = await db.postLike.groupBy({
    by: ["like"],
    where: { postId: id },
    _count: {
      like: true,
    },
  });

  const likes = postLike.find((l) => l.like === true)?._count.like || 0;
  const dislikes = postLike.find((l) => l.like === false)?._count.like || 0;

  return { likes, dislikes };
};

export const isLikedByUser = async (userId: string, postId: string) => {
  const liked = await db.postLike.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  return liked?.like;
};
