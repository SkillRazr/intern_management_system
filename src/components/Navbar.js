import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
    
    const router = useRouter();

    function isActiveLink(href) {
        return router.pathname === href ? 'border-b-4 border-[#ff1493]' : '';
    };

  return (
    <nav>
      <ul className='flex items-center justify-evenly min-h-[50px]'>
        <li className={`${isActiveLink('/')} px-1`}>
            <p className={`px-1`}>
                <Link href="/" className='p-1.5'>Attendance</Link>
            </p>
        </li>
        <li className={`${isActiveLink('/activities')} px-1`}>
            <p className={`px-1`}>
                <Link href="/activities" className='p-1.5'>Activities</Link>
            </p>
        </li>
        <li className={`${isActiveLink('/feedback')} px-1`}>
            <p className={`px-1`}>
                <Link href="/feedback" className='p-1.5'>Feedback</Link>
            </p>
        </li>
      </ul>
    </nav>
  );
};

// ff1493