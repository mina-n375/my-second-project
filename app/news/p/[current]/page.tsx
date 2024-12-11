import { notFound } from "next/navigation";
import { getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagenation from "@/app/_components/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: {
    current: string;
  };
};

// 静的パスを生成
export async function generateStaticParams() {
  // 全ニュース記事の総数を取得
  const { totalCount } = await getNewsList();

  // ページ数を計算
  const totalPages = Math.ceil(totalCount / NEWS_LIST_LIMIT);

  // 各ページのパスを生成
  const params: { current: string }[] = [];
  for (let page = 1; page <= totalPages; page++) {
    params.push({ current: page.toString() });
  }

  return params;
}

export default async function Page({ params }: Props) {
  const current = parseInt(params.current, 10);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
  });

  if (news.length === 0) {
    notFound();
  }

  return (
    <>
      <NewsList news={news} />
      <Pagenation totalCount={totalCount} current={current} />
    </>
  );
}
