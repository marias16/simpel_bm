import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

interface BotonExito {
  texto: string;
  ruta: string;
  estilo?: 'primario' | 'secundario';
}

interface PaginaExitoProps {
  titulo: string;
  mensaje: string;
  botones: BotonExito[];
}

function PaginaExito({ titulo, mensaje, botones }: PaginaExitoProps) {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <div className="text-center" style={{ maxWidth: '400px' }}>
          <h2 className="fw-bold mb-3">{titulo}</h2>
          <p className="text-muted mb-4">{mensaje}</p>
          {botones.map((btn, i) => (
            <div key={i} className="mb-2">
              <button
                className={`btn ${btn.estilo === 'secundario' ? 'btn-outline-dark' : 'btn-dark'} rounded-0 w-100`}
                onClick={() => navigate(btn.ruta)}
              >
                {btn.texto}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default PaginaExito;