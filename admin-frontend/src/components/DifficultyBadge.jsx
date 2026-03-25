function DifficultyBadge({ difficulty }) {
  return (
    <span className={`difficulty-badge ${difficulty}`}>
      {difficulty}
    </span>
  );
}

export default DifficultyBadge;
