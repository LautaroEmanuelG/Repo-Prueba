export default function Calendar({ reservations }: { reservations: any[] }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Calendario</h2>
      <div className="grid grid-cols-2 gap-4">
        {reservations.map((reservation, index) => (
          <div
            key={index}
            className="p-4 bg-primary text-white rounded text-center">
            {reservation.time} - {reservation.resource}
          </div>
        ))}
      </div>
    </div>
  );
}
