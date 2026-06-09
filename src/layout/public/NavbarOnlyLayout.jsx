import { Outlet } from 'react-router-dom';
import NavbarLayout from '../../components/template/public/NavbarLayout';

const NavbarOnlyLayout = () => {
    return (
        <>
            <header className="sticky top-0 z-50">
                <NavbarLayout />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default NavbarOnlyLayout;
