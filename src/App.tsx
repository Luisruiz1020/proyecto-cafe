import { useEffect, useState } from 'react';
import CoffeeCard, { type Coffee } from './components/CoffeeCard';

const CAFES_INICIALES: Coffee[] = [
  { id: 1, nombre: 'Espresso', precio: 8000, cantidad: 0, descripcion: 'Intenso, corto y de cuerpo denso.' },
  { id: 2, nombre: 'Capuchino', precio: 9000, cantidad: 0, descripcion: 'Espresso con leche vaporizada y espuma.' },
  { id: 3, nombre: 'Latte', precio: 11000, cantidad: 0, descripcion: 'Suave y cremoso, con mucha leche.' },
  { id: 4, nombre: 'Cold Brew', precio: 12000, cantidad: 0, descripcion: 'Extraído en frío.' },
];

export default function App() {
  const [cafes, setCafes] = useState<Coffee[]>(CAFES_INICIALES);
  const [bump, setBump] = useState(false);
  const [pagado, setPagado] = useState(false); // Estado para mostrar el ticket de pago

  const totalCafes = cafes.reduce((acc, cafe) => acc + cafe.cantidad, 0);
  const precioTotal = cafes.reduce((acc, cafe) => acc + cafe.cantidad * cafe.precio, 0);

  const handleCambiarCantidad = (id: number, delta: number) => {
    setCafes((prev) =>
      prev.map((cafe) => {
        if (cafe.id === id) {
          const nuevaCantidad = Math.max(0, cafe.cantidad + delta);
          return { ...cafe, cantidad: nuevaCantidad };
        }
        return cafe;
      }),
    );
  };

  const handleReiniciar = () => {
    setCafes(CAFES_INICIALES);
    setPagado(false);
  };

  useEffect(() => {
    if (totalCafes === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 180);
    return () => clearTimeout(t);
  }, [totalCafes]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-200 via-stone-300 to-orange-200 font-sans text-stone-900">
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-amber-400/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-orange-400/30 blur-3xl" />

      <main className="relative mx-auto flex max-w-4xl flex-col gap-8 px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        {/* Encabezado */}
        <header className="mx-auto text-center">
          <div className="inline-block rounded-2xl border border-white/80 bg-white/70 px-8 py-5 shadow-md shadow-amber-900/5 backdrop-blur-xl">
            <h1 className="font-display text-3xl font-bold tracking-wider text-stone-900 sm:text-4xl">
              CAFÉS ARTESANALES
            </h1>
            <p className="mt-1 text-sm font-medium text-stone-600">Toca un café para sumarlo al pedido.</p>
          </div>
        </header>

        {/* Resumen flotante (sticky) con botón de Pagar */}
        <section
          aria-live="polite"
          className="sticky top-4 z-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/70
                     bg-white/80 px-6 py-4 shadow-lg shadow-amber-900/10 backdrop-blur-xl"
        >
          <div>
            <p className="text-sm font-medium text-stone-600">
              Total: <span className="font-bold text-stone-900">{totalCafes}</span> cafés
            </p>
            <p className="text-xl font-extrabold text-amber-800">
              Total a pagar: ${precioTotal.toFixed(2)}
            </p>
            {totalCafes > 0 && !pagado && (
              <button
                type="button"
                onClick={handleReiniciar}
                className="mt-1 text-xs text-stone-500 underline-offset-2 transition-colors duration-200 hover:text-orange-600 hover:underline"
              >
                Reiniciar pedido
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`grid h-14 min-w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500
                          px-4 font-display text-2xl font-semibold tabular-nums text-white
                          shadow-md shadow-orange-500/30 transition-transform duration-150
                          ${bump ? 'scale-110' : 'scale-100'}`}
            >
              {totalCafes}
            </span>

            {/* Botón de Pagar (se habilita solo si hay cafés en el pedido y no se ha pagado aún) */}
            {totalCafes > 0 && !pagado && (
              <button
                type="button"
                onClick={() => setPagado(true)}
                className="rounded-2xl bg-stone-900 px-6 py-4 text-sm font-bold text-white shadow-md shadow-stone-900/20
                           transition-all duration-200 hover:bg-stone-800 active:scale-95"
              >
                Pagar ☕
              </button>
            )}
          </div>
        </section>

        {/* Cuadrícula de tarjetas de café */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {cafes.map((cafe) => (
            <CoffeeCard key={cafe.id} {...cafe} onCambiarCantidad={handleCambiarCantidad} />
          ))}
        </section>

        {/* Modal / Ticket de Compra Exitosa */}
        {pagado && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-white/80 bg-white p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
              {/* Icono de Check / Tick */}
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 text-3xl shadow-inner">
                ✓
              </div>

              <h2 className="font-display text-2xl font-bold text-stone-900">¡Pedido Cancelado / Pagado!</h2>
              <p className="mt-1 text-sm text-stone-500">Ticket de compra procesado con éxito.</p>

              {/* Detalle del ticket */}
              <div className="my-6 rounded-2xl bg-stone-50 p-4 text-left text-sm border border-stone-200/60">
                <p className="font-semibold text-stone-700 mb-2">Resumen:</p>
                <ul className="space-y-1 text-stone-600">
                  {cafes.filter(c => c.cantidad > 0).map(c => (
                    <li key={c.id} className="flex justify-between">
                      <span>{c.cantidad}x {c.nombre}</span>
                      <span className="font-medium">${(c.cantidad * c.precio).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 border-t border-stone-200 pt-2 flex justify-between font-bold text-stone-900">
                  <span>Total pagado:</span>
                  <span className="text-amber-700">${precioTotal.toFixed(2)}</span>
                </div>
              </div>

              <p className="font-medium text-amber-800 mb-6">¡Muchas gracias por su compra en Cafés Artesanales!</p>

              <button
                type="button"
                onClick={handleReiniciar}
                className="w-full rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 py-3.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:from-amber-600 hover:to-orange-600 active:scale-95"
              >
                Hacer otro pedido
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}