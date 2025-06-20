import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Doc } from 'contentlayer/generated'
import PageTitle from '@/components/PageTitle'
import Link from '@/components/Link'

interface DocLayoutProps {
  content: { slug: string; title: string; path: string }
  children: ReactNode
  allDocs: { slug: string; title: string; path: string }[]
}

interface NavNode {
  name: string
  children: { [key: string]: NavNode }
  doc: { slug: string; title: string; path: string } | null
}

// 构建文档导航树
function buildNavTree(docs: { slug: string; title: string; path: string }[]) {
  const tree: { [key: string]: NavNode } = {}
  
  docs.forEach((doc) => {
    const pathParts = doc.slug.split('/')
    let current = tree
    
    pathParts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = {
          name: part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          children: {},
          doc: index === pathParts.length - 1 ? doc : null
        }
      }
      current = current[part].children
    })
  })
  
  return tree
}

// 渲染导航树
function renderNavTree(tree: { [key: string]: NavNode }, prefix = '') {
  return Object.entries(tree).map(([key, value]: [string, NavNode]) => {
    const hasChildren = Object.keys(value.children).length > 0
    
    if (value.doc) {
      return (
        <li key={key} className="mb-1">
          <Link
            href={`/docs/${value.doc.slug}`}
            className="block px-3 py-2 text-sm opacity-80 hover:opacity-100 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-all duration-200"
          >
            📄 {value.name}
          </Link>
        </li>
      )
    }
    
    if (hasChildren) {
      return (
        <li key={key} className="mb-3">
          <div className="px-3 py-2 text-sm font-bold flex items-center">
            <span className="mr-2">📁</span>
            {value.name}
          </div>
          <ul className="ml-4 space-y-1 border-l border-gray-200/30 dark:border-gray-700/30 pl-4">
            {renderNavTree(value.children, `${prefix}${key}/`)}
          </ul>
        </li>
      )
    }
    
    return null
  })
}

export default function DocLayout({ content, children, allDocs }: DocLayoutProps) {
  const navTree = buildNavTree(allDocs)
  
  return (
    <div className="flex gap-8">
      {/* 侧边栏导航 */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-8">
          <nav className="rounded-xl p-6 border border-gray-200/20 dark:border-gray-700/20">
            <Link href="/docs" className="flex items-center mb-6 group">
              <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">📚</span>
              <h3 className="text-xl font-bold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                Documentation
              </h3>
            </Link>
            <ul className="space-y-2">
              {renderNavTree(navTree)}
            </ul>
          </nav>
        </div>
      </div>
      
      {/* 主内容区域 */}
      <div className="flex-1 min-w-0 space-y-8">
        <div className="text-center py-8">
          <PageTitle>{content.title}</PageTitle>
        </div>
        
        <div className="prose prose-gray max-w-none dark:prose-invert lg:prose-lg">
          {children}
        </div>
      </div>
    </div>
  )
} 