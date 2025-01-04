import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation/Navigation'

export default function Layout() {
    return (
        <div className='main-2'>
            <nav className='main-nav'>
                <Navigation />
            </nav>

            <main>
                <Header />
                <Outlet />
            </main>
        </div>
    )
}
