import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";
import styles from "./FeaturedCollections.module.scss";

type TCollectionQuery = {
  collections: {
    nodes: {
      id: string;
      title: string;
      handle: string;
      image: {
        altText: string | null;
        width: number;
        height: number;
        url: string;
      };
    }[];
  };
};

function FeaturedCollections() {
  const {
    data: { collections },
  } = useShopQuery<TCollectionQuery>({
    query: QUERY,
    cache: CacheLong(),
  });

  return (
    <section>
      <h2>Collections</h2>
      <div className={styles.Collections}>
        {collections.nodes.map((collection) => {
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div>
                {collection?.image && (
                  <Image
                    width={"100%"}
                    height={336}
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                  />
                )}
                <h2>{collection.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const QUERY = gql`
  query FeaturedCollections {
    collections(first: 2, sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;

export { FeaturedCollections };
