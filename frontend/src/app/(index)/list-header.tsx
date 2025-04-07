import Link from 'next/link';

type Props = {
    text: string;
    queryType: string;
}

export function ListHeader({text, queryType}: Props) {

    return (
        <div className={"flex items-center justify-between md:justify-start px-4 mt-4 mb-4"}>
            <h2 className={"text-white text-2xl font-bold"}>
                {text}
            </h2>
            <Link href={{pathname: "/category", query: {type: queryType}}}>
                <button className="bg-gradient-to-l from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-semibold ml-2 mt-1.5 hover:scale-105">
                    More
                </button>
            </Link>
        </div>
    );
}