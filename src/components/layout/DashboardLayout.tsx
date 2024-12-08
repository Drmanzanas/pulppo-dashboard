const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="bg-white shadow">
          <div className="container mx-auto px-6 py-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-6 py-4">{children}</main>
      </div>
    );
  };
  
  export default DashboardLayout;