

import { Avatar } from '@/components/ui/avatar'
import defaultPfp from '../../public/images/defaultpfp.jpg'
import { AvatarImage } from '@radix-ui/react-avatar'

export default function Header() {
    return (
        <>
                <Avatar className='w-10 h-10'>
                    <AvatarImage 
                        src='/images/defaultpfp.jpg'
                        alt='profile pic'
                    />
                </Avatar>
        </>
    )
}