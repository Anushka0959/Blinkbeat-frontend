import './globals.css';
import ToasterClient from './bde/components/ToasterClient'; // ✅ Import the new wrapper

export const metadata = {
  title: 'Blink Beat',
  description: 'Redesign with premium agency style',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;600;700&family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
         <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    rel="stylesheet"
  />
      </head>
      <body className="font-sans">
        {children}
        <ToasterClient /> {/* ✅ Add client wrapper here */}
      </body>
    </html>
  );
}
