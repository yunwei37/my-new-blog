'use client'

import { ReactNode, useState, useEffect } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Doc } from 'contentlayer/generated'
import PageTitle from '@/components/PageTitle'
import Link from '@/components/Link'
import { usePathname } from 'next/navigation'

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
function renderNavTree(
  tree: { [key: string]: NavNode }, 
  expandedNodes: Set<string>,
  onToggleExpand: (path: string) => void,
  currentPath: string,
  onLinkClick?: () => void,
  prefix = ''
) {
  return Object.entries(tree).map(([key, value]: [string, NavNode]) => {
    const hasChildren = Object.keys(value.children).length > 0
    const nodePath = `${prefix}${key}`
    const isExpanded = expandedNodes.has(nodePath)
    const isActive = value.doc && currentPath.includes(value.doc.slug)
    
    if (value.doc) {
      return (
        <li key={key} className="mb-1">
          <Link
            href={`/docs/${value.doc.slug}`}
            onClick={onLinkClick}
            className={`
              block px-3 py-2 text-sm rounded-lg transition-all duration-200 
              flex items-center group
              ${isActive 
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                : 'opacity-80 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
              }
            `}
          >
            <span className="mr-2 text-base group-hover:scale-110 transition-transform">📄</span>
            <span className="truncate">{value.name}</span>
          </Link>
        </li>
      )
    }
    
    if (hasChildren) {
      return (
        <li key={key} className="mb-2">
          <button
            onClick={() => onToggleExpand(nodePath)}
            className="w-full px-3 py-2 text-sm font-semibold flex items-center justify-between rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
          >
            <div className="flex items-center">
              <span className={`mr-2 text-base transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                📁
              </span>
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {value.name}
              </span>
            </div>
            <span className={`text-xs text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <div className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <ul className="ml-4 mt-2 space-y-1 border-l-2 border-gray-200/50 dark:border-gray-700/50 pl-4">
              {renderNavTree(value.children, expandedNodes, onToggleExpand, currentPath, onLinkClick, `${nodePath}/`)}
            </ul>
          </div>
        </li>
      )
    }
    
    return null
  })
}

export default function DocLayout({ content, children, allDocs }: DocLayoutProps) {
  const navTree = buildNavTree(allDocs)
  const pathname = usePathname()
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // 自动展开包含当前页面的路径
  useEffect(() => {
    const currentSlug = content.slug
    const pathParts = currentSlug.split('/')
    const expandPaths = new Set<string>()
    
    // 只展开当前页面的直接路径，而不是所有父级路径
    let currentPath = ''
    pathParts.slice(0, -1).forEach(part => {
      currentPath = currentPath ? `${currentPath}/${part}` : part
      expandPaths.add(currentPath)
    })
    
    setExpandedNodes(expandPaths)
  }, [content.slug])
  
  const toggleExpand = (path: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(path)) {
        newSet.delete(path)
      } else {
        newSet.add(path)
      }
      return newSet
    })
  }
  
  // 过滤文档用于搜索
  const filteredDocs = searchTerm 
    ? allDocs.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.slug.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null
  
  const NavigationContent = () => (
    <nav className="rounded-xl p-6 bg-white/50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 backdrop-blur-sm shadow-lg">
      <Link href="/docs" className="flex items-center mb-6 group">
        <span className="text-2xl mr-3 group-hover:scale-110 transition-transform">📚</span>
        <h3 className="text-xl font-bold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          Documentation
        </h3>
      </Link>
      
      {/* 搜索框 */}
      <div className="mb-6">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="搜索文档..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      {/* 搜索结果或导航树 */}
      {searchTerm ? (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          <div className="text-sm text-gray-500 mb-3">
            找到 {filteredDocs?.length || 0} 个结果
          </div>
          {filteredDocs?.map(doc => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                block px-3 py-2 text-sm rounded-lg transition-all duration-200 
                flex items-center group
                ${pathname.includes(doc.slug)
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                  : 'opacity-80 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                }
              `}
            >
              <span className="mr-2 text-base">📄</span>
              <div>
                <div className="truncate">{doc.title}</div>
                <div className="text-xs text-gray-500 truncate">{doc.slug}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <ul className="space-y-1 max-h-96 overflow-y-auto">
          {renderNavTree(navTree, expandedNodes, toggleExpand, pathname, () => setIsMobileMenuOpen(false))}
        </ul>
      )}
    </nav>
  )
  
  return (
    <div className="flex gap-8 relative">
      {/* 移动端菜单按钮 */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Toggle navigation menu"
      >
        <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 mt-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 mt-1.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>
      
      {/* 移动端侧边栏 */}
      <div className={`
        lg:hidden fixed inset-0 z-40 transition-opacity duration-300
        ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsMobileMenuOpen(false)
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close navigation menu"
        />
        <div className={`
          absolute left-0 top-0 h-full w-80 max-w-[85vw] transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full overflow-y-auto p-4">
            <NavigationContent />
          </div>
        </div>
      </div>
      
      {/* 桌面端侧边栏导航 */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-8 space-y-6">
          <NavigationContent />
        </div>
      </div>
      
      {/* 主内容区域 */}
      <div className="flex-1 min-w-0 space-y-8 lg:ml-0 ml-16">
        <div className="text-center py-8">
          <PageTitle>{content.title}</PageTitle>
        </div>
        
        <div className="prose prose-gray max-w-none dark:prose-invert lg:prose-lg px-4 lg:px-0">
          {children}
        </div>
      </div>
    </div>
  )
} 