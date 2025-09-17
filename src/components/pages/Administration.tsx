import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import FreeSpace from "../layouts/FreeSpace";
import AdminPanel from "../sheets/administration/AdminPanel";
import { AdminLoggedContextProvider } from "../utils/context/AdminLoggedProvider";

function Administration() {

    return (<div className="app-body">
            <Header />
            <main>
                <article className='portfolio'>
                    <AdminLoggedContextProvider>
                        <AdminPanel />
                    </AdminLoggedContextProvider>
                </article>
                <FreeSpace />
            </main>
            <Footer />
        </div>)
}

export default Administration;