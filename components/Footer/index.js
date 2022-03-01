import CustomLink from 'components/CustomLink';
import { BsTwitter } from 'react-icons/bs'

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex flex-col gap-2">
            <div className='flex justify-center'>
                <CustomLink href="https://twitter.com/intent/user?screen_name=albertocruzdev">
                    <BsTwitter color='white' />
                </CustomLink>
            </div>
            <span className="text-white">©{currentYear} Alberto Cruz Luis | Made with NextJS</span>
        </div>
    )
}