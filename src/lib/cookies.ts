import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cookies } from 'next/headers'

export const getCookie = async (cookieName: string): Promise<string | undefined> => {
	const cookieStore: ReadonlyRequestCookies = await cookies()
	return cookieStore.get(cookieName)?.value
}

export const setCookie = async (cookieName: string, value: string): Promise<undefined> => {
	const cookieStore: ReadonlyRequestCookies = await cookies()
	cookieStore.set(cookieName, value, { maxAge: 60 * 60 * 2 })
}

export const deleteCookie = async (cookieName: string): Promise<undefined> => {
	const cookieStore: ReadonlyRequestCookies = await cookies()
	cookieStore.delete(cookieName)
}
