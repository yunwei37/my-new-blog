import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Doc } from 'contentlayer/generated'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Link from '@/components/Link'

interface DocLayoutProps {
  content: CoreContent<Doc>
  children: ReactNode
  allDocs: CoreContent<Doc>[]
}

// 构建文档导航树
function buildNavTree(docs: CoreContent<Doc>[]) {
  const tree: { [key: string]: any } = {}
  
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
function renderNavTree(tree: any, prefix = '') {
  return Object.entries(tree).map(([key, value]: [string, any]) => {
    const hasChildren = Object.keys(value.children).length > 0
    
    if (value.doc) {
      return (
        <li key={key} className="mb-1">
          <Link
            href={`/docs/${value.doc.slug}`}
            className="block px-3 py-2 text-sm text-gray-800 dark:text-gray-200 hover:glass rounded-lg transition-all duration-200 hover:scale-[1.02]"
          >
            {value.name}
          </Link>
        </li>
      )
    }
    
    if (hasChildren) {
      return (
        <li key={key} className="mb-3">
          <div className="px-3 py-2 text-sm font-bold text-gray-900 dark:text-gray-100">
            📁 {value.name}
          </div>
          <ul className="ml-4 space-y-1">
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
    <SectionContainer>
      <div className="space-y-6 lg:space-y-0 lg:flex lg:space-x-8">
        {/* 侧边栏导航 */}
        <div className="lg:w-72 lg:flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <nav className="sidebar-glass p-6">
              <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                📚 Documentation
              </h3>
              <ul className="space-y-2">
                {renderNavTree(navTree)}
              </ul>
            </nav>
          </div>
        </div>
        
        {/* 主内容区域 */}
        <div className="flex-1 min-w-0">
          <div className="content-glass p-8 mb-6">
            <PageTitle>{content.title}</PageTitle>
          </div>
          
          <div className="content-glass p-8">
            <div className="prose prose-gray max-w-none dark:prose-invert lg:prose-lg">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
} 