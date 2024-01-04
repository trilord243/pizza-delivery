
import { useSelector } from 'react-redux'
export default function UserName() {

    const userName = useSelector((state) => state.user.userName)

    if (!userName) return null
    return (
        <div className="hidden md:block text-sm font-semibold" >
            {userName}
        </div>
    )
}
