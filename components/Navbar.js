import { useRouter } from 'next/router';
import navStyles from '../styles/Nav.module.css'
const Navbar = () => {
    const router = useRouter();
    return (
    <div className={navStyles.nav}>          
    
            <div onClick={() => router.push('/feed/1')}>The Daily News</div>

        </div>

    )
}
export default Navbar