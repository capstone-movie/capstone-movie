import Link from 'next/link';

type Props = {
    text: string;
}

export function ListHeader(prop: Props) {
    return (
        <div className={"flex items-center"}>
            <h2 className={"text-white text-2xl font-bold m-3"}>
                {prop.text}
            </h2>
            <Link href={'/category'}>
                <button className={"bg-white text-black text-2xl px-2 py-0 rounded-md h-fit font-bold"}>
                    More
                </button>
            </Link>
        </div>
    );
}