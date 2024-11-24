import Sheet from "@/app/_components/Sheet";
import Hero from "@/app/_components/Hero";

export const revalidate = 60;

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="News" sub="ニュース" />
      <Sheet>{children}</Sheet>
    </>
  );
}
