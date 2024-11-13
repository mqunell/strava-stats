import { Suspense } from 'react'
import { deleteCookie, getCookie } from '@/lib/cookies'
import Authenticate from './Authenticate'
import Header from './Header'
import Loading from './Loading'
import Logout from './Logout'
import UserData from './UserData'

const MOCK_TOKEN = process.env.ENABLE_MOCKS === 'true' && 'MOCK_TOKEN'

const Home = async () => {
	const error = await getCookie('error')
	const accessToken = (await getCookie('accessToken')) || MOCK_TOKEN

	if (!accessToken) {
		return (
			<section className="flex h-screen w-screen flex-col items-center justify-center">
				{error && <p>{error}</p>}
				<Authenticate />
			</section>
		)
	}

	return (
		<section className="flex flex-col items-center p-6">
			<Header />
			<Suspense fallback={<Loading />}>
				<UserData accessToken={accessToken} />
			</Suspense>
			<Logout
				action={async () => {
					'use server'
					await deleteCookie('accessToken')
					await deleteCookie('firstName')
					await deleteCookie('profilePicture')
				}}
			/>
		</section>
	)
}

export default Home
