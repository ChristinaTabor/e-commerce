import React from 'react';
import { Col, Media } from 'reactstrap';
import sideBanner from '../../../public/assets/images/side-banner.png';
import NewProduct from './newProduct';
import Brand from './brand'
import Color from './color'
import Size from './size'
import Price from './price';
import { filterData } from '../../../data/filterData'

const FilterPage = ({sm,sidebarView,closeSidebar}) => {
    const isLoading = false;
    return (
        <>
            <Col sm={sm} className="collection-filter" style={sidebarView ? {left:"0px"} : {}}>
                {/* <!-- side-bar colleps block stat --> */}
                <div className="collection-filter-block">
                    {/* <!-- brand filter start --> */}
                    <div className="collection-mobile-back" onClick={() => closeSidebar()}>
                        <span className="filter-back">
                            <i className="fa fa-angle-left" aria-hidden="true"></i> back
                        </span>
                    </div>
                    <Brand data={filterData} loading={isLoading}/>
                    <Color data={filterData} loading={isLoading}/>
                    <Size data={filterData} loading={isLoading}/>
                    <Price />
                </div>
                {/* <!-- silde-bar colleps block end here -->*/}
                <NewProduct data={filterData} loading={isLoading}/>
                {/* <!-- side-bar banner start here -->  */}
                <div className="collection-sidebar-banner">
                    <a href={null}><Media src={sideBanner} className="img-fluid blur-up lazyload" alt="" /></a>
                </div>
                {/* <!-- side-bar banner end here --> */}
            </Col>
        </>
    )
}

export default FilterPage;