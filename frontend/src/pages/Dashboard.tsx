import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { usuario } = useAuth();

  return (
    <Layout>
      <h2>Hola, {usuario?.email}</h2>
      <p>Dashboard en construcción</p>
    </Layout>
  );
}

export default Dashboard;