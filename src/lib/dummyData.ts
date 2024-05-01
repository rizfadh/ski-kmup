export const generateCarouselDummy = () => {
  const DummyItem = {
    img: "https://images.unsplash.com/photo-1712238645781-c4d9dbbe9b88?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Lorem Ipsum Dolor Sit Amet Amet Amet Amet Amet Amet",
    description:
      "Bersatu Dalam Islam Bersatu Dalam Islam Bersatu Dalam Islam Bersatu Dalam Islam",
  };

  return Array.from({ length: 3 }).map((_, index) => {
    return {
      ...DummyItem,
      title: `${DummyItem.title} ${index + 1}`,
    };
  });
};

export const generatePostDummy = () => {
  const img = [
    "https://images.unsplash.com/photo-1712743072516-13b19bc38840?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1706464377765-6cea01288348?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1712759133177-0b60a8abd756?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1711509423975-69f05caf460d?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return img.map((img, index) => {
    return {
      id: index.toString(),
      imageUrl: img,
      title: `Bayangin liburan disini. ${Array.from({
        length: index,
      })
        .map(() => "Oke. Oke. Oke. Oke. Oke")
        .join(" ")}`,
      content:
        "Bersatu Dalam Islam Bersatu Dalam Islam Bersatu Dalam Islam Bersatu Dalam Islam",
      createdAt: new Date(),
      createdBy: `John Doe ${index + 1}`,
    };
  });
};
