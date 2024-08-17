import Navbar from "../../components/Navbar";
import { useAuthStore } from "../../store/authUser";

const HomeScreen = () => {
    const { logout } = useAuthStore();
    return (
        <div className='h-screen text-white relative'>
            <Navbar />
            <div className='absolute top-0 left-0 w-full h-full bg-black/100 flex items-center justify-center -z-10 shimmer' />
        </div>
    );
};

export default HomeScreen;
