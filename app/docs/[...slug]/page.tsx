import { allDocs } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import type { Doc } from 'contentlayer/generated'
import { components } from '@/components/MDXComponents'
import DocLayout from '@/layouts/DocLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

const defaultLayout = 'DocLayout'

export async function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slug.split('/'),
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const doc = allDocs.find((p) => p.slug === slug)
  if (!doc) {
    return
  }

  return {
    title: doc.title,
    description: `Documentation: ${doc.title}`,
    openGraph: {
      title: doc.title,
      description: `Documentation: ${doc.title}`,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url: `${siteMetadata.siteUrl}/docs/${doc.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: `Documentation: ${doc.title}`,
    },
  }
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const sortedDocs = allDocs.sort((a, b) => a.slug.localeCompare(b.slug))
  const docIndex = sortedDocs.findIndex((p) => p.slug === slug)
  
  if (docIndex === -1) {
    return notFound()
  }

  const doc = sortedDocs[docIndex]
  const allDocsCore = sortedDocs.map(d => ({
    slug: d.slug,
    title: d.title || d.slug.split('/').pop() || 'Untitled',
    path: d.path
  }))
  const mainContent = {
    slug: doc.slug,
    title: doc.title || doc.slug.split('/').pop() || 'Untitled',
    path: doc.path
  }

  return (
    <DocLayout content={mainContent} allDocs={allDocsCore}>
      <div dangerouslySetInnerHTML={{ __html: doc.body.html }} />
    </DocLayout>
  )
} 