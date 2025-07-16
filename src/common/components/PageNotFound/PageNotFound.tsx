import pageNotFound from '../../../assets/images/404.svg'
import styled from 'styled-components'

export const PageNotFound = () => {
  return (
    <WrapperPageNotFound>
      <img src={pageNotFound} alt="Page Not Found" />
      <h1>Something went wrong. Page not found.</h1>
    </WrapperPageNotFound>
  )
}

const WrapperPageNotFound = styled.div`
  display: flex;
  height: 100%;
  padding: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    width: 100%;
  }
  h1 {
    color: white;
  }
`
