const cantidades = [10, 20, 40, 50];

export default function Paginacion({ pagina, limite, total, cambiar }) {
  const paginas = Math.max(1, Math.ceil(total / limite));

  return (
    <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mt-3">
      <div className="d-flex align-items-center gap-2">
        <span className="small">Mostrar</span>
        <select className="form-select form-select-sm" style={{ width: 80 }}
          value={limite} onChange={e => cambiar(1, Number(e.target.value))}>
          {cantidades.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <span className="text-secondary small">de {total} registros</span>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-sm btn-outline-secondary" disabled={pagina === 1}
          onClick={() => cambiar(pagina - 1, limite)}>Anterior</button>
        <span className="small">Página {pagina} de {paginas}</span>
        <button className="btn btn-sm btn-outline-secondary" disabled={pagina >= paginas}
          onClick={() => cambiar(pagina + 1, limite)}>Siguiente</button>
      </div>
    </div>
  );
}
