import styled from "styled-components";
import {
  centerItems,
  cardSize,
  theme,
  contentWidth,
  positiveChange,
  negativeChange,
} from "../../common/theme";

export const StyledHoldingCard = styled.div`
  /* border: 3px solid purple; */
  .positive-change {
    ${positiveChange}
    font-size: 15px;
    font-weight: bold;
  }
  .negative-change {
    ${negativeChange}
    font-size: 15px;
    font-weight: bold;
  }

  .titles-container {
    margin-top: 3%;
    margin-left: 15%;
  }
  .data-container {
    text-align: right;
    margin-top: 3%;
    margin-right: 15%;
  }
  .card-paper {
    ${theme.boxShadow} /*  margin: 0.5% */
    font-size: 14px
  }
  .card-header-container {
    display: flex;
    align-items: center;
    /*    border: 1px solid red; */
    justify-content: space-between;
    /*   border: 1px solid red; */
    height: 100px;
  }

  .card-header-logo-name-container {
    ${centerItems}
    margin: 4%;
    h2 {
      margin-left: 6%;
    }
  }
  .card-header-price-container {
    display: flex;
    justify-content: center;
    /*  align-items: center; */
    align-items: flex-end;
    margin-right: 4%;

    /*  border: 1px solid red; */
  }
  .price {
    font-size: 20px;
  }
  .card-buttons-container {
    ${centerItems}
  }
  .PL {
    font-size: 15px;
    font-weight: bold;
  }
`;

export const StyledStatistics = styled.div`
  margin-top: 2%;
  width: 100%;

  .no-holdings-found {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 10%;
    border: 1px solid red;
  }
`;

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;

  .no-holdings-found {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 12%;
    button {
      margin: 2%;
    }
  }
`;
