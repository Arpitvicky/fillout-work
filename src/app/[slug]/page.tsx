/* eslint-disable */
// @ts-nocheck
import styles from "../page.module.css";

interface IParams {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: IParams) => {
  const { slug } = await params;

  return (
    <div className={styles.page}>
      Welcome to {decodeURIComponent(slug)} page
    </div>
  );
};

export default Page;
