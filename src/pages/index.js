import page, {
  getStaticProps as pageGetStaticProps
} from "./[index]/min-drawdown/[minDrawdown]";

export default page;

export const getStaticProps = async () => {
  return pageGetStaticProps({
    params: { index: "msci-world", minDrawdown: 30 }
  });
};
