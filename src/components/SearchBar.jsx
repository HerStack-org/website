export default function SearchBar({ searchTerm, onSearchChange, selectedDifficulty, onDifficultyChange }) {
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced']

  return (
    <div style={{ marginBottom: '24px' }}>
      <input
        type="text"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          marginBottom: '12px',
          boxSizing: 'border-box',
        }}
      />
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {difficulties.map((level) => (
          <button
            key={level}
            onClick={() => onDifficultyChange(level)}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: '1px solid #ccc',
              background: selectedDifficulty === level ? '#6c47ff' : '#fff',
              color: selectedDifficulty === level ? '#fff' : '#333',
              cursor: 'pointer',
              fontWeight: selectedDifficulty === level ? 'bold' : 'normal',
            }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}