import React from "react";

const SkeletonCard = () => (
  <div className="card">
    <div className="card__skeleton card__description" />
    <div className="card__skeleton card__title" />
  </div>
);

const SkeletonGrid = () => {
  const skeletonCards = new Array(10).fill(0);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
        gap: "16px",
        justifyItems: "center",
        padding: "1rem",
      }}>
      {skeletonCards.map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
};

export default SkeletonGrid; // import and render <SkeletonGrid /> wherever needed
