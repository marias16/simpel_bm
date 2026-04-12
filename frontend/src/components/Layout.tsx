import Sidebar from './Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
}

export default Layout;