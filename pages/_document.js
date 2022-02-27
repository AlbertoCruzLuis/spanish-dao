import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="title" content="SpanishDAO" />
        <meta name="description" content="Create a DAO with Nextjs and TailwindCSS. Course of Build your own DAO with just Javascript in a weekend of BuildSpace." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://spanishdao.on.fleek.co" />
        <meta property="og:title" content="SpanishDAO" />
        <meta property="og:description" content="Create a DAO with Nextjs and TailwindCSS. Course of Build your own DAO with just Javascript in a weekend of BuildSpace." />
        <meta property="og:image" content="https://spanishdao.on.fleek.co/android-chrome-512x512.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://spanishdao.on.fleek.co" />
        <meta property="twitter:title" content="SpanishDAO" />
        <meta property="twitter:description" content="Create a DAO with Nextjs and TailwindCSS. Course of Build your own DAO with just Javascript in a weekend of BuildSpace." />
        <meta property="twitter:image" content="https://spanishdao.on.fleek.co/android-chrome-512x512.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}