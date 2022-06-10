import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import type { Markers, Map } from 'types'
import { useState } from 'react'
import { getMap } from 'pages/api/maps/[id]'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import MapForm from 'components/MapForm/MapForm'
import MarkerList from 'components/MarkerList/MarkerList'
import Loader from 'components/Loader/Loader'

const MapComponent = dynamic(
  () => import('../../components/MapComponent/MapComponent'),
  { ssr: false }
)

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type Props = {
  map: Map
}

const Map: NextPage<Props> = ({ map }) => {
  const [selectedMarker, setSelectedMarker] = useState<number | undefined>()
  const { data, isValidating, error } = useSWR<Markers, Error>(
    `/api/markers/${map.uuid}`,
    fetcher
  )
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Hemnet Assignment - {map.title}</title>
        <meta name="description" content={map.description}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full max-w-5xl flex-auto flex-col p-4 text-center">
        <h1 className="mb-4 text-4xl font-bold">Hemnet assignment</h1>
        <div className="mb-4 md:mb-8">
          <MapForm />
        </div>
        <div className="mb-4">
          <h2 className="my-2 text-xl font-bold">{map.title}</h2>
          <p className="mb-4">{map.description && <> {map.description}</>}</p>
        </div>

        <div className="md-4 flex max-h-96 flex-auto flex-col justify-center border border-gray-300 bg-gray-100 drop-shadow-2xl md:mb-8 md:flex-row">
          {!data && isValidating && <Loader />}
          {data && (
            <>
              <MarkerList
                markers={data}
                setSelectedMarker={setSelectedMarker}
                selectedMarker={selectedMarker}
              />
              <MapComponent markers={data} selectedMarker={selectedMarker} />
            </>
          )}
        </div>

        {error && (
          <div className="border-2 border-red-600 p-6">failed to load map</div>
        )}
      </main>
    </div>
  )
}

export default Map

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await getMap(params?.id as string)

  if (res.status === 404) {
    return {
      notFound: true,
    }
  }

  const map: Map = await res.json()

  return {
    props: {
      map,
    },
    revalidate: 20,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: 'blocking', paths: [] }
}
