
import { useMediaQuery } from 'react-responsive'

export const useIsBigScreen 		= () => useMediaQuery({ query: '(min-width: 1256px)'})
export const useIsTabletScreen		= () => useMediaQuery({ query: '(min-width: 1024px)'})
export const useIsSmallScreen 		= () => useMediaQuery({ query: '(min-width: 824px)'})
export const useIsMobileScreen 		= () => useMediaQuery({ query: '(max-width: 823px)'})