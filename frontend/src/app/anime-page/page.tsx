'use client'
import {ListView} from "@/app/anime-page/list-view";

export default function () {

    let strs: string[] = ['Top', 'Recent', 'Recommendation']
    let amts: string[] = ['10', '20', '30']

    return (
        <>
            <h1 className={'text-white'}>Anime Page</h1>
            <section className={'h-fit'}>
                <div className={'bg-red-500 h-fit flex'}>
                    {
                        strs.map((str, index) => (
                            <button key={index}
                                    className={'bg-green-300 px-3'}>
                                <p className={'text-2xl'}>
                                    {str}
                                </p>
                            </button>
                        ))
                    }
                </div>
                <table className={'bg-blue-500 h-10 text-left w-full text-nowrap'}>
                    <thead>
                        <tr>
                            <th className={'border border-gray-300 px-2 '} >Rank</th>
                            <th className={'border border-gray-300 px-2 w-full'}>Title</th>
                            <th className={'border border-gray-300 px-2 text-center'}>Score</th>
                            <th className={'border border-gray-300 px-2 text-center'}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            amts.map((amt, index) => (
                                <tr key={index}>
                                    <td className={'border border-gray-300 text-center'}>{amt}</td>
                                    <td className={'border border-gray-300 px-2'}>data 2</td>
                                    <td className={'border border-gray-300'}>
                                        <p className={'text-center'}>
                                            3.42
                                        </p>
                                    </td>
                                    <td className={'border border-gray-300'}>
                                        <button className={'bg-red-500 w-10 h-5 px-8 py-4 m-2 flex justify-center items-center rounded'}>
                                            <p className={'text-white'}>
                                                Add
                                            </p>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className={'bg-yellow-500 h-10'}>
                </div>
            </section>
            {/*            <ListView url={'https://api.jikan.moe/v4/top/anime?limit=10'}
                      title={'Popular Anime'}/>*/}
        </>
    )
}