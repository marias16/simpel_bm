import Sidebar from './Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex">
      <div style={{ width: '10%', flexShrink: 0 }} />
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;