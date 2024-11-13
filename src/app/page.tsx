import { Suspense } from 'react'
import { getCookie } from '@/lib/cookies'
import Authenticate from './Authenticate'
import Header from './Header'
import Loading from './Loading'
import UserData from './UserData'

const MOCK_TOKEN = process.env.ENABLE_MOCKS === 'true' && 'MOCK_TOKEN'

const Home = async () => {
	const error = await getCookie('error')
	const accessToken = (await getCookie('accessToken')) || MOCK_TOKEN

	if (!accessToken) {
		return (
			<main className="flex h-screen w-screen flex-col items-center justify-center">
				{error && <p>{error}</p>}
				<Authenticate />
			</main>
		)
	}

	return (
		<main className="flex flex-col items-center gap-2 p-6">
			<Header />
			<Suspense fallback={<Loading />}>
				<UserData accessToken={accessToken} />
			</Suspense>
		</main>
	)
}

export default Home
