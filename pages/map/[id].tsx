import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import type { Markers, Map } from 'types'

import Head from 'next/head'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import MapForm from 'components/MapForm/MapForm'

const MapComponent = dynamic(
  () => import('../../components/MapComponent/MapComponent'),
  { ssr: false }
)

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type Props = {
  map: Map
}

const Map: NextPage<Props> = ({ map }) => {
  const { data, error } = useSWR<Markers, Error>(
    `/api/markers/${map.uuid}`,
    fetcher
  )
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Hemnet Assignment - {map.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full max-w-5xl flex-auto flex-col p-4 text-center">
        <h1 className="mb-4 text-4xl font-bold">Hemnet assignment</h1>
        <div className="mb-10">
          <MapForm />
        </div>
        <p className="mb-4">
          {map.title}
          {map.description && <> - {map.description}</>}
        </p>

        {data && (
          <div className="mb-10 flex flex-auto shadow-2xl">
            <MapComponent markers={data} />
          </div>
        )}
        {error && (
          <div className="border-2 border-red-600 p-6">failed to load map</div>
        )}
      </main>
    </div>
  )
}

export default Map

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/maps/${params?.id}`)
  const map: Map = await res.json()

  if (res.status === 404) {
    return {
      notFound: true,
    }
  }

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
