export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar recurso..."
        className="w-full p-2 border border-gray-300 rounded"
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
}
