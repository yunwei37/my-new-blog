import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wide bg-primary-100 hover:bg-primary-200 dark:bg-primary-900/30 dark:hover:bg-primary-800/40 rounded-full transition-all duration-200 text-primary-800 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200 border border-primary-200/50 dark:border-primary-700/50"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
