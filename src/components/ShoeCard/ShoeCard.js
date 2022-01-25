import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const priceTextDecoration = variant === 'on-sale' ? 'line-through' : 'none';
  const salePriceVisibility = variant === 'on-sale' ? 'visible' : 'hidden';
  const flagVisibility =
    variant === 'on-sale' || variant === 'default' ? 'visible' : 'hidden';
  const flagText = variant === 'on-sale' ? 'Sale' : 'Just Released!';
  const flagBackgroundColor =
    variant === 'on-sale' ? COLORS.primary : COLORS.secondary;

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{ '--text-decoration': priceTextDecoration }}>
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice style={{ '--visibility': salePriceVisibility }}>
            {formatPrice(salePrice)}
          </SalePrice>
        </Row>
        <Flag
          style={{
            '--visibility': flagVisibility,
            '--background-color': flagBackgroundColor,
          }}
        >
          {flagText}
        </Flag>
      </Wrapper>
    </Link>
  );
};

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  color: ${COLORS.white};
  background-color: ${COLORS.secondary};
  padding: 8px;
  border-radius: 2px;
  visibility: var(--visibility);
  background-color: var(--background-color);
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 300px;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  visibility: var(--visibility);
`;

export default ShoeCard;
