import styled from 'styled-components';
import BannerFrame from './BannerFrame';

interface itemsProps {
  item: string;
  name: string;
}

const items: itemsProps[] = [
  {
    item: 'https://dummyimage.com/2000x360/c4c4c4',
    name: '이미지01',
  },
  {
    item: 'https://dummyimage.com/2000x360/c4c4c4',
    name: '이미지02',
  },
  {
    item: 'https://dummyimage.com/2000x360/c4c4c4',
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
    width: 1440px;
    @media screen and (max-width: 1650px) {
      width: 75vw;
    }
  }
`;
