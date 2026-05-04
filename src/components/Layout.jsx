import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import FooterDisclaimer from './FooterDisclaimer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      <main className="flex-1 w-full mx-auto pb-16 md:pb-0">
        <Outlet />
      </main>
      <FooterDisclaimer />
      <BottomNav />
    </div>
  );
};

export default Layout;
