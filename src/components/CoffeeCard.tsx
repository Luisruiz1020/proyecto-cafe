// src/components/CoffeeCard.tsx
export interface Coffee {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  descripcion: string;
}

export interface CoffeeCardProps extends Coffee {
  onCambiarCantidad: (id: number, delta: number) => void;
}

export default function CoffeeCard({
  id,
  nombre,
  precio,
  cantidad,
  descripcion,
  onCambiarCantidad,
}: CoffeeCardProps) {
  return (
    <article
      className="flex flex-col justify-between gap-6 rounded-3xl border border-white/60
                 bg-white/50 p-6 shadow-sm backdrop-blur-xl
                 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-stone-800">
            {nombre}
          </h2>
          <p className="mt-1 text-sm leading-snug text-stone-500">{descripcion}</p>
          <span className="mt-2 inline-block text-sm font-semibold text-amber-700">
            ${precio.toFixed(2)} c/u
          </span>
        </div>

        {/* Contador de pedidos de este café */}
        <span
          aria-label={`${cantidad} pedidos de ${nombre}`}
          className={`grid h-11 min-w-11 place-items-center rounded-full px-3 text-lg font-semibold
                      tabular-nums transition-all duration-200
                      ${
                        cantidad > 0
                          ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                          : 'bg-stone-200/70 text-stone-400'
                      }`}
        >
          {cantidad}
        </span>
      </header>

      {/* Controles de cantidad (Quitar / Agregar) */}
      <div className="flex items-center gap-3">
        {cantidad > 0 && (
          <button
            type="button"
            onClick={() => onCambiarCantidad(id, -1)}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-200
                       bg-white/80 text-lg font-bold text-amber-700 shadow-sm
                       transition-all duration-200 hover:bg-amber-50 active:scale-95
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label={`Quitar un ${nombre}`}
          >
            -
          </button>
        )}

        <button
          type="button"
          onClick={() => onCambiarCantidad(id, 1)}
          className="flex-1 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 px-5 py-3
                     text-sm font-semibold text-white shadow-sm shadow-orange-500/20
                     transition-all duration-200
                     hover:from-amber-600 hover:to-orange-600 hover:shadow-md hover:shadow-orange-500/30
                     active:scale-95 active:shadow-none
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                     focus-visible:ring-offset-2 focus-visible:ring-offset-stone-100"
        >
          {cantidad === 0 ? `Pedir ${nombre.toLowerCase()}` : `Pedir otro (${cantidad})`}
        </button>
      </div>
    </article>
  );
}