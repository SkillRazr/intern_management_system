import Link from "next/link";
import { useRouter } from "next/router";


export default function Finished() {

    const activities = [
        {
            "id": 1,
            "activity": "the main page div style",
            "dueDate": "may 2 2023",
            "assignedTo": "ramesh",
            "internId": "ramesh@e.com",
            "finishedDate": "may 18 2023",
    },
        {
            "id": 2,
            "activity": "the user page dashboard",
            "dueDate": "apr 16 2023",
            "assignedTo": "suresh",
            "internId": "ramesh@e.com",
            "finishedDate": "",
    },
        {
            "id": 2,
            "activity": "the user page dashboard",
            "dueDate": "may 18 2023",
            "assignedTo": "suresh",
            "internId": "ramesh@e.com",
            "finishedDate": "",
    },
    ]

    const router = useRouter();
    function isActiveLink(href) {
        return router.pathname === href ? 'border-b-4 border-[#ff1493]' : '';
    };

    return(
        <div>
            <nav className="min-h-[50px]">
                <ul className="flex justify-evenly items-center">
                    <li className={`${isActiveLink('/activities/assigned')} px-1`}>
                        <p className={`px-1`}>
                            <Link href="/activities/assigned" className='p-1.5'>Assigned</Link>
                        </p>
                    </li>
                    <li className={`${isActiveLink('/activities/finished')} px-1`}>
                        <p className={`px-1`}>
                            <Link href="/activities/finished" className='p-1.5'>Finished</Link>
                        </p>
                    </li>
                </ul>
            </nav>
            <div className='flex flex-col items-center bg-black h-screen'>
                {
                    activities.map((activity) => (
                        activity.finishedDate &&
                        <div key={activity.id} className='w-[98%] border border-black rounded p-1.5 mt-1 mx-1 bg-white'>
                            <div className="text-right">
                                <p>{activity.assignedTo}</p>
                            </div>
                            <p>{activity.activity}</p>
                            <div className="flex justify-between items-center mt-2">
                                <p className="px-1 border border-green-500 bg-green-600/[.2] text-green-700">{activity.finishedDate}</p>
                                <p className="w-6 text-center cursor-pointer border border-black rounded-full">{activity.assignedTo.charAt(0).toUpperCase()}</p>
                            </div>
                        </div>        
                    ))
                }
                
            </div>
        </div>
    )
}


