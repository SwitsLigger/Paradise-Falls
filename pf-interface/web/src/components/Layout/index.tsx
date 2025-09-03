import { Outlet } from 'react-router'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect } from 'react'
import { fetchNui } from '@/utils/fetchNui'

export default function Layout() {
    const [autoAnimate] = useAutoAnimate()
    useEffect(() => {
        fetchNui('set_focus', true)
    }, [])
    return (
        <div ref={autoAnimate} className='flex justify-between w-screen h-screen p-4 gap-4 bg-radial-gradient'>
            <Outlet />
        </div>
    )
}
