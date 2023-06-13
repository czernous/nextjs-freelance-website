import { Pagination } from '@mui/material';
import { IBlogProps } from '@src/interfaces';
import { customMuiPaginationOlive } from '@src/mui-theme/custom-styles';
import { handlePageChange } from '@src/utils/data-fetching/client';
import { useRouter } from 'next/router';
import ArticleCard from '../article-card';
import style from './paginated-cards.module.scss';

const PaginatedCards = ({
  ...props
}: Omit<IBlogProps, 'meta'> & {
  currentPage: number;
  currentUrl: string;
  pageUrl: string;
}) => {
  const router = useRouter();
  /* istanbul ignore next */
  const currentUrl = props.currentUrl.includes('search')
    ? props.currentUrl.split('/')[1]
    : props.currentUrl;

  return (
    <div
      className="d-flex flex-column align-items-center"
      data-testid="paginated-cards"
    >
      <div className={style.grid}>
        {props.data.data.map((post) => {
          return (
            <ArticleCard
              key={post._id}
              imageUrl={post.imageUrl}
              imageAltText={post.imageAltText}
              blurredImageUrl={post.blurredImageUrl}
              title={post.title}
              description={post.shortDescription}
              ctaText={'read more'}
              ctaUrl={`${currentUrl}/${post.slug}`}
              unoptimized={false}
            />
          );
        })}
      </div>
      {props.data.totalPages > 1 && (
        <Pagination
          className={style.pagination}
          page={props.currentPage}
          count={props.data.totalPages}
          sx={customMuiPaginationOlive}
          onChange={
            /* istanbul ignore next */
            (e) =>
              handlePageChange(
                e,
                router,
                `${props.currentUrl}${props.pageUrl}`,
                props.currentPage,
              )
          }
        />
      )}
    </div>
  );
};

export default PaginatedCards;
