interface BarraAccionesProps {
  onCancelar: () => void;
  textoCancelar?: string;
  textoConfirmar?: string;
  tipoConfirmar?: 'submit' | 'button';
  onConfirmar?: () => void;
}

function BarraAcciones({
  onCancelar,
  textoCancelar = 'Cancelar',
  textoConfirmar = 'Crear',
  tipoConfirmar = 'submit',
  onConfirmar,
}: BarraAccionesProps) {
  return (
    <div
      className="d-flex justify-content-between align-items-center border-top px-4"
      style={{
        position: 'fixed',
        bottom: 0,
        left: '8%',
        right: 0,
        height: '6%',
        backgroundColor: 'white',
        zIndex: 100,
      }}
    >
      <span
        style={{ cursor: 'pointer' }}
        onClick={onCancelar}
      >
        ← {textoCancelar}
      </span>
      <button
        type={tipoConfirmar}
        className="btn btn-dark rounded-0 px-4"
        onClick={onConfirmar}
      >
        {textoConfirmar}
      </button>
    </div>
  );
}

export default BarraAcciones;