import { popularSearchesSql, toolsSql } from 'configurations/nf/resources'
import Layout from 'portal-components/Layout'
import * as React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Typography } from 'synapse-react-client'
import FeaturedToolsList from 'synapse-react-client/dist/containers/home_page/featured_tools/FeaturedToolsList'
import IconSvg from 'synapse-react-client/dist/containers/IconSvg'
import { Query } from 'synapse-react-client/dist/utils/synapseTypes'
import { TextMatchesQueryFilter } from 'synapse-react-client/dist/utils/synapseTypes/Table/QueryFilter'
import { HelpPopover } from 'synapse-react-client/dist/containers/HelpPopover'
import { ReactComponent as AnimalModels } from './assets/animalmodels.svg'
import { ReactComponent as Antibodies } from './assets/antibodies.svg'
import { ReactComponent as Biobanks } from './assets/biobanks.svg'
import { ReactComponent as CellLines } from './assets/cell-lines.svg'
import { ReactComponent as PlasmidsReagents } from './assets/plasmids-reagents.svg'
import PopularSearches from './PopularSearches'

export const gotoExploreToolsWithFullTextSearch = (fullTextSearchString: string) => {
  const filter: TextMatchesQueryFilter = {
    concreteType: "org.sagebionetworks.repo.model.table.TextMatchesQueryFilter",
    searchExpression: fullTextSearchString,
  }
  const query: Query = {
    sql: toolsSql,
    additionalFilters: [filter],
  }
  window.location.assign(`/Explore/Tools?QueryWrapper0=${JSON.stringify(query)}`)
}

const BrowseToolsPage = () => {
  const [searchText, setSearchText] = React.useState<string>('')
  const gotoExploreTools = () => {
    window.location.assign('/Explore/Tools')
  }

  const gotoExploreToolsWithSelectedResource = (selectedResource: string) => {
    const query: Query = {
      sql: toolsSql,
      selectedFacets: [
        {
          concreteType: "org.sagebionetworks.repo.model.table.FacetColumnValuesRequest",
          columnName: 'resourceType',
          facetValues: [selectedResource]
        }
      ],
    }
    window.location.assign(`/Explore/Tools?QueryWrapper0=${JSON.stringify(query)}`)
  }

  return (
    <div className="browse-tools-page">
      <div className="header bootstrap-4-backport">
        <div className="home-container-description">
          <Typography variant="headline1" className="sectionTitle">
            NF Research Tools Database
          </Typography>
          <div className="center-content">
            <div className="description">
              <Typography variant="body1">
                The NF Research Tools Database aims to support the development of a robust research toolkit and lower the barrier of entry to neurofibromatosis (NF) research. The database includes NF-associated animal models, cell lines, antibodies, and genetic reagents and details on tool characteristics and sourcing, as well as observational and experimental data.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Layout outsideContainerClassName="home-spacer">
        <Typography variant="sectionTitle" className="sectionTitle">
          Browse Tools by Category
        </Typography>
        <Typography variant="body1" className="sectionSubtitle">
          Drill-down to explore specific types of NF research tools.
        </Typography>
        <div className="categories">
          <button onClick={() => gotoExploreToolsWithSelectedResource('Animal Model')}>
            <AnimalModels />
            <Typography variant="headline3">
              Animal Models
            </Typography>
          </button>
          <button onClick={() => gotoExploreToolsWithSelectedResource('Antibody')}>
            <Antibodies />
            <Typography variant="headline3">
              Antibodies
            </Typography>
          </button>
          <button onClick={() => gotoExploreToolsWithSelectedResource('Genetic Reagent')}>
            <PlasmidsReagents />
            <Typography variant="headline3">
              Genetic Reagents
            </Typography>
          </button>
          <button onClick={() => gotoExploreToolsWithSelectedResource('Cell Line')}>
            <CellLines />
            <Typography variant="headline3">
              Cell Lines
            </Typography>
          </button>
          <button onClick={() => gotoExploreToolsWithSelectedResource('Biobank')}>
            <Biobanks />
            <Typography variant="headline3">
              Biobanks
            </Typography>
          </button>
        </div>
        <div className="center-content bootstrap-4-backport">
          <Button className="pill-xl" variant="primary" onClick={() => gotoExploreTools()}>VIEW ALL TOOLS</Button>
        </div>
      </Layout>
      <div className="home-container-description  home-bg-dark home-spacer">
        <Typography variant="sectionTitle" className="sectionTitle">
          What Tools Can We Help You Find?
        </Typography>
        <div className="center-content">
          <div className="searchToolsRow">
            <div className="searchInputWithIcon">
              <IconSvg options={{ icon: 'searchOutlined' }} />
              <Form.Control type="search" placeholder=""
                value={searchText}
                onChange={event => {
                  setSearchText(event.target.value)
                }}
                onKeyPress={evt => {
                  if (evt.key === 'Enter') {
                    gotoExploreToolsWithFullTextSearch(searchText)
                  }
                }}
              />
            </div>
            <div className="search-button-container bootstrap-4-backport">
              <Button className="pill-xl" variant="primary" onClick={() => gotoExploreToolsWithFullTextSearch(searchText)}>SEARCH</Button>
            </div>
            <div className="help-popover">
              <HelpPopover
                markdownText={'This search bar is powered by MySQL Full Text Search.'}
                helpUrl={'https://help.nf.synapse.org/NFdocs/Tips-for-Search.2640478225.html'}
                placement="left"
              />
            </div>
          </div>
        </div>
        <Typography variant="sectionTitle" className="sectionTitle">
          Suggested Searches
        </Typography>
        <div className="center-content">
          <PopularSearches sql={popularSearchesSql} />
        </div>
      </div>
      
      <Layout outsideContainerClassName="home-spacer">
        <Typography variant="sectionTitle" className="sectionTitle">
          Recently Added Tools
        </Typography>
        <Typography variant="body1" className="sectionSubtitle">
          Check out some recently-catalogued research resources below.
        </Typography>
        <div className="center-content">
          <FeaturedToolsList
            entityId={'syn26450069'}
            idColumnName={'resourceId'}
            nameColumnName={'resourceName'}
            descriptionColumnName={'description'}
            typeColumnName={'resourceType'}
            dateColumnName={'dateAdded'}
            toolDetailPageURL={'/Explore/Tools/DetailsPage?resourceId='}
          />
        </div>
        <div className="center-content bootstrap-4-backport">
          <Button className="pill-xl" variant="primary" onClick={() => gotoExploreTools()}>VIEW ALL TOOLS</Button>
        </div>
      </Layout>
      <Layout outsideContainerClassName="home-spacer highlightSubmitToolContainer">
        <Typography variant="sectionTitle" className="sectionTitle">
          Submit a Tool to the Database
        </Typography>
        <div className="center-content">
          <div className="description">
            <Typography variant="body1">
              We are currently accepting submissions that describe any NF1-related mouse model, cell line, genetic reagent (e.g. plasmid, CRISPR), antibody, or biobank. If you have a tool that you would like to add to the Research Tools Database, please click the {'"'}Submit a Tool{'"'} button below to learn more.
            </Typography>
          </div>
        </div>
        <div className="center-content bootstrap-4-backport">
          <Button href="https://help.nf.synapse.org/NFdocs/2555543592.html" className="pill-xl highlightSubmitToolButton" variant="secondary" target="_blank">SUBMIT A TOOL</Button>
        </div>
      </Layout>
    </div>
  )
}

export default BrowseToolsPage
