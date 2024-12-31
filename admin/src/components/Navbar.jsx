import { assets } from '../assets/admin_assets/assets'
const Navbar = () => {
    return (
        <div className='navbar flex justify-between items-center py-2 px-[4%]'>
            <img className=' max-w-28 md:max-w-fit' src={assets.logo} alt="Tomato-logo" />
            <img className='w-10 md:min-w-fit' src={assets.profile_image} alt="profile-image" />
        </div>

    )
}

export default Navbar