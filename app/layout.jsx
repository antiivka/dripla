export const metadata = { title: 'Dripla' };

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
