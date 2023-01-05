import React, { memo } from 'react';
import Image from 'next/image';
import { IArticleCard, IButtonProps } from '../../../interfaces';
import styles from './article-card.module.scss';
import Button from '../../atoms/button';
import { Color, Size } from '../../../enums';

export const ArticleCard = memo(function ArticleCard({
  ...props
}: IButtonProps & IArticleCard) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image
          src={props.image.secureUrl} // add default placeholder if there is no image
          alt={props.image.altText as string}
          fill
          placeholder="blur"
          blurDataURL={props.image.blurredImageUrl ?? props.image.url}
          unoptimized={props.unoptimized}
        />
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
