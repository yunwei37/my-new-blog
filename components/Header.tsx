import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass = 'flex items-center w-full justify-between py-6 border-b border-gray-200/30 dark:border-gray-700/30'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 bg-inherit backdrop-blur-sm z-40'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center">
          <div className="mr-3">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden text-2xl font-bold sm:block text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <div className="no-scrollbar hidden items-center space-x-2 sm:flex">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="px-3 py-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-200 font-medium text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <div className="flex items-center space-x-2">
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
