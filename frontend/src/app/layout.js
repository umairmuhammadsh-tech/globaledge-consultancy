import './globals.css'

export const metadata = {
  title: 'GlobalEdge Consultancy | Your Gateway to World-Class Education',
  description:
    'GlobalEdge Consultancy helps students achieve their dreams of studying abroad with expert guidance on university admissions, visa support, scholarships, and test prep for UK, USA, Canada, Australia, Germany, and New Zealand.',
  keywords:
    'study abroad, university admissions, visa guidance, scholarship, IELTS, TOEFL, GRE, UK, USA, Canada, Australia, Germany, New Zealand, student consultancy',
  openGraph: {
    title: 'GlobalEdge Consultancy | Your Gateway to World-Class Education',
    description:
      'Expert guidance for students dreaming of world-class education abroad.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
