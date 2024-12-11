import {
  getCategoryDetail,
  getNewsList,
  getCategoryList,
} from "@/app/_libs/microcms";
import { notFound } from "next/navigation";
import NewsList from "@/app/_components/NewsList";
import Pagenation from "@/app/_components/Pagination";
import Category from "@/app/_components/Category";
import { NEWS_LIST_LIMIT } from "@/app/_constants";

type Props = {
  params: {
    id: string;
  };
};

// 静的パスを生成
export async function generateStaticParams() {
  const categoryList = await getCategoryList(); // 全カテゴリを取得

  return categoryList.contents.map((category) => ({
    id: category.id, // 各カテゴリの ID を静的パスとして設定
  }));
}

export default async function Page({ params }: Props) {
  const category = await getCategoryDetail(params.id).catch(notFound);
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    filters: `category[equals]${category.id}`,
  });

  return (
    <>
      <p>
        <Category category={category} />
        の一覧
      </p>
      <NewsList news={news} />
      <Pagenation
        totalCount={totalCount}
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
