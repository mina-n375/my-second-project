import { notFound } from "next/navigation";
import { getNewsDetail, getNewsList } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk?: string;
  };
};

// 静的パスを生成
export async function generateStaticParams() {
  // ニュース一覧を取得し、各記事の ID を静的パスとして設定
  const newsList = await getNewsList();
  return newsList.contents.map((news) => ({
    slug: news.id, // ID を slug として扱う
  }));
}

export default async function Page({ params }: Props) {
  const data = await getNewsDetail(params.slug, {
    draftKey: undefined, // 静的生成時には draftKey を指定しない
  }).catch(notFound);

  return (
    <>
      <Article data={data} />
      <div className={styles.footer}>
        <ButtonLink href="/news">ニュース一覧へ</ButtonLink>
      </div>
    </>
  );
}
