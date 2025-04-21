export default function WaitingList({ waiting }: { waiting: string[] }) {
  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold mb-2">Lista de espera</h3>
      <ul className="space-y-2">
        {waiting.map((item, index) => (
          <li
            key={index}
            className="p-2 bg-primary text-white rounded">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
