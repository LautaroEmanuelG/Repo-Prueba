'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ResourceList from '../components/ResourceList';
import Calendar from '../components/Calendar';
import MiniCalendar from '../components/MiniCalendar';
import WaitingList from '../components/WaitingList';
import { getRelaciones } from '../services/bitrix24';
// import { getRelaciones } from '../services/api';
import { getRelacionesCrest } from '@/services/crest';

export default function Home() {
  const [resources] = useState(['Médico 1', 'Médico 2']);
  const [reservations] = useState([
    { time: '8:00 - 9:00', resource: 'Médico 1' },
    { time: '9:00 - 10:00', resource: 'Médico 2' },
  ]);
  const [waiting] = useState(['Paciente 1', 'Paciente 2']);
  const [practices, setPractices] = useState<any[]>([]);

  useEffect(() => {
    // Usar getRelacionesCrest con el método crm.item.list y entityTypeId 1044
    getRelaciones(1044)
      .then(data => {
        console.log('Datos recibidos:', data);
        setPractices(data);
      })
      .catch(error => {
        console.error('Error al cargar prácticas:', error);
        setPractices([]);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-1">
          <SearchBar onSearch={query => console.log(query)} />
          <ResourceList resources={resources} />
        </div>
        <div className="col-span-2">
          <Calendar reservations={reservations} />
          <section className="mt-8">
            <h2 className="text-lg font-bold mb-4">Prácticas</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">ID</th>
                    <th className="border px-2 py-1">Nombre</th>
                    <th className="border px-2 py-1">Tipo</th>
                    <th className="border px-2 py-1">Precio</th>
                    <th className="border px-2 py-1">Indicaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {practices.map(practice => (
                    <tr key={practice.ID}>
                      <td className="border px-2 py-1">{practice.ID}</td>
                      <td className="border px-2 py-1">{practice.Nombre}</td>
                      <td className="border px-2 py-1">{practice.Tipo}</td>
                      <td className="border px-2 py-1">{practice.Precio}</td>
                      <td className="border px-2 py-1">
                        {practice.Indicaciones}
                      </td>
                    </tr>
                  ))}
                  {practices.length === 0 && (
                    <tr>
                      <td
                        className="border px-2 py-1 text-center"
                        colSpan={5}>
                        No hay datos para mostrar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <div className="col-span-1 space-y-4">
          <MiniCalendar />
          <WaitingList waiting={waiting} />
        </div>
      </div>
    </div>
  );
}
