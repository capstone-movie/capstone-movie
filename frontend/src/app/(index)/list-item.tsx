import Link from "next/link";

type Props = {
    title: string
    url: string
    mal_id: number
}

export function ListItem(props: Props) {
    return (
        <>
            <img
                src={props.url}
                alt={props.title}
                className={'w-full h-full object-cover'}
            />
            <Link href={{ pathname: "/anime", query: { id: props.mal_id } }}>
                <div className={'w-full h-full -translate-y-full flex flex-col opacity-0 hover:opacity-100 duration-300'}>
                    <div className={'bg-black/80 w-full h-fit mt-auto'}>
                        <h3 className={"text-xl font-bold text-white text-center"}>
                            {props.title}
                        </h3>
                    </div>
                </div>
            </Link>
        </>
    )
}