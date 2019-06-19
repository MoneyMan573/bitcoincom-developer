// @flow
import * as React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { FaAngleLeft } from 'react-icons/fa';

import DefaultLayout from 'components/layouts/DefaultLayout';
import Container from 'components/Container';
import HelmetPlus from 'components/HelmetPlus';

import StyledLink from 'atoms/StyledLink';

import spacing from 'styles/spacing';
import { Markdown, H2, H3 } from 'bitcoincom-storybook';

const PageLayout = styled.div`
  display: grid;
  margin-top: ${spacing.medium};
  grid-gap: ${spacing.medium};
`;

// too wide is hard to read, limit to some amount;
const TutorialHolder = styled.div`
  max-width: 820px;
  display: grid;
  grid-template-columns: 1fr;
  word-break: break-word;
  & > div {
    display: grid;
  }
  /* Remove margin from first element of markdown content */
  & > div > *:first-child {
    margin-top: 0 !important;
  }
`;

type Props = {
  data: Object,
  location: Object,
};

class TutorialTemplate extends React.PureComponent<Props> {
  render() {
    const { data, location } = this.props;
    const tutorial = data.markdownRemark;

    return (
      <DefaultLayout location={location}>
        <HelmetPlus
          location={location}
          title={`${tutorial.frontmatter.title} - ${data.site.siteMetadata.title}`}
          keywords={[
            `${tutorial.frontmatter.title}`,
            'bitcoin cash tutorial',
            'bitcoin cash example',
          ]}
        />

        <Container>
          <PageLayout>
            <StyledLink to="/tutorials">
              <H3 centerVertical>
                <FaAngleLeft /> Tutorials
              </H3>
            </StyledLink>
            <div>
              <H2>{tutorial.frontmatter.title}</H2>
            </div>
            <TutorialHolder>
              <Markdown htmlAst={tutorial.htmlAst} />
            </TutorialHolder>
          </PageLayout>
        </Container>
      </DefaultLayout>
    );
  }
}

export default TutorialTemplate;

export const query = graphql`
  query TutorialQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
        author
      }
      fields {
        slug
      }
    }
  }
`;
