import { getCookie } from '@/lib/cookies'

const Header = async () => {
	const profilePicture = await getCookie('profilePicture')
	const firstName = await getCookie('firstName')

	return (
		<>
			{profilePicture ? <img src={profilePicture} /> : null}
			<p>Hey{firstName ? ` ${firstName}` : ''}!</p>
		</>
	)
}

export default Header
