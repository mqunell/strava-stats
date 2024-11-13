import { deleteCookie, getCookie } from '@/lib/cookies'
import Logout from './Logout'

const Header = async () => {
	const profilePicture = await getCookie('profilePicture')
	const firstName = await getCookie('firstName')

	return (
		<section className="flex w-full max-w-screen-sm gap-4">
			{profilePicture ? <img src={profilePicture} /> : null}

			<div className="flex flex-col justify-between">
				<p>Hey{firstName ? ` ${firstName}` : ''}!</p>
				<Logout
					action={async () => {
						'use server'
						await deleteCookie('accessToken')
						await deleteCookie('firstName')
						await deleteCookie('profilePicture')
					}}
				/>
			</div>
		</section>
	)
}

export default Header
