/// <reference types="vite/client" />

declare module '*.webp'
declare module '*.png'
declare module '*.scss'
declare module '*.css'

interface obj {
	[key: string]: any
}

interface Tobj<T> {
	[key: string]: T
}
