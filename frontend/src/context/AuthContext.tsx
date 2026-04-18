import { createContext, useContext, useState, ReactNode } from 'react';

interface Usuario {
  id_usuario: number;
  email: string;
  rol: string;
  nombre: string;
}

interface AuthContextType {
  token: string | null;
  usuario: Usuario | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const saved = localStorage.getItem('usuario');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (nuevoToken: string) => {
    const payload = JSON.parse(atob(nuevoToken.split('.')[1]));
    const user: Usuario = {
      id_usuario: payload.id_usuario,
      email: payload.email,
      rol: payload.rol,
      nombre: payload.nombre,
    };

    setToken(nuevoToken);
    setUsuario(user);
    localStorage.setItem('token', nuevoToken);
    localStorage.setItem('usuario', JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}