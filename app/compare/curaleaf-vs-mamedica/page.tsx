import ArticlePage, { pageMetadata } from "@/components/ArticlePage";
import { curaleafVsMamedicaData as data } from "@/lib/curaleafVsMamedicaData";

export const metadata = pageMetadata(data);

export default function Page() {
  return <ArticlePage data={data} />;
}
