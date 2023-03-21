import React, { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { IArticleCard } from '@src/interfaces';
import styles from './article-card.module.scss';
import Button from '@src/components/atoms/button';
import { Color, Size } from '@src/enums';
import { fetchAndConvertToBase64 } from '@src/utils/data-fetching/client';
import { imagePlaceholder } from '@src/assets/image-placeholder';

interface IArticleCardImage {
  imageUrl: string;
  imageAltText: string;
  blurredImageUrl: string;
}

export const ArticleCard = memo(function ArticleCard({
  ...props
}: IArticleCard) {
  const [articleImage, setArticleImage] = useState<IArticleCardImage | null>(
    null,
  );

  useEffect(() => {
    if (!articleImage) {
      (async () => {
        setArticleImage({
          imageUrl: props.imageUrl,
          imageAltText: props.imageAltText,
          blurredImageUrl: props.blurredImageUrl
            ? ((await fetchAndConvertToBase64(props.blurredImageUrl)) as string)
            : imagePlaceholder,
        });
      })();
    }
  }, [articleImage, props.blurredImageUrl, props.imageAltText, props.imageUrl]);

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {
          /* istanbul ignore next */
          articleImage && (
            <Image
              src={articleImage.imageUrl} // add default placeholder if there is no image
              alt={articleImage.imageAltText}
              fill
              placeholder="blur"
              blurDataURL={articleImage.blurredImageUrl}
              unoptimized={props.unoptimized}
            />
          )
        }
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{props.title}</h3>
        <p className={styles.description}>{props.description}</p>
        <Button
          customClass={styles.link}
          buttonColor={Color.Brick}
          buttonSize={Size.Regular}
          buttonType={'button'}
          buttonStyle={'secondary'}
          buttonText={props.ctaText}
          buttonFullWidth={false}
          hasShadow={false}
          buttonHref={props.ctaUrl}
        />
      </div>
    </div>
  );
});

export default ArticleCard;
