import styled from 'styled-components';
import BannerFrame from './BannerFrame';

interface itemsProps {
  item: string;
  name: string;
}

const items: itemsProps[] = [
  {
    item: '/images/bannerTest.gif',
    name: '이미지01',
  },
  {
    item: '/images/bannerTest.gif',
    name: '이미지02',
  },
  {
    item: '/images/bannerTest.gif',
    name: '이미지03',
  },
];

function BannerItem() {
  return (
    <BannerFrame>
      {items.map((item, index) => (
        <SliderItem key={index}>
          <img src={item.item} alt={item.name} />
        </SliderItem>
      ))}
    </BannerFrame>
  );
}

export default BannerItem;
const SliderItem = styled.div`
  img {
    width: 75vw;
  }
`;
