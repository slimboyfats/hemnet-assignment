import type { NextPage } from 'next'
import Head from 'next/head'
import MapForm from 'components/MapForm/MapForm'
const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Hemnet Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full max-w-5xl flex-auto flex-col p-4 text-center">
        <h1 className="mb-4 text-4xl font-bold">Hemnet assignment</h1>
        <div className="mb-10">
          <MapForm />
        </div>
      </main>
    </div>
  )
}

export default Home
