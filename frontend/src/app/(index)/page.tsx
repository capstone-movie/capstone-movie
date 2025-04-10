'use client'
import {HorizontalList} from "@/app/(index)/horizontal-list";
import {Spotlight} from "@/app/(index)/spotlight";

/**
 * This is the default exported functional component for the page.
 * It renders a Spotlight component and a series of HorizontalList components
 * to display various categories of anime content.
 */
export default function () {
    return (
        <>
            {/* Spotlight component to highlight top anime */}
            <Spotlight url={'anime/top'}/>

            <div className={''}>
                {/* HorizontalList for popular anime */}
                <HorizontalList
                    url={'anime/top'}
                    title={'Popular Anime'}
                    queryType={'popular'}
                />

                {/* HorizontalList for recent anime */}
                <HorizontalList
                    url={'anime/recent'}
                    title={'Recent Anime'}
                    queryType={'recent'}
                />

                {/* HorizontalList for recommended anime based on the Action genre */}
                <HorizontalList
                    url={'genres/Action'}
                    title={'Recommended Anime'}
                    queryType={'recommended'}
                />

                {/* HorizontalList for recommended anime based on the Action genre */}
                <HorizontalList
                    url={'genres/Adventure'}
                    title={'Adventure Anime'}
                    queryType={'Adventure'}
                />

                {/* HorizontalList for recommended anime based on the Action genre */}
                <HorizontalList
                    url={'genres/Sci-Fi'}
                    title={'Sci-Fi Anime'}
                    queryType={'Sci-Fi'}
                />

                {/* HorizontalList for recommended anime based on the Action genre */}
                <HorizontalList
                    url={'genres/Horror'}
                    title={'Horror Anime'}
                    queryType={'Horror'}
                />

                {/* HorizontalList for recommended anime based on the Action genre */}
                <HorizontalList
                    url={'genres/Comedy'}
                    title={'Comedy Anime'}
                    queryType={'Comedy'}
                />

                {/* HorizontalList for recommended anime based on the Action genre */}
                <HorizontalList
                    url={'genres/Drama'}
                    title={'Drama Anime'}
                    queryType={'Drama'}
                />


                {/* HorizontalList for recommended anime based on the Action genre */}
                <HorizontalList
                    url={'genres/Sports'}
                    title={'Sport Anime'}
                    queryType={'Sports'}
                />
            </div>
        </>
    );
}