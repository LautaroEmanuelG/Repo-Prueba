export default function ResourceList({ resources }: { resources: string[] }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Recursos</h2>
      <ul className="space-y-2">
        {resources.map((resource, index) => (
          <li
            key={index}
            className="p-2 bg-primary text-white rounded">
            {resource}
          </li>
        ))}
      </ul>
    </div>
  );
}
