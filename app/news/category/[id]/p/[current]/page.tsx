import { notFound } from "next/navigation";
import {
  getCategoryDetail,
  getNewsList,
  getCategoryList,
} from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import Pagenation from "@/app/_components/Pagination";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: {
    id: string;
    current: string;
  };
};

// 静的パスを生成
export async function generateStaticParams() {
  // カテゴリ一覧を取得
  const categories = await getCategoryList();

  const params: { id: string; current: string }[] = [];

  for (const category of categories.contents) {
    // 各カテゴリのニュース総数を取得
    const { totalCount } = await getNewsList({
      filters: `category[equals]${category.id}`,
    });

    // ページ数を計算
    const totalPages = Math.ceil(totalCount / NEWS_LIST_LIMIT);

    // 各ページのパスを生成
    for (let page = 1; page <= totalPages; page++) {
      params.push({ id: category.id, current: page.toString() });
    }
  }

  return params;
}

export default async function Page({ params }: Props) {
  const current = parseInt(params.current, 10);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  const category = await getCategoryDetail(params.id).catch(notFound);

  const { contents: news, totalCount } = await getNewsList({
    filters: `category[equals]${category.id}`,
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
  });

  if (news.length === 0) {
    notFound();
  }

  return (
    <>
      <NewsList news={news} />
      <Pagenation
        totalCount={totalCount}
        current={current}
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
