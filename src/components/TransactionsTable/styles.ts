import styled from "styled-components";

export const Container = styled.div`
  height: 280px;
  margin-top: 4rem;
  overflow-y: scroll;

  table{
    height: 100%;
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td{
      padding: 1rem;
      border: 0;
      background-color: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child{
        color: var(--text-title);
      }

      &.withdraw{
        color: var(--red);
      }

      &.deposit{
        color: var(--green)
      }

      button{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: 0;
        outline: none;
        img{
          width:20px;
          height:20px;
        }
      }
    }
  }
` 