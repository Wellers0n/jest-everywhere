import React from "react";
import styled from "styled-components";
import { Flex } from "rebass";
import meImg from "../images/me.jpg";
import twitterImg from "../images/twitter.png";
import githubImg from "../images/github.png";


export const Intro = () => (
  <Root>
    <Row>
      <Me src={meImg} />
      <MeName>Wellerson</MeName>
    </Row>
    <SpaceBetween>
    <div>
    <Link href={'https://github.com/wellers0n'} target="_blank">
      <Row>
        <IconImage src={githubImg} />
        <Username>{'@wellers0n'}</Username>
      </Row>
    </Link>
  </div>
  <div>
    <Link href={'https://twitter.com/wellers0n_'} target="_blank">
      <Row>
        <IconImage src={twitterImg} />
        <Username>{'@wellers0n_'}</Username>
      </Row>
    </Link>
  </div>
    </SpaceBetween>

    <Flex flex={1} alignItems="center" justifyContent="center" mt={30}>
      <MeName>Full Stack Engineer</MeName>
    </Flex>
  </Root>
);


const IconImage = styled.img`
  max-height: 60px;
  max-width: 60px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #c6d1dd;
`;

const Me = styled.img`
  max-width: 200px;
  max-height: 200px;
`;

const MeName = styled.span`
  font-size: 50px;
  color: #c6d1dd;
  margin-left: 60px;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

export const Center = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SpaceBetween = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Root = styled.div([], {
  width: "50vw",
  height: "70vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: 'column'
});

const Username = styled.span`
  font-size: 14px;
  margin-left: 20px;
`;