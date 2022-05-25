const customMediaQuery = (maxWidth: number): string => `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  tablet: customMediaQuery(1024),
  mobile: customMediaQuery(850),
};
