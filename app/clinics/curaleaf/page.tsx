import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { curaleafReviewData as data } from "@/lib/curaleafReviewData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} clinicId="curaleaf" />;
}
