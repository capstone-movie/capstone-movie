import Link from 'next/link';

type Props = {
    text: string;
}

export function ListHeader(prop: Props) {
    return (
        <div className={"flex items-center justify-between md:justify-start px-4 mt-4 mb-4"}>
            <h2 className={"text-white text-2xl font-bold"}>
                {prop.text}
            </h2>
            <Link href={'/category'}>
                <button className={"bg-white text-black px-2 py-0 rounded-md h-fit font-semibold ml-2 mt-1.5"}>
                    More
                </button>
            </Link>
        </div>
    );
}